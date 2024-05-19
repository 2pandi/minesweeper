"use client";

import React from "react";
import Tile from "./Tile";
import { useGameStore } from "@/zustand/gameStore";
import { bangTile, countFlagAroundTile, makeMap } from "@/util";
import { TOTAL_BOMB } from "@/constants";

export default function TileBox() {
  const {
    mapXLen,
    mapYLen,
    start,
    lose,
    win,
    mode,
    flaggableBomb,
    flagBomb,
    deflagBomb,
    status,
    map,
    setMap,
    isMapSet,
    setIsMapSet,
    openTileMap,
    setOpenTileMap,
    startingPoint,
    setStartingPoint,
  } = useGameStore();

  const [isLongClick, setIsLongClick] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [tempClassTiles, setTempClassTiles] = React.useState<
    [number, number][]
  >([]);

  const openTile = (x: number, y: number) => {
    const newOpenTileMap = openTileMap.map((line) => line.map((v) => v));
    if (status === "L") return;

    console.log(status);

    switch (newOpenTileMap[y][x]) {
      case "F":
        break;
      case "C":
        newOpenTileMap[y][x] = "O";
        if (isMapSet && map[y][x] === undefined && mode === "B")
          bangTile(x, y, newOpenTileMap, map);
        console.log(newOpenTileMap);
        break;
      case "O":
        const totalFlag = countFlagAroundTile(x, y, openTileMap);
        if (totalFlag >= (map[y][x] as number))
          bangTile(x, y, newOpenTileMap, map);
        break;
      case "B":
        lose();
        break;
      default:
    }

    setOpenTileMap(newOpenTileMap);
  };

  const standFlag = (x: number, y: number) => {
    const newOpenTileMap = openTileMap.map((line) => line.map((v) => v));

    switch (newOpenTileMap[y][x]) {
      case "F":
        newOpenTileMap[y][x] = "C";
        deflagBomb();
        break;
      case "C":
        if (flaggableBomb > 0) {
          newOpenTileMap[y][x] = "F";
          flagBomb();
        }
        break;
      case "O":
        const flagsAroundTile = countFlagAroundTile(x, y, openTileMap);
        if (flagsAroundTile >= (map[y][x] as number))
          bangTile(x, y, newOpenTileMap, map);
        if (isMapSet && !map[y][x]) bangTile(x, y, newOpenTileMap, map);
        break;
      default:
    }

    setOpenTileMap(newOpenTileMap);
  };

  const clickTileHandler = (x: number, y: number) => {
    if (status === "R") {
      start();
      setStartingPoint([x, y]);
    }

    switch (mode) {
      case "B":
        openTile(x, y);
        break;
      case "F":
        standFlag(x, y);
        break;
      default:
    }

    if (map[y][x] === undefined) {
      bangTile(x, y, openTileMap, map);
      console.log("bang");
    }
  };

  const checkTempClassTile = ([x, y]: [number, number]) => {
    return tempClassTiles.findIndex((v) => v[0] === x && v[1] === y) >= 0;
  };

  const tempTileClassSetter = (x: number, y: number) => {
    const totalFlag = countFlagAroundTile(x, y, openTileMap);
    if (totalFlag < (map[y][x] as number)) {
      const newTempClassTiles: [number, number][] = [];
      if (y - 1 >= 0) {
        if (openTileMap[y - 1][x] !== "F") newTempClassTiles.push([x, y - 1]);

        if (x - 1 >= 0 && openTileMap[y - 1][x - 1] !== "F")
          newTempClassTiles.push([x - 1, y - 1]);
        if (x + 1 < openTileMap[0].length && openTileMap[y - 1][x + 1] !== "F")
          newTempClassTiles.push([x + 1, y - 1]);
      }
      if (y + 1 < openTileMap.length) {
        if (openTileMap[y + 1][x] !== "F") newTempClassTiles.push([x, y + 1]);

        if (x - 1 >= 0 && openTileMap[y + 1][x - 1] !== "F")
          newTempClassTiles.push([x - 1, y + 1]);
        if (x + 1 < openTileMap[0].length && openTileMap[y + 1][x + 1] !== "F")
          newTempClassTiles.push([x + 1, y + 1]);
      }
      if (x - 1 >= 0 && openTileMap[y][x - 1] !== "F")
        newTempClassTiles.push([x - 1, y]);
      if (x + 1 < openTileMap[0].length && openTileMap[y][x + 1] !== "F")
        newTempClassTiles.push([x + 1, y]);

      setTempClassTiles(newTempClassTiles);
    }
  };

  const mouseDownHandler = (x: number, y: number) => {
    if (openTileMap[y][x] === "O" && typeof map[y][x] === "number")
      tempTileClassSetter(x, y);

    if (mode === "F" && status === "R") setStartingPoint([x, y]);

    timeoutRef.current = setTimeout(() => {
      setIsLongClick(true);

      switch (mode) {
        case "B":
          if (status === "R") start();
          standFlag(x, y);
          break;
        case "F":
          if (status === "R") {
            start();
            setStartingPoint([x, y]);
          }

          break;
        default:
      }
    }, 500);
  };

  const mouseUpHandler = (x: number, y: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!isLongClick) clickTileHandler(x, y);

    setIsLongClick(false);
    setTempClassTiles([]);
  };

  const mouseLeaveHandler = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLongClick(false);
  };

  // starting point 설정후 map setting
  React.useEffect(() => {
    if (status === "P" && (startingPoint[0] >= 0 || mode === "B")) {
      const newMap = makeMap(
        map,
        startingPoint,
        mapXLen,
        mapYLen,
        flaggableBomb,
        mode
      );
      setMap(newMap);
      setIsMapSet(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, startingPoint]);

  React.useEffect(() => {
    // if (!isMapSet && startingPoint[0] >= 0 && status === "P") setIsMapSet(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, startingPoint]);

  // 최초 시작시 open tile
  React.useEffect(() => {
    if (isMapSet && startingPoint[0] >= 0) {
      if (mode === "B") openTile(startingPoint[0], startingPoint[1]);

      if (mode === "F" && flaggableBomb === TOTAL_BOMB)
        bangTile(startingPoint[0], startingPoint[1], openTileMap, map);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapSet]);

  return (
    <div className="tile_box_container">
      {Array.from({ length: mapYLen }).map((_, yI) => (
        <div className="line" key={yI}>
          {Array.from({ length: mapXLen }).map((_, xI) => (
            <Tile
              x={xI}
              y={yI}
              openStatus={openTileMap[yI]?.[xI]}
              value={map[yI]?.[xI] || undefined}
              onMouseDown={() => mouseDownHandler(xI, yI)}
              onMouseUp={() => mouseUpHandler(xI, yI)}
              onMouseLeave={mouseLeaveHandler}
              tempClassName={checkTempClassTile([xI, yI]) ? "opened" : ""}
              style={{
                width: `calc(400px / ${mapXLen})`,
                height: `calc(600px / ${mapYLen})`,
              }}
              key={`y${yI}x${xI}`}
            ></Tile>
          ))}
        </div>
      ))}
    </div>
  );
}
