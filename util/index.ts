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

const placeNumber1 = (bombMap: Array<Array<T_mapTile>>) => {
  for (let i = 0; i < bombMap.length; i++) {
    for (let j = 0; j < bombMap[0].length; j++) {
      if (bombMap[i][j] === BOMB) {
        if (i - 1 >= 0) {
          if (bombMap[i - 1][j] === undefined) bombMap[i - 1][j] = 1;
          else if (typeof bombMap[i - 1][j] === "number")
            (bombMap[i - 1][j] as number)++;

          if (j - 1 >= 0) {
            if (bombMap[i - 1][j - 1] === undefined) bombMap[i - 1][j - 1] = 1;
            else if (typeof bombMap[i - 1][j - 1] === "number")
              (bombMap[i - 1][j - 1] as number)++;
          }
          if (j + 1 < bombMap[0].length) {
            if (bombMap[i - 1][j + 1] === undefined) bombMap[i - 1][j + 1] = 1;
            else if (typeof bombMap[i - 1][j + 1] === "number")
              (bombMap[i - 1][j + 1] as number)++;
          }
        }
        if (i + 1 < bombMap.length) {
          if (bombMap[i + 1][j] === undefined) bombMap[i + 1][j] = 1;
          else if (typeof bombMap[i + 1][j] === "number")
            (bombMap[i + 1][j] as number)++;

          if (j - 1 >= 0) {
            if (bombMap[i + 1][j - 1] === undefined) bombMap[i + 1][j - 1] = 1;
            else if (typeof bombMap[i + 1][j - 1] === "number")
              (bombMap[i + 1][j - 1] as number)++;
          }
          if (j + 1 < bombMap[0].length) {
            if (bombMap[i + 1][j + 1] === undefined) bombMap[i + 1][j + 1] = 1;
            else if (typeof bombMap[i + 1][j + 1] === "number")
              (bombMap[i + 1][j + 1] as number)++;
          }
        }
        if (j - 1 >= 0) {
          if (bombMap[i][j - 1] === undefined) bombMap[i][j - 1] = 1;
          else if (typeof bombMap[i][j - 1] === "number")
            (bombMap[i][j - 1] as number)++;
        }
        if (j + 1 < bombMap[0].length) {
          if (bombMap[i][j + 1] === undefined) bombMap[i][j + 1] = 1;
          else if (typeof bombMap[i][j + 1] === "number")
            (bombMap[i][j + 1] as number)++;
        }
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

function isMobile() {
  var user = navigator.userAgent;
  var is_mobile = false;

  if (
    user.indexOf("iPhone") > -1 ||
    user.indexOf("Android") > -1 ||
    user.indexOf("iPad") > -1 ||
    user.indexOf("iPod") > -1
  ) {
    is_mobile = true;
  }

  return is_mobile;
}
