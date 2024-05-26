import { BOMB } from "@/constants";
import { useGameStore } from "@/zustand/gameStore";
import useBoomTile from "./useBoomTile";
import { countFlagAroundTile } from "@/util";

export default function useOpenTile() {
  const {
    lose,
    status,
    map,
    isMapSet,
    openTileMap,
    setOpenTileMap,
    setBombedPoint,
  } = useGameStore();

  const { boomTile } = useBoomTile();

  const openTile = (x: number, y: number) => {
    if (isMapSet) {
      const newOpenTileMap = openTileMap.map((line) => line.map((v) => v));
      if (status === "LOSE") return;

      if (map[y][x] === BOMB && newOpenTileMap[y][x] !== "FLAGGED") {
        setBombedPoint([x, y]);
        lose();
      }

      switch (newOpenTileMap[y][x]) {
        case "FLAGGED":
          break;
        case "CONCEALED":
          if (isMapSet && map[y][x] === undefined)
            boomTile(x, y, newOpenTileMap);
          newOpenTileMap[y][x] = "OPENED";
          break;
        case "OPENED":
          const totalFlag = countFlagAroundTile(x, y, openTileMap);
          if (totalFlag >= (map[y][x] as number))
            boomTile(x, y, newOpenTileMap);
          break;
        default:
      }

      setOpenTileMap(newOpenTileMap);
    }
  };
  return { openTile };
}
