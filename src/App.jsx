import { Building } from "./components/Building";
import "./App.css";
import building from "../public/building.jpg";

function App() {
  return (
    <div
      className="app flex justify-around items-center"
      style={{ backgroundImage: `url(${building})` }}
    >
      <Building />
    </div>
  );
}

export default App;
