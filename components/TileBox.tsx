"use client";

import React from "react";
import Tile from "./Tile";
import { useGameStore } from "@/zustand/gameStore";
import { countFlagAroundTile, makeMap } from "@/util";
import { BOMB, TOTAL_BOMB } from "@/constants";
import useBoomTile from "@/hooks/useBoomTile";

export default function TileBox() {
  const {
    mapXLen,
    mapYLen,
    start,
    lose,
    mode,
    flaggableBomb,
    flagBomb,
    deflagBomb,
    status,
    map,
    setMap,
    isMapSet,
    setIsMapSet,
    openTileMap,
    setOpenTileMap,
    startingPoint,
    setStartingPoint,
    bombedPoint,
    setBombedPoint,
  } = useGameStore();

  const [isLongClick, setIsLongClick] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [tempClassTiles, setTempClassTiles] = React.useState<
    [number, number][]
  >([]);

  const { boomTile } = useBoomTile();

  const openTile = (x: number, y: number) => {
    if (isMapSet) {
      const newOpenTileMap = openTileMap.map((line) => line.map((v) => v));
      if (status === "L") return;

      if (map[y][x] === BOMB) {
        setBombedPoint([x, y]);
        lose();
      }

      switch (newOpenTileMap[y][x]) {
        case "F":
          break;
        case "C":
          if (isMapSet && map[y][x] === undefined)
            boomTile(x, y, newOpenTileMap);
          newOpenTileMap[y][x] = "O";

          break;
        case "O":
          const totalFlag = countFlagAroundTile(x, y, openTileMap);
          if (totalFlag >= (map[y][x] as number))
            boomTile(x, y, newOpenTileMap);
          break;
        default:
      }

      setOpenTileMap(newOpenTileMap);
    }
  };

  const standFlag = (x: number, y: number) => {
    const newOpenTileMap = openTileMap.map((line) => line.map((v) => v));

    switch (newOpenTileMap[y][x]) {
      case "F":
        newOpenTileMap[y][x] = "C";
        deflagBomb();
        break;
      case "C":
        if (flaggableBomb > 0) {
          newOpenTileMap[y][x] = "F";
          flagBomb();
        }
        break;
      case "O":
        const flagsAroundTile = countFlagAroundTile(x, y, openTileMap);
        if (flagsAroundTile >= (map[y][x] as number) && isMapSet) {
          return openTile(x, y);
        }

        break;
      default:
    }

    setOpenTileMap(newOpenTileMap);
  };

  const clickTileHandler = (x: number, y: number) => {
    if (status !== "W" && status !== "L") {
      if (status === "R") {
        start();
        if (mode === "B") setStartingPoint([x, y]);
      }

      if (mode === "F" && openTileMap[y][x]) standFlag(x, y);

      if (status === "P" && mode === "B") openTile(x, y);
    }
  };

  const checkTempClassTile = ([x, y]: [number, number]) => {
    return tempClassTiles.findIndex((v) => v[0] === x && v[1] === y) >= 0;
  };

  const tempTileClassSetter = (x: number, y: number) => {
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

        if (isValidPosition(newX, newY) && openTileMap[newY][newX] !== "F")
          newTempClassTiles.push([newX, newY]);
      });

      setTempClassTiles(newTempClassTiles);
    }
  };

  const mouseDownHandler = (x: number, y: number) => {
    if (
      openTileMap[y][x] === "O" &&
      typeof map[y][x] === "number" &&
      status === "P"
    )
      tempTileClassSetter(x, y);

    timeoutRef.current = setTimeout(() => {
      setIsLongClick(true);

      switch (mode) {
        case "B":
          if (status === "R") start();
          standFlag(x, y);
          break;
        case "F":
          if (status === "R") {
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
  React.useEffect(() => {
    if (status === "P" && (startingPoint[0] >= 0 || mode === "F")) {
      const newMap = makeMap(
        map,
        startingPoint,
        mapXLen,
        mapYLen,
        mode === "F" && startingPoint[0] < 0 ? flaggableBomb + 1 : flaggableBomb
      );
      setMap(newMap);
      setIsMapSet(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, startingPoint]);

  // 최초 시작시 open tile
  React.useEffect(() => {
    if (isMapSet) {
      if (
        startingPoint[0] >= 0 &&
        (mode === "B" || (mode === "F" && flaggableBomb === TOTAL_BOMB))
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
                checkTempClassTile([xI, yI])
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
