import { countFlagAroundTile } from "@/util";
import { useGameStore } from "@/zustand/gameStore";

export default function useTempTileClass() {
  const { map, openTileMap } = useGameStore();

  const getTempClassTiles = (x: number, y: number) => {
    const totalFlag = countFlagAroundTile(x, y, openTileMap);

    if (totalFlag < (map[y][x] as number)) {
      const newTempClassTiles: [number, number][] = [];

      const directions = [
        { dx: 0, dy: -1 }, // 위
        { dx: 0, dy: 1 }, // 아래
        { dx: -1, dy: 0 }, // 왼쪽
        { dx: 1, dy: 0 }, // 오른쪽
        { dx: -1, dy: -1 }, // 왼쪽 위
        { dx: -1, dy: 1 }, // 왼쪽 아래
        { dx: 1, dy: -1 }, // 오른쪽 위
        { dx: 1, dy: 1 }, // 오른쪽 아래
      ];

      const isValidPosition = (x: number, y: number) =>
        x >= 0 && y >= 0 && x < openTileMap[0].length && y < openTileMap.length;

      directions.forEach(({ dx, dy }) => {
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
