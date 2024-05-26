import { directions } from "@/constants";
import { countFlagAroundTile } from "@/util";
import { useGameStore } from "@/zustand/gameStore";

export default function useTempTileClass() {
  const { map, openTileMap } = useGameStore();

  const getTempClassTiles = (x: number, y: number) => {
    const totalFlag = countFlagAroundTile(x, y, openTileMap);

    if (totalFlag < (map[y][x] as number)) {
      const newTempClassTiles: [number, number][] = [];

      const isValidPosition = (x: number, y: number) =>
        x >= 0 && y >= 0 && x < openTileMap[0].length && y < openTileMap.length;

      directions.forEach(([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;

        if (
          isValidPosition(newX, newY) &&
          openTileMap[newY][newX] !== "FLAGGED"
        )
          newTempClassTiles.push([newX, newY]);
      });

      return newTempClassTiles;
    }
  };
  return { getTempClassTiles };
}
