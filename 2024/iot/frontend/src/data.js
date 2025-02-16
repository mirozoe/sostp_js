export class Data {
  static DATA_TYPES = Object.freeze({
    TEMP: "temp",
    LIGHT: "light",
    HEADING: "heading",
    SOUND: "sound",
    TIMESTAMP: "timestamp",
  });

  getValue() {
    return this.value;
  }

  getTimestamp() {
    return this.timestamp;
  }

  getUnit() {
    return this.unit;
  }

  setTimestamp(t) {
    this.timestamp = t;
  }

  static parseData(data) {
    let lightData = [],
      headingData = [],
      tempData = [],
      soundData = [];

    data.forEach((it) => {
      const entries = Object.entries(it);
      let timestamp = "",
        lightItem,
        headingItem,
        tempItem,
        soundItem;

      entries.forEach((it) => {
        switch (it[0]) {
          case this.DATA_TYPES.TIMESTAMP:
            timestamp = it[1];
            break;
          case this.DATA_TYPES.LIGHT:
            lightItem = new LightData(it[1]);
            break;
          case this.DATA_TYPES.HEADING:
            headingItem = new HeadingData(it[1]);
            break;
          case this.DATA_TYPES.TEMP:
            tempItem = new TempData(it[1]);
            break;
          case this.DATA_TYPES.SOUND:
            soundItem = new SoundData(it[1]);
        }
      });

      if (lightItem) {
        lightItem.setTimestamp(timestamp);
        lightData.push(lightItem);
      }
      if (headingItem) {
        headingItem.setTimestamp(timestamp);
        headingData.push(headingItem);
      }
      if (tempItem) {
        tempItem.setTimestamp(timestamp);
        tempData.push(tempItem);
      }
      if (soundItem) {
        soundItem.setTimestamp(timestamp);
        soundData.push(soundItem);
      }
    });
    return [lightData, headingData, tempData, soundData];
  }

  static sortData(data) {
    return data.sort((a, b) => a.getTimestamp() - b.getTimestamp());
  }
}

export class TempData extends Data {
  constructor(d) {
    super();
    this.value = d;
    this.unit = "˚C";
  }
}

export class LightData extends Data {
  constructor(d) {
    super();
    this.value = d;
    this.unit = "lux";
  }
}

export class HeadingData extends Data {
  constructor(d) {
    super();
    this.value = d;
    this.unit = "°";
  }
}

export class SoundData extends Data {
  constructor(d) {
    super();
    this.value = d;
    this.unit = "db";
  }
}
