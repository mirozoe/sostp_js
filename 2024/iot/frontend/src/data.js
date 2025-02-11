export class Data {
  getData() {
    return this.data;
  }

  setData(d, valueName, unit) {
    const updatedData = d.map((element) => {
      return {
        timestamp: element.timestamp,
        value: element[valueName],
        unit: unit,
      };
    });
    this.data = updatedData;
  }
  static sortData(data) {
    return data.sort((a, b) => a.timestamp - b.timestamp);
  }
}

export class TempData extends Data {
  constructor(d) {
    super();
    const sorted = Data.sortData(d);
    this.setData(sorted, "temp", "°C");
  }
}

export class LightData extends Data {
  constructor(d) {
    super();
    const sorted = Data.sortData(d);
    this.setData(sorted, "light", "lux");
  }
}

export class CompassData extends Data {
  constructor(d) {
    super();
    const sorted = Data.sortData(d);
    this.setData(sorted, "heading", "°");
  }
}

export class SoundData extends Data {
  constructor(d) {
    super();
    const sorted = Data.sortData(d);
    this.setData(sorted, "sound", "dB");
  }
}
