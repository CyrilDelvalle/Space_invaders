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
        <h1 className="results">0</h1>
        <div className="grid"></div>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
