import { BOMB, GAME_MODE } from "@/constants";
import { T_mapTile, T_openMapTile } from "@/interface";

const placeBomb = (
  emptyMap: Array<Array<T_mapTile>>,
  totalBomb: number,
  maxX: number,
  maxY: number,
  startingPoint: [number, number],
  mode: keyof typeof GAME_MODE
) => {
  const [startX, startY] = startingPoint;
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
  totalBomb: number,
  mode: keyof typeof GAME_MODE
) => {
  const newMap = placeBomb(map, totalBomb, x, y, startingPoint, mode);

  return placeNumber(newMap);
};

export const bangTile = (
  x: number,
  y: number,
  openTileMap: T_openMapTile[][],
  map: T_mapTile[][]
) => {
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
    x >= 0 && y >= 0 && x < map[0].length && y < map.length;

  const processBang = (dx: number, dy: number) => {
    let newX = x + dx;
    let newY = y + dy;

    while (isValidPosition(newX, newY)) {
      if (openTileMap[newY][newX] === "O" || openTileMap[newY][newX] === "F")
        break;
      openTileMap[newY][newX] = "O";
      if (map[newY][newX]) break;
      bangTile(newX, newY, openTileMap, map);
      newX += dx;
      newY += dy;
    }
  };

  directions.forEach(({ dx, dy }) => processBang(dx, dy));
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

  return tiles.filter((v) => v === "F").length;
};
