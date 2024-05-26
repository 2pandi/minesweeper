import { BOMB, directions } from "@/constants";
import { T_mapTile, T_openMapTile } from "@/interface";

const placeBomb = (
  emptyMap: Array<Array<T_mapTile>>,
  totalBomb: number,
  maxX: number,
  maxY: number,
  startingPoint: [number, number]
) => {
  let [startX, startY] = startingPoint;
  let leftBomb = totalBomb;

  while (leftBomb) {
    const xPosition = Math.floor(Math.random() * maxX);
    const yPosition = Math.floor(Math.random() * maxY);

    if (
      emptyMap[yPosition][xPosition] === BOMB ||
      (startX - 2 < xPosition &&
        xPosition < startX + 2 &&
        startY - 2 < yPosition &&
        yPosition < startY + 2)
    )
      continue;

    emptyMap[yPosition][xPosition] = BOMB;
    leftBomb--;
  }

  return emptyMap;
};

const placeNumber = (
  bombMap: Array<Array<T_mapTile>>
): Array<Array<T_mapTile>> => {
  for (let i = 0; i < bombMap.length; i++) {
    for (let j = 0; j < bombMap[0].length; j++) {
      if (bombMap[i][j] === BOMB) {
        directions.forEach(([dx, dy]) => {
          const ni = i + dx;
          const nj = j + dy;

          if (
            ni >= 0 &&
            ni < bombMap.length &&
            nj >= 0 &&
            nj < bombMap[0].length
          ) {
            if (bombMap[ni][nj] === undefined) {
              bombMap[ni][nj] = 1;
            } else if (typeof bombMap[ni][nj] === "number") {
              (bombMap[ni][nj] as number)++;
            }
          }
        });
      }
    }
  }

  return bombMap;
};

export const makeMap = (
  map: T_mapTile[][],
  startingPoint: [number, number],
  x: number,
  y: number,
  totalBomb: number
) => {
  const newMap = placeBomb(map, totalBomb, x, y, startingPoint);

  return placeNumber(newMap);
};

export const isAllTileOpen = (openTileMap: T_openMapTile[][]) => {
  for (let i = 0; i < openTileMap.length; i++) {
    for (let j = 0; j < openTileMap[0].length; j++) {
      if (openTileMap[i][j] === "CONCEALED") return false;
    }
  }
  return true;
};

export const countFlagAroundTile = (
  x: number,
  y: number,
  openTileMap: T_openMapTile[][]
): number => {
  const isValid = (nx: number, ny: number): boolean =>
    nx >= 0 && ny >= 0 && ny < openTileMap.length && nx < openTileMap[0].length;

  return directions.reduce((count, [dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    if (isValid(nx, ny) && openTileMap[ny][nx] === "FLAGGED") {
      count += 1;
    }
    return count;
  }, 0);
};

export const checkTempClassTile: (
  tempClassTiles: [number, number][],
  [x, y]: [number, number]
) => boolean = (tempClassTiles, [x, y]) => {
  return tempClassTiles?.findIndex((v) => v[0] === x && v[1] === y) >= 0;
};

export const isMobile = (): boolean => {
  if (typeof navigator === "undefined") {
    // navigator가 정의되지 않은 환경에서는 false를 반환
    return false;
  }

  const userAgent = navigator.userAgent;
  const mobileDevices = ["iPhone", "Android", "iPad", "iPod"];

  return mobileDevices.some((device) => userAgent.includes(device));
};

export const registClickEvent = (
  onPointerDown: (e: any) => void,
  onPointerUp: (e: any) => void,
  onMouseLeave: (e: any) => void
) => {
  if (isMobile()) {
    return {
      onTouchStart: onPointerDown,
      onTouchEnd: onPointerUp,
    };
  }
  return {
    onMouseDown: onPointerDown,
    onMouseUp: onPointerUp,
    onMouseLeave,
  };
};
