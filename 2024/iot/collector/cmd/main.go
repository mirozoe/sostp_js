package main

import (
  "log"
  "fmt"
  "go.bug.st/serial"
  "strings"
  "strconv"
  "time"
  "bytes"
  "net/http"
  "encoding/json"
)

type sensor string
const (
  light sensor = "light"
  heading sensor = "heading"
  temp sensor = "temp"
  sound sensor = "sound"
)
const STORE_URL = "https://europe-west3-"

type Readout struct {
  Light int `json:"light"`
  Heading int `json:"heading"`
  Temp int `json:"temp"`
  Sound int `json:"sound"`
}

func setup_serial() serial.Port {
  mode := &serial.Mode{
  	BaudRate: 115200,
  }
  port, err := serial.Open("/dev/ttyACM0", mode)
  if err != nil {
  	log.Fatal(err)
  }
  return port
}

func read_serial(_serial serial.Port, data chan Readout) {
  buff := make([]byte, 128)
  raw_string := ""

  for {
  	n, err := _serial.Read(buff)
  	if err != nil {
  		log.Fatal(err)
  		break
  	}
  	if n == 0 {
  		fmt.Println("\nEOF")
  		break
  	}

    raw_data := string(buff[:n])
    //fmt.Printf("RAW_DATA: %+v\n", raw_data)
    if len(strings.ReplaceAll(raw_data, " ", "")) > 0 {
      raw_string += raw_data
    } else {
      temp_string := strings.ReplaceAll(raw_string, " ", "")
      //fmt.Printf("RAW: %s\"\n", temp_string)
      data <- parse_data(temp_string)
      raw_string = ""
    }
  }
}

func parse_data(raw string) Readout {
  patterns := []string{}
  patterns = append(patterns, string(light))
  patterns = append(patterns, string(heading))
  patterns = append(patterns, string(temp))
  patterns = append(patterns, string(sound))

  raw_lines := strings.Split(raw, ",")
  obj := Readout{}

  fill_obj := func(pattern sensor, reading int, o *Readout) {
    switch (pattern) {
    case light:
      o.Light = reading
    case heading:
      o.Heading = reading
    case temp:
      o.Temp = reading
    case sound:
      o.Sound = reading
    }
  }

  for _,pattern := range patterns {
    for _,line := range raw_lines {
      trimmed_line := strings.ReplaceAll(line, " \n\r", "")
      if indx := strings.Index(trimmed_line, pattern); indx > -1 {
        lowIndx := indx+len(pattern)+1
        highIndx := len(trimmed_line)
        if highIndx <= lowIndx {
          continue
        }
        num_raw := trimmed_line[lowIndx:highIndx]
        num, err := strconv.Atoi(strings.Trim(num_raw, " \n"))
        if err != nil {
          log.Printf("Error reading data %+v", err)
        }
        //fmt.Printf("num: %+v, pa: %+v \n", num, pattern)
        fill_obj(sensor(pattern), num, &obj)
      }
    }
  }
  return obj
}

func avg(datas []Readout) Readout {
  var temp, light, heading, sound int
  for _, obj := range datas {
    temp += obj.Temp
    light += obj.Light
    heading += obj.Heading
    sound += obj.Sound
  }

  return Readout{
    Temp: int(temp/len(datas)),
    Light: int(light/len(datas)),
    Heading: int(heading/len(datas)),
    Sound: int(sound/len(datas)),
  }
}

func isEmpty(obj Readout) bool {
  return obj.Light == 0 && obj.Temp == 0 && obj.Heading == 0 && obj.Sound == 0
}

func store(obj Readout) {
  jsonBody, err := json.Marshal(obj)
  if err != nil {
    fmt.Printf("Error marshal %+v, %s", obj, err)
  }

  body := bytes.NewBuffer(jsonBody)
  _, err = http.Post(STORE_URL, "application/json", body)
  if err != nil {
    fmt.Printf("Error storing data %s\n", err)
  }
}

func main() {
  port := setup_serial()
  data := make( chan Readout )

  go read_serial(port, data)

  datas := []Readout{}
  start := time.Now()
  for read_data := range data {
    if !isEmpty(read_data) {
      datas = append(datas, read_data)
    }

    if !start.Add(time.Minute).After(time.Now()) {
      avg_obj := avg(datas)
      fmt.Printf("AVG: %+v\n", avg_obj)
      store(avg_obj)
      start = time.Now()
      datas = []Readout{}
    }
    fmt.Printf("Read: %+v\n", read_data)
  }
}
