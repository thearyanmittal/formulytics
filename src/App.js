import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>
            <button
              onClick={() => {
                let id = null;
                const elem = document.getElementById("animate");
                let bounds = 350;
                let xPosStart = bounds / 2;
                let yPosStart = bounds / 2;
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
                    t -= 0.05;
                    xPos = xPosStart + 50 * Math.cos(t);
                    yPos = yPosStart + 50 * Math.sin(t);
                    elem.style.transform =
                      "rotate(" + (180 / 3.14) * t + "deg)";
                    elem.style.top = yPos + "px";
                    elem.style.left = xPos + "px";
                  }
                }
              }}
            >
              Click Me
            </button>
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
