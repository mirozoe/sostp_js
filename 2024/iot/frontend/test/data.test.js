import "chai/register-should.js";
import {
  Data,
  HeadingData,
  LightData,
  SoundData,
  TempData,
} from "../src/data.js";

describe("Test data class", function () {
  it("Parse all data", function () {
    const d = [
      { timestamp: 1234567, temp: 20, heading: 100, light: 100, sound: 20 },
      { timestamp: 1234567, temp: 2, heading: 10, light: 10, sound: 2 },
    ];
    const lEx1 = new LightData(100),
      lEx2 = new LightData(10);
    lEx1.timestamp = 1234567;
    lEx2.timestamp = 1234567;
    const hEx1 = new HeadingData(100),
      hEx2 = new HeadingData(10);
    hEx1.timestamp = 1234567;
    hEx2.timestamp = 1234567;
    const tEx1 = new TempData(20),
      tEx2 = new TempData(2);
    tEx1.timestamp = 1234567;
    tEx2.timestamp = 1234567;
    const sEx1 = new SoundData(20),
      sEx2 = new SoundData(2);
    sEx1.timestamp = 1234567;
    sEx2.timestamp = 1234567;
    const [l, h, t, s] = Data.parseData(d);
    l.should.be.a("array").to.have.deep.members([lEx1, lEx2]);
    h.should.be.a("array").to.have.deep.members([hEx1, hEx2]);
    t.should.be.a("array").to.have.deep.members([tEx1, tEx2]);
    s.should.be.a("array").to.have.deep.members([sEx1, sEx2]);
  });

  it("With empty data", function () {
    const d = [];
    const [l, h, t, s] = Data.parseData(d);
    l.should.be.empty;
    h.should.be.empty;
    t.should.be.empty;
    s.should.be.empty;
  });

  it("With missing values", function () {
    const d = [{ timestamp: 1234567, temp: 20, light: 100 }];
    const lEx = new LightData(100),
      tEx = new TempData(20);
    lEx.timestamp = 1234567;
    tEx.timestamp = 1234567;
    const [l, h, t, s] = Data.parseData(d);
    l.should.be.a("array").to.have.deep.members([lEx]);
    h.should.be.empty;
    t.should.be.a("array").to.have.deep.members([tEx]);
    s.should.be.empty;
  });

  it("With extra values", function () {
    const d = [{ timestamp: 1234567, temp: 20, light: 100, test: 3 }];
    const lEx = new LightData(100),
      tEx = new TempData(20);
    lEx.timestamp = 1234567;
    tEx.timestamp = 1234567;
    const [l, h, t, s] = Data.parseData(d);
    l.should.be.a("array").to.have.deep.members([lEx]);
    h.should.be.empty;
    t.should.be.a("array").to.have.deep.members([tEx]);
    s.should.be.empty;
  });
});

describe("Sorting data", function () {
  it("Sort few data", function () {
    const l = [new LightData(20), new LightData(30), new LightData(40)];
    l[2].timestamp = 1234567;
    l[1].timestamp = 1234568;
    l[0].timestamp = 1234569;
    Data.sortData(l)
      .should.be.a("array")
      .to.have.deep.members([l[2], l[1], l[0]]);
  });
});
