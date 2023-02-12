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
let initValues = [];

let driverSelected = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

let parseFront = [0, 11, 14, 11, 14, 18, 18, 15, 19, 1, 1, 1, 1];
let parseEnd = [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 3];

let buttonCount = 0;
let racerArr = Array(20)
  .fill()
  .map(() => Array(12));
let currVals =
  //lap, name, laptime, pitstoptime, totaltime, position, win percent
  fetch(
    "https://damp-sierra-23787.herokuapp.com/http://ec2-3-22-63-209.us-east-2.compute.amazonaws.com:8080/retrieveCurrData"
  )
    .then((response) => response.text())
    .then((data) => {
      racerArr = JSON.parse(data);
      console.log(data);
      racerArr.push(data);
    });

let testTimes = [
  [57, "Sebastian Vettel 🇩🇪", 88.142, 0, 4962.963, 1],
  [57, "Valtteri Bottas 🇫🇮", 87.507, 0, 4975.415, 2],
  [56, "Sergio Pérez 🇲🇽", 88.336, 0, 4979.243, 13],
];
let driverNames = [name[0], name[1], name[2]];
let driverArrays = testTimes;
let averageSpeed = [driverArrays[0][2], driverArrays[1][2], driverArrays[2][2]];
let currentAverageSpeed = averageSpeed;
let mainDriverName = driverNames[0];
let zeroTime = 4962.963;

let times = [88, 87, 88]; //times in seconds per racer
let timeScaler = 90;

