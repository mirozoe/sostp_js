const dataType = Object.freeze({
  TIMESTAMP: "timestamp",
  TEMP: "temp",
  LIGHT: "light",
  HEADING: "heading",
  SOUND: "sound",
});

export class Data {
  unit;
  value;
  timestamp;

  getValue() {
    return this.value;
  }

  getUnit() {
    return this.unit;
  }

  getTimestamp() {
    return this.timestamp;
  }

  setTimestamp(t) {
    this.timestamp = t;
  }

  static parseData(data) {
    let temp = [],
      light = [],
      heading = [],
      sound = [];
    data.forEach((item) => {
      let timestamp, tempData, lightData, headingData, soundData;
      Object.entries(item).forEach((it) => {
        switch (it[0]) {
          case dataType.TIMESTAMP:
            timestamp = it[1];
            break;
          case dataType.TEMP:
            tempData = new TempData(it[1]);
            break;
          case dataType.LIGHT:
            lightData = new LightData(it[1]);
            break;
          case dataType.HEADING:
            headingData = new HeadingData(it[1]);
            break;
          case dataType.SOUND:
            soundData = new SoundData(it[1]);
        }
      });

      const parsed = [tempData, lightData, headingData, soundData];
      parsed.forEach((it) => it.setTimestamp(timestamp));

      temp.push(tempData);
      light.push(lightData);
      heading.push(headingData);
      sound.push(soundData);
    });

    return [temp, light, heading, sound];
  }
}

class LightData extends Data {
  constructor(d) {
    super();
    this.value = d;
    this.unit = "lux";
  }
}
class HeadingData extends Data {
  constructor(d) {
    super();
    this.value = d;
    this.unit = "°";
  }
}
class TempData extends Data {
  constructor(d) {
    super();
    this.value = d;
    this.unit = "˚C";
  }
}
class SoundData extends Data {
  constructor(d) {
    super();
    this.value = d;
    this.unit = "db";
  }
}
