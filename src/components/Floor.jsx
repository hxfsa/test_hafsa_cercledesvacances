import React from "react";
import { useState } from "react";
import { ElevatorDoor } from "./ElevatorDoor";

export const Floor = ({
  floor,
  isHere1,
  isHere2,
  handleBuildingButton,
  isAskedBuildingFloor,
}) => {
  const [isFirstLightOn, setIsFirstLightOn] = useState(isHere1);
  const [isSecondLightOn, setIsSecondLightOn] = useState(isHere2);

  return (
    <tr className="pb-2">
      <td>{floor}</td>
      <td className="flex">
        <ElevatorDoor
          isLightOn={isFirstLightOn}
          isOpen={isHere1}
        />
        <ElevatorDoor
          isLightOn={isSecondLightOn}
          isOpen={isHere2}
        />
      </td>
      <td>
        <input
          type="radio"
          onClick={() => handleBuildingButton(floor)}
          checked={isAskedBuildingFloor}
          onChange={()=>null}
        ></input>
      </td>
    </tr>
  );
};
