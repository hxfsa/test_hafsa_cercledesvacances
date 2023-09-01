import React from "react";

export const Panel = ({floors}) => {

  return (
    <div className="panel">
      {floors?.map((floor) => {
        return (
          <button className="panelButton" key={floor}>
            {floor}
          </button>
        );
      })}
      <div className="screen">
        <span>↑ ↓</span>
      </div>
    </div>
  );
};
