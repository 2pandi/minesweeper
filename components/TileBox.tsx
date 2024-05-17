"use client";

import React from "react";
import Tile from "./Tile";
import { useGameStore } from "@/zustand/gameStore";
import { bangTile, makeMap } from "@/util";

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

  const openTile = (x: number, y: number) => {
    const newOpenTileMap = openTileMap.map((line) => line.map((v) => v));

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
              onClick={() => clickTileHandler(xI, yI)}
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
