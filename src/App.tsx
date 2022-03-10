import React, { useEffect } from "react";
import "./App.css";
import script from "./scripts/script";

function App() {
  useEffect(() => {
    script();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="divScore">
          <p className="score">
            <span>Score: </span> <span id="scoreElement">0</span>
          </p>
          <canvas></canvas>
        </div>
        <p className="message">
          <span id="messageElement"></span>
        </p>
      </header>
    </div>
  );
}

export default App;
