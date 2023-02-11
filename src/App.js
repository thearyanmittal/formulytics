import logo from "./logo.svg";
import "./App.css";
import { createElement } from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>
            <button
              id="resetButton"
              onClick={() => {
                /*num of cars must be <=5*/
                const numCars = 3;

                let times = []; /*times in seconds*/
                times = [90, 97, 72, 53, 66];

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
                console.log(elem);
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
                      ((0.01 * shortestTime) / times[i]) *
                      (Math.pow(slider.value / 50, 2) +
                        0.25); /*max slider of 4 min of .25*/
                    let tOffset = 0; /*(i * Math.PI) / (numCars / 2);*/
                    let maxRadius = 195 - carWidth / 2;

                    xPos =
                      xPosStart +
                      (maxRadius - (carWidth + 2) * i) *
                        Math.cos(t[i] + tOffset) +
                      10;

                    yPos =
                      yPosStart +
                      (maxRadius - (carWidth + 2) * i) *
                        Math.sin(t[i] + tOffset);

                    elem[i].style.transform =
                      "rotate(" +
                      (180 + (-180 / Math.PI) * (t[i] + tOffset)) +
                      "deg)";

                    elem[i].style.top = xPos + "px";
                    elem[i].style.left = yPos + "px";
                  }
                }
              }}
            >
              Reset
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
      </header>
    </div>
  );
}

export default App;
