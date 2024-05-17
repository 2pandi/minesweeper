"use client";

import React from "react";
import Tile from "./Tile";
import { useGameStore } from "@/zustand/gameStore";
import { makeMap } from "@/util";

export default function TileBox() {
  const {
    mapXLen,
    mapYLen,
    start,
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
    newOpenTileMap[y][x] = "O";

    const bang = (x: number, y: number) => {
      let newY1 = y - 1;
      while (newY1 >= 0 && newOpenTileMap[newY1][x] !== "O") {
        newOpenTileMap[newY1][x] = "O";
        if (!map[newY1][x]) bang(x, newY1);
        if (map[newY1][x]) break;
        newY1--;
      }

      let newY2 = y + 1;
      while (newY2 < map.length && newOpenTileMap[newY2][x] !== "O") {
        newOpenTileMap[newY2][x] = "O";
        if (!map[newY2][x]) bang(x, newY2);
        if (map[newY2][x]) break;
        newY2++;
      }

      let newX1 = x - 1;
      while (newX1 >= 0 && newOpenTileMap[y][newX1] !== "O") {
        newOpenTileMap[y][newX1] = "O";
        if (!map[y][newX1]) bang(newX1, y);
        if (map[y][newX1]) break;
        newX1--;
      }

      let newX2 = x + 1;
      while (newX2 < map[0].length && newOpenTileMap[y][newX2] !== "O") {
        newOpenTileMap[y][newX2] = "O";
        if (!map[y][newX2]) bang(newX2, y);
        if (map[y][newX2]) break;
        newX2++;
      }

      let newY3 = y - 1,
        newX3 = x - 1;
      while (newY3 >= 0 && newX3 >= 0 && newOpenTileMap[newY3][newX3] !== "O") {
        newOpenTileMap[newY3][newX3] = "O";
        if (!map[newY3][newX3]) bang(newX3, newY3);
        if (map[newY3][newX3]) break;
        newY3--;
        newX3--;
      }

      let newY4 = y + 1,
        newX4 = x - 1;
      while (
        newY4 < map.length &&
        newX4 >= 0 &&
        newOpenTileMap[newY4][newX4] !== "O"
      ) {
        newOpenTileMap[newY4][newX4] = "O";
        if (!map[newY4][newX4]) bang(newX4, newY4);
        if (map[newY4][newX4]) break;
        newY4++;
        newX4--;
      }

      let newY5 = y + 1,
        newX5 = x + 1;
      while (
        newY5 < map.length &&
        newX5 < map[0].length &&
        newOpenTileMap[newY5][newX5] !== "O"
      ) {
        newOpenTileMap[newY5][newX5] = "O";
        if (!map[newY5][newX5]) bang(newX5, newY5);
        if (map[newY5][newX5]) break;
        newY5++;
        newX5++;
      }

      let newY6 = y - 1,
        newX6 = x + 1;
      while (
        newY6 >= 0 &&
        newX6 < map[0].length &&
        newOpenTileMap[newY6][newX6] !== "O"
      ) {
        newOpenTileMap[newY6][newX6] = "O";
        if (!map[newY6][newX6]) bang(newX6, newY6);
        if (map[newY6][newX6]) break;
        newY6--;
        newX6++;
      }
    };
    if (isMapSet && !map[y][x]) {
      bang(x, y);
    }

    setOpenTileMap(newOpenTileMap);
  };

  const clickTileHandler = (x: number, y: number) => {
    if (status === "R") {
      start();
      setStartingPoint([x, y]);
    }

    openTile(x, y);
  };

  React.useEffect(() => {
    if (status === "P" && startingPoint[0] >= 0) {
      const newMap = makeMap(map, startingPoint, mapXLen, mapYLen, totalBomb);
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
    if (isMapSet) {
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
