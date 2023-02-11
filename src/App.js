import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>
            <button
              id="resetButton"
              onClick={() => {
                const slider = document.getElementById("speedSlider");
                let id = null;
                const elem = document.getElementById("animate");
                let bounds = 400;
                let xPosStart = (bounds - 61) / 2;
                let yPosStart = (bounds - 32) / 2;
                let xPos = 0;
                let yPos = 0;
                let t = 0;
                let rot = 0;
                clearInterval(id);
                id = setInterval(frame, 5);

                function frame() {
                  if (xPos >= bounds || yPos >= bounds) {
                    elem.style.top = bounds + "px";
                    elem.style.left = bounds + "px";
                    clearInterval(id);
                  } else {
                    t += 0.05 * (Math.pow(slider.value / 50, 2) + 0.25);
                    xPos = xPosStart + 150 * Math.cos(t);
                    yPos = yPosStart + 150 * Math.sin(t);
                    elem.style.transform =
                      "rotate(" + (90 + (-180 / Math.PI) * t) + "deg)";
                    elem.style.top = xPos + "px";
                    elem.style.left = yPos + "px";
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
            <div id="animate"></div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
