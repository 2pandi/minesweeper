"use client";

import React from "react";
import Tile from "./Tile";
import { useGameStore } from "@/zustand/gameStore";
import { bangTile, countFlagAroundTile, makeMap } from "@/util";

export default function TileBox() {
  const {
    mapXLen,
    mapYLen,
    start,
    mode,
    totalBomb,
    status,
    map,
    setMap,
    openTileMap,
    setOpenTileMap,
    startingPoint,
    setStartingPoint,
  } = useGameStore();

  const [isMapSet, setIsMapSet] = React.useState<boolean>(false);
  const [isLongClick, setIsLongClick] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [tempClassTiles, setTempClassTiles] = React.useState<
    [number, number][]
  >([]);

  const openTile = (x: number, y: number) => {
    const newOpenTileMap = openTileMap.map((line) => line.map((v) => v));

    switch (newOpenTileMap[y][x]) {
      case "F":
        break;
      case "C":
        newOpenTileMap[y][x] = "O";
        break;
      case "O":
        const totalFlag = countFlagAroundTile(x, y, openTileMap);
        if (totalFlag >= (map[y][x] as number))
          bangTile(x, y, newOpenTileMap, map);
        break;
      default:
    }

    if (newOpenTileMap[y][x] !== "F") newOpenTileMap[y][x] = "O";

    if (isMapSet && !map[y][x]) {
      bangTile(x, y, newOpenTileMap, map);
    }

    setOpenTileMap(newOpenTileMap);
  };

  const standFlag = (x: number, y: number) => {
    const newOpenTileMap = openTileMap.map((line) => line.map((v) => v));

    switch (newOpenTileMap[y][x]) {
      case "F":
        newOpenTileMap[y][x] = "C";
        break;
      case "C":
        newOpenTileMap[y][x] = "F";
        break;
      case "O":
        const totalFlag = countFlagAroundTile(x, y, openTileMap);
        if (totalFlag >= (map[y][x] as number))
          bangTile(x, y, newOpenTileMap, map);
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
  };

  const checkTempClassTile = ([x, y]: [number, number]) => {
    return tempClassTiles.findIndex((v) => v[0] === x && v[1] === y) >= 0;
  };

  const mouseDownHandler = (x: number, y: number) => {
    if (openTileMap[y][x] === "O" && typeof map[y][x] === "number") {
      const totalFlag = countFlagAroundTile(x, y, openTileMap);
      if (totalFlag < (map[y][x] as number)) {
        const newTempClassTiles: [number, number][] = [];
        if (y - 1 >= 0) {
          if (openTileMap[y - 1][x] !== "F") newTempClassTiles.push([x, y - 1]);

          if (x - 1 >= 0 && openTileMap[y - 1][x - 1] !== "F")
            newTempClassTiles.push([x - 1, y - 1]);
          if (
            x + 1 < openTileMap[0].length &&
            openTileMap[y - 1][x + 1] !== "F"
          )
            newTempClassTiles.push([x + 1, y - 1]);
        }
        if (y + 1 < openTileMap.length) {
          if (openTileMap[y + 1][x] !== "F") newTempClassTiles.push([x, y + 1]);

          if (x - 1 >= 0 && openTileMap[y + 1][x - 1] !== "F")
            newTempClassTiles.push([x - 1, y + 1]);
          if (
            x + 1 < openTileMap[0].length &&
            openTileMap[y + 1][x + 1] !== "F"
          )
            newTempClassTiles.push([x + 1, y + 1]);
        }
        if (x - 1 >= 0 && openTileMap[y][x - 1] !== "F")
          newTempClassTiles.push([x - 1, y]);
        if (x + 1 < openTileMap[0].length && openTileMap[y][x + 1] !== "F")
          newTempClassTiles.push([x + 1, y]);

        setTempClassTiles(newTempClassTiles);
      }
    }
    timeoutRef.current = setTimeout(() => {
      setIsLongClick(true);
      switch (mode) {
        case "B":
          standFlag(x, y);
          break;
        case "F":
          openTile(x, y);
          break;
        default:
      }
    }, 300);
  };

  const mouseUpHandler = (x: number, y: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!isLongClick) {
      clickTileHandler(x, y);
    }
    setIsLongClick(false);
    setTempClassTiles([]);
  };

  const mouseLeaveHandler = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLongClick(false);
  };

  React.useEffect(() => {
    if (status === "P" && startingPoint[0] >= 0) {
      const newMap = makeMap(
        map,
        startingPoint,
        mapXLen,
        mapYLen,
        totalBomb,
        mode
      );
      setMap(newMap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, startingPoint]);

  React.useEffect(() => {
    if (!isMapSet && startingPoint[0] >= 0) {
      setIsMapSet(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, startingPoint]);

  React.useEffect(() => {
    if (isMapSet && mode === "B") {
      openTile(startingPoint[0], startingPoint[1]);
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
