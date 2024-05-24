import { makeMap } from "@/util";
import { useGameStore } from "@/zustand/gameStore";
import React from "react";

export default function useSetMap() {
  const {
    mapXLen,
    mapYLen,
    mode,
    flaggableBomb,
    status,
    map,
    setMap,
    setIsMapSet,
    startingPoint,
  } = useGameStore();

  React.useEffect(() => {
    if (
      status === "PLAYING" &&
      (startingPoint[0] >= 0 || mode === "FLAG_MODE")
    ) {
      const newMap = makeMap(
        map,
        startingPoint,
        mapXLen,
        mapYLen,
        mode === "FLAG_MODE" && startingPoint[0] < 0
          ? flaggableBomb + 1
          : flaggableBomb
      );
      setMap(newMap);
      setIsMapSet(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, startingPoint]);
}