function App() {
  const [selectedRacers, setSelectedRacers] = useState([]);
  console.log(currVals);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div className="row d-flex flex-direction-row">
            <div id="simulation" className="col">
              <p id="titleImage" align="center">
                Formulytics
              </p>
              <p>
                <div className="slider-row">
                  <div>
                    <div className="d-flex justify-content-center">
                      <p className="speed-text">Speed</p>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="100"
                      defaultValue="50"
                      id="speedSlider"
                    />
                  </div>
                </div>
              </p>
              <div id="container">
                <div id="animate0" className="animate"></div>
                <div id="animate1" className="animate"></div>
                <div id="animate2" className="animate"></div>
                <div id="animate3" className="animate"></div>
                <div id="animate4" className="animate"></div>
              </div>
            </div>

            <div className="col" align="center">
              <table class="mainTable">
                <thead>
                  <tr class="tableHeader">
                    <th scope="col">Name</th>
                    <th scope="col">Place</th>
                    <th scope="col">Lap</th>
                    <th scope="col">Win %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr id="mainRow0">
                    <td id="maintableName0">Driver 1</td>
                    <td id="maintablePlace0">1</td>
                    <td id="maintableLap0">0</td>
                    <td id="maintableWin0">27.3%</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr id="mainRow1">
                    <td id="maintableName1">Driver 2</td>
                    <td id="maintablePlace1">2</td>
                    <td id="maintableLap1">0</td>
                    <td id="maintableWin1">8.0%</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr id="mainRow2">
                    <td id="maintableName2">Driver 3</td>
                    <td id="maintablePlace2">3</td>
                    <td id="maintableLap2">0</td>
                    <td id="maintableWin2">3.3%</td>
                  </tr>
                </tbody>
              </table>

              <table class="statTable">
                <thead>
                  <tr class="tableHeader">
                    <th scope="col">%UP</th>
                    <th scope="col">%DOWN</th>
                    <th scope="col">%STAY</th>
                    <th scope="col">%POD</th>
                    <th scope="col">%WIN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr id="statRow0">
                    <td id="probUp0">0.0%</td>
                    <td id="probDown0">72.7%</td>
                    <td id="probSame0">27.3%</td>
                    <td id="probPodium0">64.4%</td>
                    <td id="probWin0">27.3%</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr id="statRow1">
                    <td id="probUp1">8.0%</td>
                    <td id="probDown1">75.3%</td>
                    <td id="probSame1">16.7%</td>
                    <td id="probPodium1">44.0%</td>
                    <td id="probWin1">8.0%</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr id="statRow2">
                    <td id="probUp2">11.2%</td>
                    <td id="probDown2">83.6%</td>
                    <td id="probSame2">5.2%</td>
                    <td id="probPodium2">16.4%</td>
                    <td id="probWin2">3.3%</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <p id="timeText" align="left">
                  RaceTime: 0:00:00
                </p>
              </div>
              <div align="center">
                <button
                  id="resetButton"
                  onClick={() => {
                    carCode();
                  }}
                >
                  Start😊
                </button>
              </div>
            </div>

            <div id="bottomRow" className="row">
              <table class="table">
                <thead>
                  <tr class="tableHeader">
                    <th scope="col">Select 3</th>
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
                        selectDriver(0);
                      }}
                    ></input>
                    <td id="tableName0">0</td>
                    <td id="tablePlace0">1</td>
                    <td id="tableLap0">0</td>
                  </tr>
                  <tr id="row1" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select1"
                      value="check0"
                      onClick={() => {
                        selectDriver(1);
                      }}
                    ></input>
                    <td id="tableName1">0</td>
                    <td id="tablePlace1">2</td>
                    <td id="tableLap1">0</td>
                  </tr>
                  <tr id="row2" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select2"
                      value="check0"
                      onClick={() => {
                        selectDriver(2);
                      }}
                    ></input>
                    <td id="tableName2">0</td>
                    <td id="tablePlace2">12</td>
                    <td id="tableLap2">0</td>
                  </tr>
                  <tr id="row3" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select3"
                      value="check0"
                      onClick={() => {
                        selectDriver(3);
                      }}
                    ></input>
                    <td id="tableName3">0</td>
                    <td id="tablePlace3">12</td>
                    <td id="tableLap3">0</td>
                  </tr>
                  <tr id="row4" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select4"
                      value="check0"
                      onClick={() => {
                        selectDriver(4);
                      }}
                    ></input>
                    <td id="tableName4">0</td>
                    <td id="tablePlace4">12</td>
                    <td id="tableLap4">0</td>
                  </tr>
                  <tr id="row5" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select5"
                      value="check0"
                      onClick={() => {
                        selectDriver(5);
                      }}
                    ></input>
                    <td id="tableName5">0</td>
                    <td id="tablePlace5">12</td>
                    <td id="tableLap5">0</td>
                  </tr>
                  <tr id="row6" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select6"
                      value="check0"
                      onClick={() => {
                        selectDriver(6);
                      }}
                    ></input>
                    <td id="tableName6">0</td>
                    <td id="tablePlace6">12</td>
                    <td id="tableLap6">0</td>
                  </tr>
                  <tr id="row7" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select7"
                      value="check0"
                      onClick={() => {
                        selectDriver(7);
                      }}
                    ></input>
                    <td id="tableName7">0</td>
                    <td id="tablePlace7">12</td>
                    <td id="tableLap7">0</td>
                  </tr>
                  <tr id="row8" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select8"
                      value="check0"
                      onClick={() => {
                        selectDriver(8);
                      }}
                    ></input>
                    <td id="tableName8">0</td>
                    <td id="tablePlace8">12</td>
                    <td id="tableLap8">0</td>
                  </tr>
                  <tr id="row9" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select9"
                      value="check0"
                      onClick={() => {
                        selectDriver(9);
                      }}
                    ></input>
                    <td id="tableName9">0</td>
                    <td id="tablePlace9">12</td>
                    <td id="tableLap9">0</td>
                  </tr>
                  <tr id="row10" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select10"
                      value="check0"
                      onClick={() => {
                        selectDriver(10);
                      }}
                    ></input>
                    <td id="tableName10">0</td>
                    <td id="tablePlace10">12</td>
                    <td id="tableLap10">0</td>
                  </tr>
                  <tr id="row11" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select11"
                      value="check0"
                      onClick={() => {
                        selectDriver(11);
                      }}
                    ></input>
                    <td id="tableName11">0</td>
                    <td id="tablePlace11">12</td>
                    <td id="tableLap11">0</td>
                  </tr>
                  <tr id="row12" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select12"
                      value="check0"
                      onClick={() => {
                        selectDriver(12);
                      }}
                    ></input>
                    <td id="tableName12">0</td>
                    <td id="tablePlace12">12</td>
                    <td id="tableLap12">0</td>
                  </tr>
                  <tr id="row13" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select13"
                      value="check0"
                      onClick={() => {
                        selectDriver(13);
                      }}
                    ></input>
                    <td id="tableName13">0</td>
                    <td id="tablePlace13">12</td>
                    <td id="tableLap13">0</td>
                  </tr>
                  <tr id="row14" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select14"
                      value="check0"
                      onClick={() => {
                        selectDriver(14);
                      }}
                    ></input>
                    <td id="tableName14">0</td>
                    <td id="tablePlace14">12</td>
                    <td id="tableLap14">0</td>
                  </tr>
                  <tr id="row15" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select15"
                      value="check0"
                      onClick={() => {
                        selectDriver(15);
                      }}
                    ></input>
                    <td id="tableName15">0</td>
                    <td id="tablePlace15">12</td>
                    <td id="tableLap15">0</td>
                  </tr>
                  <tr id="row16" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select16"
                      value="check0"
                      onClick={() => {
                        selectDriver(16);
                      }}
                    ></input>
                    <td id="tableName16">0</td>
                    <td id="tablePlace16">12</td>
                    <td id="tableLap16">0</td>
                  </tr>
                  <tr id="row17" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select17"
                      value="check0"
                      onClick={() => {
                        selectDriver(17);
                      }}
                    ></input>
                    <td id="tableName17">0</td>
                    <td id="tablePlace17">12</td>
                    <td id="tableLap17">0</td>
                  </tr>
                  <tr id="row18" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select18"
                      value="check0"
                      onClick={() => {
                        selectDriver(18);
                      }}
                    ></input>
                    <td id="tableName18">0</td>
                    <td id="tablePlace18">12</td>
                    <td id="tableLap18">0</td>
                  </tr>
                  <tr id="row19" class="unusedRow">
                    <input
                      type="checkbox"
                      id="select19"
                      value="check0"
                      onClick={() => {
                        selectDriver(19);
                      }}
                    ></input>
                    <td id="tableName19">0</td>
                    <td id="tablePlace19">12</td>
                    <td id="tableLap19">0</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <input
                  type="text"
                  placeholder="(000) 000-0000"
                  id="phone-input"
                  clas
                  onKeyDown={(e) => {
                    if (
                      [
                        "0",

                        "1",

                        "2",

                        "3",

                        "4",

                        "5",

                        "6",

                        "7",

                        "8",

                        "9",

                        "Backspace",

                        "Delete",
                      ].indexOf(e.key) !== -1
                    ) {
                    } else {
                      e.preventDefault();
                    }
                  }}
                  onKeyUp={() => {
                    const inputField = document.getElementById("phone-input");

                    const formattedInput = (value) => {
                      if (!value) return value;

                      const phoneNumber = value.replace(/[^\d]/g, "");

                      const phoneNumberLength = phoneNumber.length;

                      if (phoneNumberLength < 4) return phoneNumber;

                      if (phoneNumberLength < 7) {
                        return `(${phoneNumber.slice(
                          0,
                          3
                        )}) ${phoneNumber.slice(3)}`;
                      }

                      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
                        3,

                        6
                      )}-${phoneNumber.slice(6, 10)}`;
                    };

                    inputField.value = formattedInput(inputField.value);
                  }}
                />
              </div>
              <div className="p-5">
                <button
                  className=""
                  onClick={() => {
                    fetch(
                      "https://damp-sierra-23787.herokuapp.com/http://ec2-3-22-63-209.us-east-2.compute.amazonaws.com:8080/getStarted?number=" +
                        document.getElementById("phone-input").value
                    );
                  }}
                >
                  Subscribe
                </button>
              </div>
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

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let reseting = 1;
async function startNextLap() {
  reseting = 1;
  await delay(1000);
  reseting = 0;
  carCode();
}

function selectDriver(x) {
  let numOfSelected = numberOfChecks();
  if (numOfSelected < 3 && driverSelected[x] === false) {
    driverSelected[x] = true;
  } else if (driverSelected[x] === true) {
    driverSelected[x] = false;
  } else {
    document.getElementById("select" + x).click();
  }
  let j = 0;
  for (let i = 0; i < name.length; i++) {
    if (driverSelected[i]) {
      driverNames[j] = name[i];

      j++;
    }
  }
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 3; j++) {
      if (racerArr[i][1] === driverNames[j]) {
        driverArrays[i] = racerArr[i];
      }
    }
  }
  if (!reseting) carCode();
}

function numberOfChecks() {
  let num = 0;
  for (let i = 0; i < driverSelected.length; i++) {
    if (driverSelected[i] === true) {
      num++;
    }
  }
  return num;
}

function carCode() {
  document.getElementById("resetButton").style.visibility = "hidden";
  for (let i = 0; i < times.length; i++) {
    //3 main drivers
    console.log(driverArrays);
    document.getElementById("maintableName" + i).textContent = driverNames[i];
    document.getElementById("maintableLap" + i).textContent =
      driverArrays[i][0];
    document.getElementById("maintablePlace" + i).textContent =
      driverArrays[i][5];
  }
  for (let i = 0; i < name.length; i++) {
    //other drivers
    document.getElementById("tableName" + i).textContent = racerArr[i][1];
    document.getElementById("tablePlace" + i).textContent = racerArr[i][5];
    document.getElementById("tableLap" + i).textContent = racerArr[i][0];
  }

  /*num of cars must be <=5*/
  const numCars = 3;
  let startPos = []; /*adjusted start pos based on total time*/
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
          rad * (1 / averageSpeed[i]) * (zeroTime - driverArrays[i][4]);
      }
      console.log(currentAverageSpeed[i]);
    }
    //parseData(testTimes[buttonCount]); //but do new data here instead of that
  }

  const slider = document.getElementById("speedSlider");
  let id = null;
  let elem = [];
  for (let i = 0; i < numCars; i++) {
    elem[i] = document.getElementById("animate" + i);
  }
  for (let i = 4; i >= numCars; i--) {
    document.getElementById("animate" + i).style.visibility = "hidden";
  }
  let bounds = 400;
  let carWidth = 30;
  let carHeight = 60;
  let xPosStart = -10 + (bounds - carWidth) / 2;
  let yPosStart = (bounds - carHeight) / 2;
  let xPos = 0;
  let yPos = 0;
  let reset = 0;
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
      let tOffset = startPos[i]; /*(i * Math.PI) / (numCars / 2);*/
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
      let timeSeconds = zeroTime + (t[0] / 2 / Math.PI) * 90;
      let timeMins = timeSeconds / 60;
      let timeHours = timeMins / 60;
      let formatedTime = "";
      if (timeHours !== 0) formatedTime += Math.floor(timeHours) + ":";
      if (timeMins % 60 <= 9) formatedTime += "0";
      formatedTime += Math.floor(timeMins % 60) + ".";
      if (timeSeconds % 60 <= 9) formatedTime += "0";
      formatedTime += Math.floor(timeSeconds % 60);
      document.getElementById("timeText").textContent =
        "Race Time: " + formatedTime;

      elem[i].style.transform =
        "rotate(" + (180 + (-180 / Math.PI) * (t[i] + tOffset)) + "deg)";

      elem[i].style.top = xPos + "px";
      elem[i].style.left = yPos + "px";
      if (!reset && t[0] > -0.1 + (5 * Math.PI) / 2) {
        animationActive = 0;
        clearInterval(id);
        startNextLap();
        reset = 1;
        //console.log("lap complete");
      }
    }
  }
}

export default App;
