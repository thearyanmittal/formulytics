import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const name = [
  "Lewis Hamilton 🇬🇧",
  "Sebastian Vettel 🇩🇪",
  "Valtteri Bottas 🇫🇮",
  "Kimi Räikkönen 🇫🇮",
  "Max Verstappen 🇳🇱",
  "Felipe Massa 🇧🇷",
  "Romain Grosjean 🇫🇷",
  "Carlos Sainz 🇪🇸",
  "Sergio Pérez 🇲🇽",
  "Daniil Kvyat 🇷🇺",
  "Fernando Alonso 🇪🇸",
  "Nico Hülkenberg 🇩🇪",
  "Esteban Ocon 🇫🇷",
  "Lance Stroll 🇨🇦",
  "Jolyon Palmer 🇬🇧",
  "Stoffel Vandoorne 🇧🇪",
  "Antonio Giovinazzi 🇮🇹",
  "Marcus Ericsson 🇸🇪",
  "Kevin Magnussen 🇩🇰",
  "Daniel Ricciardo 🇦🇺",
];

let buttonCount = -1;
let testTimes = [
  [57, "Sebastian Vettel 🇩🇪", 88.142, 0, 4962.963, 1],
  [57, "Valtteri Bottas 🇫🇮", 87.507, 0, 4975.415, 2],
  [56, "Sergio Pérez 🇲🇽", 88.336, 0, 4979.243, 13],
];
let driverNames = [name[1], name[2], name[8]];
let driverArrays = testTimes;
let averageSpeed = [90, 94, 100];
let currentAverageSpeed = [90, 94, 100];
let mainDriverName = "name";
let zeroTime = 4962.963;

let times = [88, 87, 88]; //times in seconds per racer
let timeScaler = 90;

