import { useState } from "react";
import { Building } from "./components/Building";
import { ElevatorDoor } from "./components/ElevatorDoor";
import { Panel } from "./components/Panel";
import "./App.css";

function App() {
  return (
    <div className="app flex justify-around items-center">
      <Panel floors={[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]} />
      <Building />
      <Panel floors={[9, 8, 6, 4, 2, 0, -1, -2, -3 ,-4, -5]} />
    </div>
  );
}

export default App;
