import React from "react";

export const Panel = ({
  floors,
  left = false,
  right = false,
  askedFloors,
  setAskedFloors,
  isMoving,
}) => {
  const handlePanelButton = (floor) => {
    !askedFloors.includes(floor) && setAskedFloors([...askedFloors, floor]);
  };

  return (
    <div
      className={`panel ${
        (left && "position-left") || (right && "position-right")
      }`}
    >
      {floors?.map((floor) => {
        return (
          <button
            className={`panelButton ${
              askedFloors.includes(floor) && "button-border"
            }`}
            key={floor}
            onClick={() => handlePanelButton(floor)}
          >
            {floor}
          </button>
        );
      })}
      <div className="screen">
        <span className={`arrow ${isMoving === "up" && "arrow-light"}`}>▲</span>
        <br />
        <span className={`arrow ${isMoving === "down" && "arrow-light"}`}>
          ▼
        </span>
      </div>
    </div>
  );
};
