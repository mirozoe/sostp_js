package backend

import (
	"context"
	"fmt"
  "net/http"
  "encoding/json"
  "time"

  "github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"cloud.google.com/go/firestore"
)

type Data struct {
  Timestamp int64 `json:"timestamp,omitempty"`
  Temp int `json:"temp"`
  Light int `json:"light"`
  Heading int `json:"heading"`
  Sound int `json:"sound"`
}

func init() {
   functions.HTTP("MainStore", mainStore)
}

func storeData(client *firestore.Client, d Data) {
  _, _, err := client.Collection("iot").Add(context.TODO(), d)
  if err != nil {
    fmt.Printf("Error writing document %+v, %s", d, err)
  }
}

func mainStore(w http.ResponseWriter, r *http.Request) {
  var _data Data
  err := json.NewDecoder(r.Body).Decode(&_data)
  if err != nil {
    fmt.Printf("Error decoding incomming data %+v, %s", r.Body, err)
  }

  _data.Timestamp = time.Now().Unix()

  client := createClient(context.TODO())
  storeData(client, _data)

}
