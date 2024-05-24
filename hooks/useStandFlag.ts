import { useGameStore } from "@/zustand/gameStore";
import useOpenTile from "./useOpenTile";
import { countFlagAroundTile } from "@/util";

export default function useStandFlag() {
  const {
    flaggableBomb,
    flagBomb,
    deflagBomb,
    map,
    isMapSet,
    openTileMap,
    setOpenTileMap,
  } = useGameStore();

  const { openTile } = useOpenTile();

  const standFlag = (x: number, y: number) => {
    const newOpenTileMap = openTileMap.map((line) => line.map((v) => v));

    switch (newOpenTileMap[y][x]) {
      case "FLAGGED":
        newOpenTileMap[y][x] = "CONCEALED";
        deflagBomb();
        break;
      case "CONCEALED":
        if (flaggableBomb > 0) {
          newOpenTileMap[y][x] = "FLAGGED";
          flagBomb();
        }
        break;
      case "OPENED":
        const flagsAroundTile = countFlagAroundTile(x, y, openTileMap);
        if (flagsAroundTile >= (map[y][x] as number) && isMapSet) {
          return openTile(x, y);
        }

        break;
      default:
    }

    setOpenTileMap(newOpenTileMap);
  };

  return { standFlag };
}
