import React from "react";

export const ElevatorDoor = 
({ isLightOn, isOpen }) => {
  return <>
    <div className="flex flex-col">
      <input type="checkbox" checked={isLightOn} onChange={()=>null} className="m-0" />
    <div className={`door ${isOpen && 'open'}`}></div>
    </div>
  </>;
};
