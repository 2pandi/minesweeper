import { BOMB, directions } from "@/constants";
import { T_openMapTile } from "@/interface";
import { isAllTileOpen } from "@/util";
import { useGameStore } from "@/zustand/gameStore";
import React from "react";

export default function useBoomTile() {
  const {
    openTileMap,
    flaggableBomb,
    map,
    lose,
    win,
    bombedPoint,
    setBombedPoint,
  } = useGameStore();

  React.useEffect(() => {
    if (!flaggableBomb && isAllTileOpen(openTileMap)) {
      if (bombedPoint[0] < 0) win();
      else lose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openTileMap, flaggableBomb]);

  const boomTile = (
    x: number,
    y: number,
    newOpenTileMap: T_openMapTile[][]
  ) => {
    const isValidPosition = (x: number, y: number) =>
      x >= 0 && y >= 0 && x < map[0].length && y < map.length;

    const processBoom = (dx: number, dy: number) => {
      let newX = x + dx;
      let newY = y + dy;

      while (isValidPosition(newX, newY)) {
        if (
          newOpenTileMap[newY][newX] === "OPENED" ||
          newOpenTileMap[newY][newX] === "FLAGGED"
        )
          break;

        newOpenTileMap[newY][newX] = "OPENED";

        if (map[newY][newX] === BOMB) {
          setBombedPoint([newX, newY]);
          return lose();
        }

        if (map[newY][newX]) break;

        boomTile(newX, newY, newOpenTileMap);
        newX += dx;
        newY += dy;
      }
    };

    directions.forEach(([dx, dy]) => processBoom(dx, dy));
  };

  return { boomTile };
}
