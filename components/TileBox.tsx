"use client";

import React from "react";
import Tile from "./Tile";
import { useGameStore } from "@/zustand/gameStore";
import { makeMap } from "@/util";

export default function TileBox() {
  const [x, setX] = React.useState(13);
  const [y, setY] = React.useState(20);
  const { totalBomb, status, map, setMap, startingPoint } = useGameStore();

  React.useEffect(() => {
    if (status === "P" && startingPoint[0] >= 0) {
      const newMap = makeMap(startingPoint, x, y, totalBomb);
      setMap(newMap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, startingPoint]);

  return (
    <div className="tile_box_container">
      {Array.from({ length: y }).map((_, yI) => (
        <div className="line" key={yI}>
          {Array.from({ length: x }).map((_, xI) => (
            <Tile
              style={{
                width: `calc(400px / ${x})`,
                height: `calc(600px / ${y})`,
              }}
              x={xI}
              y={yI}
              type="B"
              value={map[yI]?.[xI] || undefined}
              key={`y${yI}x${xI}`}
            ></Tile>
          ))}
        </div>
      ))}
    </div>
  );
}