function App() {
  const [selectedRacers, setSelectedRacers] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div className="row d-flex flex-direction-row">
            <div id="simulation" className="col">
              <p>
                <button
                  id="resetButton"
                  onClick={() => {
                    for (let i = 0; i < times.length; i++) {
                      document.getElementById("maintableName" + i).textContent =
                        driverNames[i];
                      document.getElementById("maintableLap" + i).textContent =
                        driverArrays[i][0];
                      document.getElementById(
                        "maintablePlace" + i
                      ).textContent = driverArrays[i][5];
                    }
                    for (let i = 0; i < name.length; i++) {
                      document.getElementById("tableName" + i).textContent =
                        name[i];
                    }

                    buttonCount += 1;
                    /*num of cars must be <=5*/
                    const numCars = 3;
                    let startPos =
                      []; /*adjusted start pos based on total time*/
                    if (buttonCount >= 0) {
                      for (let i = 0; i < numCars; i++) {
                        let rad = 2 * Math.PI;
                        if (driverArrays[i][4] < zeroTime) {
                          startPos[i] =
                            rad *
                            (-1 / timeScaler + 1 / currentAverageSpeed[i]) *
                            (zeroTime - driverArrays[i][4]);
                        } else {
                          startPos[i] =
                            rad *
                            (1 / averageSpeed[i]) *
                            (zeroTime - driverArrays[i][4]);
                        }
                        console.log(currentAverageSpeed[i]);
                      }
                      parseData(testTimes[buttonCount]);
                    }

                    const slider = document.getElementById("speedSlider");
                    let id = null;
                    let elem = [];
                    let shortestTime = Number.MAX_SAFE_INTEGER;
                    for (let i = 0; i < numCars; i++) {
                      elem[i] = document.getElementById("animate" + i);
                      if (shortestTime > times[i]) {
                        /*only run on first lap*/
                        shortestTime = times[i];
                      }
                    }
                    for (let i = 4; i >= numCars; i--) {
                      document.getElementById("animate" + i).style.visibility =
                        "hidden";
                    }
                    let bounds = 400;
                    let carWidth = 30;
                    let carHeight = 60;
                    let xPosStart = -10 + (bounds - carWidth) / 2;
                    let yPosStart = (bounds - carHeight) / 2;
                    let xPos = 0;
                    let yPos = 0;
                    let t = [
                      Math.PI / 2,
                      Math.PI / 2,
                      Math.PI / 2,
                      Math.PI / 2,
                      Math.PI / 2,
                    ]; /*starting position on 0 rad*/
                    let rot = 0;
                    clearInterval(id);
                    id = setInterval(frame, 5);

                    let animationActive = 1;

                    function frame() {
                      for (let i = 0; i < numCars; i++) {
                        t[i] +=
                          animationActive *
                          (((0.0077 * timeScaler) / times[i]) *
                            (Math.pow(slider.value / 50, 2) +
                              0.25)); /*max slider of 4 min of .25*/
                        let tOffset =
                          startPos[i]; /*(i * Math.PI) / (numCars / 2);*/
                        let maxRadius = 195 - carWidth / 2;

                        xPos =
                          xPosStart +
                          (maxRadius - (carWidth + 2) * (numCars - i - 1)) *
                            Math.cos(t[i] + tOffset) +
                          10;

                        yPos =
                          yPosStart +
                          (maxRadius - (carWidth + 2) * (numCars - i - 1)) *
                            Math.sin(t[i] + tOffset);

                        elem[i].style.transform =
                          "rotate(" +
                          (180 + (-180 / Math.PI) * (t[i] + tOffset)) +
                          "deg)";

                        elem[i].style.top = xPos + "px";
                        elem[i].style.left = yPos + "px";
                        if (t[0] > -0.1 + (5 * Math.PI) / 2) {
                          animationActive = 0;
                          clearInterval(id);
                          //console.log("lap complete");
                        }
                      }
                    }
                  }}
                >
                  Next Data😊
                </button>
                <label for="fader" id="speedLabel">
                  Speed{" "}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  defaultValue="50"
                  id="speedSlider"
                ></input>
              </p>
              <div id="container">
                <div id="animate0" className="animate"></div>
                <div id="animate1" className="animate"></div>
                <div id="animate2" className="animate"></div>
                <div id="animate3" className="animate"></div>
                <div id="animate4" className="animate"></div>
              </div>
            </div>
            <div className="col">
              <table class="mainTable row" id="table">
                <thead>
                  <tr class="tableHeader">
                    <th scope="col">Name</th>
                    <th scope="col">Place</th>
                    <th scope="col">Lap</th>
                  </tr>
                </thead>
                {selectedRacers.map((val) => {
                  {
                    console.log(val.name);
                  }
                  <thead className="row" key={val.get("name")}>
                    <tr id="mainRow0">
                      <td id="maintableName0">{val.get("name")}</td>
                      <td id="maintablePlace0">{val.get("place")}</td>
                      <td id="maintableLap0">{val.get("lap")}</td>
                    </tr>
                  </thead>;
                })}
              </table>
            </div>

            <div id="bottomRow" className="row">
              <div className="col">
                <table class="table">
                  <thead>
                    <tr class="tableHeader">
                      <th scope="col">Select</th>
                      <th scope="col">Name</th>
                      <th scope="col">Place</th>
                      <th scope="col">Lap</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr id="row0" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                        onClick={() => {
                          setSelectedRacers((selectedRacers) => [
                            ...selectedRacers,
                            {
                              name: document.getElementById("tableName0")
                                .innerText,
                              place:
                                document.getElementById("tablePlace0")
                                  .innerText,
                              lap: document.getElementById("tableLap0")
                                .innerText,
                            },
                          ]);
                        }}
                      ></input>
                      <td id="tableName0">Testing</td>
                      <td id="tablePlace0">1</td>
                      <td id="tableLap0">asdf</td>
                    </tr>
                    <tr id="row1" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName1">asdf</td>
                      <td id="tablePlace1">2</td>
                      <td id="tableLap1">asdf</td>
                    </tr>
                    <tr id="row2" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName2">asdf</td>
                      <td id="tablePlace2">12</td>
                      <td id="tableLap2">asdf</td>
                    </tr>
                    <tr id="row3" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName3">asdf</td>
                      <td id="tablePlace3">12</td>
                      <td id="tableLap3">asdf</td>
                    </tr>
                    <tr id="row4" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName4">asdf</td>
                      <td id="tablePlace4">12</td>
                      <td id="tableLap4">asdf</td>
                    </tr>
                    <tr id="row5" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName5">asdf</td>
                      <td id="tablePlace5">12</td>
                      <td id="tableLap5">asdf</td>
                    </tr>
                    <tr id="row6" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName6">asdf</td>
                      <td id="tablePlace6">12</td>
                      <td id="tableLap6">asdf</td>
                    </tr>
                    <tr id="row7" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName7">asdf</td>
                      <td id="tablePlace7">12</td>
                      <td id="tableLap7">asdf</td>
                    </tr>
                    <tr id="row8" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName8">asdf</td>
                      <td id="tablePlace8">12</td>
                      <td id="tableLap8">asdf</td>
                    </tr>
                    <tr id="row9" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName9">asdf</td>
                      <td id="tablePlace9">12</td>
                      <td id="tableLap9">asdf</td>
                    </tr>
                    <tr id="row10" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName10">asdf</td>
                      <td id="tablePlace10">12</td>
                      <td id="tableLap10">asdf</td>
                    </tr>
                    <tr id="row11" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName11">asdf</td>
                      <td id="tablePlace11">12</td>
                      <td id="tableLap11">asdf</td>
                    </tr>
                    <tr id="row12" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName12">asdf</td>
                      <td id="tablePlace12">12</td>
                      <td id="tableLap12">asdf</td>
                    </tr>
                    <tr id="row13" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName13">asdf</td>
                      <td id="tablePlace13">12</td>
                      <td id="tableLap13">asdf</td>
                    </tr>
                    <tr id="row14" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName14">asdf</td>
                      <td id="tablePlace14">12</td>
                      <td id="tableLap14">asdf</td>
                    </tr>
                    <tr id="row15" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName15">asdf</td>
                      <td id="tablePlace15">12</td>
                      <td id="tableLap15">asdf</td>
                    </tr>
                    <tr id="row16" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName16">asdf</td>
                      <td id="tablePlace16">12</td>
                      <td id="tableLap16">asdf</td>
                    </tr>
                    <tr id="row17" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName17">asdf</td>
                      <td id="tablePlace17">12</td>
                      <td id="tableLap17">asdf</td>
                    </tr>
                    <tr id="row18" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName18">asdf</td>
                      <td id="tablePlace18">12</td>
                      <td id="tableLap18">asdf</td>
                    </tr>
                    <tr id="row19" class="unusedRow">
                      <input
                        type="checkbox"
                        id="select0"
                        value="check0"
                      ></input>
                      <td id="tableName19">asdf</td>
                      <td id="tablePlace19">12</td>
                      <td id="tableLap19">asdf</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

function parseData(data) {
  let Drivername = data[1];
  let driverIndex = name.indexOf(Drivername);
  if (driverIndex != -1) {
    driverArrays[driverIndex] = data;
  } else {
    return 1;
  }

  let lap = data[0];
  let speed = data[2];
  let pitStop = data[3];
  let totalTime = data[4];
  let place = data[5];
  times[driverIndex] = speed;
  if (lap >= 1) {
    averageSpeed[driverIndex] = totalTime / (lap - 1);
    currentAverageSpeed[driverIndex] = (totalTime + speed) / (lap - 1);
  } else {
    averageSpeed = speed;
    currentAverageSpeed = speed;
  }
  if (name === mainDriverName) {
    zeroTime = totalTime;
  }
}

export default App;
