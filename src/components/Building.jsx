// import React, { useState } from "react";
import { Floor } from "./Floor";
import { useState } from "react";

const floors = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];

export const Building = () => {
  const [askedBuildingFloors, setAskedBuildingFloors] = useState([])

  const [currentFloor1, setCurrentFloor1] = useState(3);
  const [askedFloors1, setAskedFloors1] = useState([]);
  const [isMoving1, setIsMoving1] = useState();
  const [nextFloor1, setNextFloor1] = useState();
  const [isDoorOpen1, setIsDoorOpen1] = useState(true);

  const [currentFloor2, setCurrentFloor2] = useState(0);
  const [askedFloors2, setAskedFloors2] = useState([]);
  const [isMoving2, setIsMoving2] = useState();
  const [nextFloor2, setNextFloor2] = useState();
  const [isDoorOpen2, setIsDoorOpen2] = useState(true)

  const handleBuildingButton = (floor) => {
    if (!askedBuildingFloors.includes(floor)) {
      setAskedBuildingFloors([ ...askedBuildingFloors, floor ])
      
    }
  }

  return (
    <table className="building">
      <tbody>
        {floors.map((floor, key) => {

          const isHere1 = currentFloor1 === floor
          const isHere2 = currentFloor2 === floor

          const isDoorOpen1 = isHere1 && !isMoving1
          const isDoorOpen2 = isHere2 && !isMoving2

          return <Floor 
          key={key} 
          floor={floor} 
          isHere1={isHere1} 
          isHere2={isHere2}
          handleBuildingButton={handleBuildingButton}
          isAskedBuildingFloor={askedBuildingFloors.includes(floor)}
          isDoorOpen1={isDoorOpen1}
          isDoorOpen2={isDoorOpen2}
          />;
        })}
      </tbody>
    </table>
  );
};
