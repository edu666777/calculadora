import React from "react";
import Calculadora from "./Calculadora";

function App() {
  return (
    <div style={{ background: "#181920", minHeight: "100vh", padding: "32px" }}>
      <h1 style={{ color: "#fff" }}>Calculadora</h1>
      <Calculadora />
    </div>
  );
}

export default App;