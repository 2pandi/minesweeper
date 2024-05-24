import { BOMB } from "@/constants";
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

const placeNumber = (bombMap: Array<Array<T_mapTile>>) => {
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
) => {
  const tiles: T_openMapTile[] = [];

  if (y - 1 >= 0) {
    tiles.push(openTileMap[y - 1][x]);

    if (x - 1 >= 0) tiles.push(openTileMap[y - 1][x - 1]);

    if (x + 1 < openTileMap[0].length) tiles.push(openTileMap[y - 1][x + 1]);
  }

  if (y + 1 < openTileMap.length) {
    tiles.push(openTileMap[y + 1][x]);

    if (x - 1 >= 0) tiles.push(openTileMap[y + 1][x - 1]);

    if (x + 1 < openTileMap[0].length) tiles.push(openTileMap[y + 1][x + 1]);
  }

  if (x - 1 >= 0) tiles.push(openTileMap[y][x - 1]);

  if (x + 1 < openTileMap[0].length) tiles.push(openTileMap[y][x + 1]);

  return tiles.filter((v) => v === "FLAGGED").length;
};

export const checkTempClassTile: (
  tempClassTiles: [number, number][],
  [x, y]: [number, number]
) => boolean = (tempClassTiles, [x, y]) => {
  return tempClassTiles?.findIndex((v) => v[0] === x && v[1] === y) >= 0;
};
