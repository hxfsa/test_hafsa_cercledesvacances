import React from "react";

export const ElevatorDoor = ({ isLightOn, isOpen }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className={`light ${isLightOn && "yellow-light"}`} />
        <div className={`door ${isOpen && "open"}`}></div>
      </div>
    </>
  );
};
