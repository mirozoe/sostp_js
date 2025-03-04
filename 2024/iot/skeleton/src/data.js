class Data {
  dataType = Object.freeze({
    TIMESTAMP: "timestamp",
    TEMP: "temp",
    LIGHT: "light",
    HEADING: "heading",
    SOUND: "sound"
  })
  unit
  value;
  timestamp;

  getValue() {
    return this.value;
  }

  setTimestamp(t) {
    this.timestamp = t
  }

  static parseData(data) {
    data.forEach( item => {
      let timestamp, tempData, lightData, headingData, soundData
      Object.entries(item).forEach( it => {
        switch (it[0]) {
          case this.dataType.TIMESTAMP:
            timestamp = it[1]
            break
          case this.dataType.TEMP:
            tempData = new TempData(it[1])
            break
          case this.dataType.LIGHT:
            lightData = new LightData(it[1])
            break
          case this.dataType.HEADING:
            headingData = new HeadingData(it[1])
            break
          case this.dataType.SOUND:
            soundData = new soundData(it[1])
        }
      })
      [ tempData, lightData, headingData, soundData ].forEach( it => it.setTimestamp(timestamp) )
    })
  }
}

class LightData extends Data {
  constructor(d) {
    super();
    this.value = d
    this.unit = "lux"
  }
}
class HeadingData extends Data {
  constructor(d) {
    super();
    this.value = d
    this.unit = "°"
  }
}
class TempData extends Data {
  constructor(d) {
    super();
    this.value = d
    this.unit = "˚C"
  }
}
class SoundData extends Data {
  constructor(d) {
    super();
    this.value = d
    this.unit = "db"
  }
}
