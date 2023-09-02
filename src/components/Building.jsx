// import React, { useState } from "react";
import { Floor } from "./Floor";
import { useEffect, useState, useCallback } from "react";

const floors = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];

export const Building = () => {
  const [askedBuildingFloors, setAskedBuildingFloors] = useState([]);

  const [currentFloor1, setCurrentFloor1] = useState(3);
  const [askedFloors1, setAskedFloors1] = useState([]);
  const [isMoving1, setIsMoving1] = useState();
  const [nextStop1, setNextStop1] = useState();
  const [isDoorOpen1, setIsDoorOpen1] = useState(true);

  const [currentFloor2, setCurrentFloor2] = useState(0);
  const [askedFloors2, setAskedFloors2] = useState([]);
  const [isMoving2, setIsMoving2] = useState();
  const [nextStop2, setNextStop2] = useState();
  const [isDoorOpen2, setIsDoorOpen2] = useState(true);

  const handleBuildingButton = (floor) => {
    if (!askedBuildingFloors.includes(floor)) {
      setAskedBuildingFloors([...askedBuildingFloors, floor]);
    }
  };

  // lorsque un nouvel étage est demandé dans l'immeuble,
  //   on optimise les trajets de chaque ascenseur
  useEffect(() => {
    if (askedBuildingFloors.length > 0) {
      optimizeTrips();
    }
  }, [askedBuildingFloors]);

  // optimisation des listes d'étages des ascenseurs :
  //   pour chaque étage dans askedBuildingFloors,
  //   on vérifie la distance entre l'étage actuel de l'ascenseur et l'étage,
  //   et on range par ordre croissant les étages à visiter avant de les donner
  //   à chaque ascenseur
  const optimizeTrips = () => {
    const elevator1Assignments = [];
    const elevator2Assignments = [];

    askedBuildingFloors.forEach((floor) => {
      const distanceToElevator1 = Math.abs(currentFloor1 - floor);
      const distanceToElevator2 = Math.abs(currentFloor2 - floor);

      if (distanceToElevator1 <= distanceToElevator2) {
        elevator1Assignments.push(floor);
      } else {
        elevator2Assignments.push(floor);
      }
    });

    setAskedFloors1(elevator1Assignments.sort());
    setAskedFloors2(elevator2Assignments.sort());
  };

  useEffect(() => {
    // maj du prochain étage pour ascenseur 1
    if (askedFloors1?.length > 0) {
      setNextStop1(askedFloors1[0]);
    } else {
      setNextStop1(undefined);
    }
  }, [askedFloors1]);

  useEffect(() => {
    // maj du prochain étage pour ascenseur 2
    if (askedFloors2?.length > 0) {
      setNextStop2(askedFloors2[0]);
    } else {
      setNextStop2(undefined);
    }
  }, [askedFloors2]);

  const goUp = useCallback((nextStop, currentFloor, setCurrentFloor, setIsMoving, askedFloors, setAskedFloors) => {
    setIsMoving("up");
    let nextFloor = currentFloor + 1
    const interval = setInterval(() => {
      if (nextFloor < nextStop + 1) {
        setCurrentFloor(nextFloor)
        nextFloor++
      } else {
        setIsMoving(undefined)
        const newAskedFloors = askedFloors.filter(floor => floor !== nextStop)
        setAskedFloors(newAskedFloors)
        // remove askedBuildingFloor visited
        const newAskedBuildingFloors = askedBuildingFloors.filter(floor => floor !== nextStop)
        setAskedBuildingFloors(newAskedBuildingFloors)
        clearInterval(interval)
      }
    }, 1000)
  }, [currentFloor1, currentFloor2, askedBuildingFloors])

  const goDown = useCallback((nextStop, currentFloor, setCurrentFloor, setIsMoving, askedFloors, setAskedFloors) => {
    setIsMoving("down");
    let nextFloor = currentFloor - 1
    const interval = setInterval(() => {
      if (nextFloor > nextStop - 1) {
        setCurrentFloor(nextFloor)
        nextFloor--
      } else {
        setIsMoving(undefined)
        const newAskedFloors = askedFloors.filter(floor => floor !== nextStop)
        setAskedFloors(newAskedFloors)
        // remove askedBuildingFloor visited
        const newAskedBuildingFloors = askedBuildingFloors.filter(floor => floor !== nextStop)
        setAskedBuildingFloors(newAskedBuildingFloors)
        clearInterval(interval)
      }
    }, 1000)
  }, [currentFloor1, currentFloor2, askedBuildingFloors])

  // deplacement des ascenseurs
  const moveElevator = useCallback((elevatorNumber, nextStop) => {
    if (elevatorNumber === 1) {
      setIsDoorOpen1(false);
      if (nextStop > currentFloor1) {
        goUp(nextStop, currentFloor1, setCurrentFloor1, setIsMoving1, askedFloors1, setAskedFloors1)
      } else {
        goDown(nextStop, currentFloor1, setCurrentFloor1, setIsMoving1, askedFloors1, setAskedFloors1)
      }
    } else if (elevatorNumber === 2) {
      setIsDoorOpen2(false);
      if (nextStop > currentFloor2) {
        goUp(nextStop, currentFloor2, setCurrentFloor2, setIsMoving2, askedFloors2, setAskedFloors2)
      } else {
        goDown(nextStop, currentFloor2, setCurrentFloor2, setIsMoving2, askedFloors2, setAskedFloors2)
      }
    }
  }, [askedFloors1, askedFloors2, currentFloor1, currentFloor2, nextStop1, nextStop2]);

  useEffect(() => {
    if (nextStop1 && nextStop1 !== currentFloor1) {
      moveElevator(1, nextStop1);
    }
  }, [nextStop1]);

  useEffect(() => {
    if (nextStop2 && nextStop2 !== currentFloor2) {
      moveElevator(2, nextStop2);
    }
  }, [nextStop2]);

  return (
    <table className="building">
      <tbody>
        {floors.map((floor, key) => {
          const isHere1 = currentFloor1 === floor;
          const isHere2 = currentFloor2 === floor;

          const isDoorOpen1 = isHere1 && !isMoving1;
          const isDoorOpen2 = isHere2 && !isMoving2;

          return (
            <Floor
              key={key}
              floor={floor}
              isHere1={isHere1}
              isHere2={isHere2}
              handleBuildingButton={handleBuildingButton}
              isAskedBuildingFloor={askedBuildingFloors.includes(floor)}
              isDoorOpen1={isDoorOpen1}
              isDoorOpen2={isDoorOpen2}
              isLightOn1={currentFloor1 === floor}
              isLightOn2={currentFloor2 === floor}
            />
          );
        })}
      </tbody>
    </table>
  );
};
