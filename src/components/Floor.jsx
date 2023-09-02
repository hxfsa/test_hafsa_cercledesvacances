import React from "react";
import { ElevatorDoor } from "./ElevatorDoor";
import { useEffect } from "react";

export const Floor = ({
  floor,
  isHere1,
  isHere2,
  handleBuildingButton,
  isAskedBuildingFloor,
  isLightOn1,
  isLightOn2,
  isDoorOpen1,
  isDoorOpen2
}) => {

  return (
    <tr className="pb-2">
      <td>{floor}</td>
      <td className="flex">
        <ElevatorDoor
          isLightOn={isLightOn1}
          isOpen={isDoorOpen1}
        />
        <ElevatorDoor
          isLightOn={isLightOn2}
          isOpen={isDoorOpen2}
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
