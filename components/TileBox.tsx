"use client";

import React from "react";
import Tile from "./Tile";
import { useGameStore } from "@/zustand/gameStore";
import { checkTempClassTile } from "@/util";
import { TOTAL_BOMB } from "@/constants";
import useSetMap from "@/hooks/useSetMap";
import useOpenTile from "@/hooks/useOpenTile";
import useStandFlag from "@/hooks/useStandFlag";
import useTempTileClass from "@/hooks/useTempTileClass";

export default function TileBox() {
  const {
    mapXLen,
    mapYLen,
    start,
    mode,
    flaggableBomb,
    status,
    map,
    isMapSet,
    openTileMap,
    startingPoint,
    setStartingPoint,
    bombedPoint,
  } = useGameStore();

  const [isLongClick, setIsLongClick] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [tempClassTiles, setTempClassTiles] = React.useState<
    [number, number][]
  >([]);

  const { openTile } = useOpenTile();
  const { standFlag } = useStandFlag();
  const { getTempClassTiles } = useTempTileClass();

  const clickTileHandler = (x: number, y: number) => {
    if (status !== "WIN" && status !== "LOSE") {
      if (status === "READY") {
        start();
        if (mode === "BOMB_MODE") setStartingPoint([x, y]);
      }

      if (mode === "FLAG_MODE" && openTileMap[y][x]) standFlag(x, y);

      if (status === "PLAYING" && mode === "BOMB_MODE") openTile(x, y);
    }
  };

  const mouseDownHandler = (x: number, y: number) => {
    if (
      openTileMap[y][x] === "OPENED" &&
      typeof map[y][x] === "number" &&
      status === "PLAYING"
    )
      setTempClassTiles(getTempClassTiles(x, y)!);

    timeoutRef.current = setTimeout(() => {
      setIsLongClick(true);

      switch (mode) {
        case "BOMB_MODE":
          if (status === "READY") start();
          standFlag(x, y);
          break;
        case "FLAG_MODE":
          if (status === "READY") {
            start();
            setStartingPoint([x, y]);
          }
          openTile(x, y);
          break;
        default:
      }
    }, 500);
  };

  const mouseUpHandler = (x: number, y: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!isLongClick) clickTileHandler(x, y);

    setIsLongClick(false);
    setTempClassTiles([]);
  };

  const mouseLeaveHandler = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLongClick(false);
  };

  // starting point 설정후 map setting
  useSetMap();

  // 최초 시작시 open tile
  React.useEffect(() => {
    if (isMapSet) {
      if (
        startingPoint[0] >= 0 &&
        (mode === "BOMB_MODE" ||
          (mode === "FLAG_MODE" && flaggableBomb === TOTAL_BOMB))
      )
        openTile(startingPoint[0], startingPoint[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapSet, isLongClick]);

  return (
    <div className="tile_box_container">
      {Array.from({ length: mapYLen }).map((_, yI) => (
        <div className="line" key={yI}>
          {Array.from({ length: mapXLen }).map((_, xI) => (
            <Tile
              x={xI}
              y={yI}
              openStatus={openTileMap[yI][xI]}
              value={map[yI][xI] || undefined}
              onMouseDown={() => mouseDownHandler(xI, yI)}
              onMouseUp={() => mouseUpHandler(xI, yI)}
              onMouseLeave={mouseLeaveHandler}
              tempClassName={
                checkTempClassTile(tempClassTiles, [xI, yI])
                  ? "opened"
                  : bombedPoint[0] === xI && bombedPoint[1] === yI
                  ? "bombed"
                  : ""
              }
              style={{
                width: `calc(400px / ${mapXLen})`,
                height: `calc(600px / ${mapYLen})`,
              }}
              key={`y${yI}x${xI}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
