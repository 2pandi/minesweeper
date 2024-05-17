import { BOMB, GAME_MODE } from "@/constants";
import { T_mapTile, T_openMapTile } from "@/interface";

const placeBomb = (
  emptyMap: Array<Array<T_mapTile>>,
  totalBomb: number,
  x: number,
  y: number,
  startingPoint: [number, number],
  mode: keyof typeof GAME_MODE
) => {
  const [startX, startY] = startingPoint;
  let leftBomb = totalBomb;

  while (leftBomb) {
    const xPosition = Math.floor(Math.random() * x);
    const yPosition = Math.floor(Math.random() * y);

    if (mode === "B") {
      if (
        emptyMap[yPosition][xPosition] ||
        (startX - 2 < xPosition &&
          xPosition < startX + 2 &&
          startY - 2 < yPosition &&
          yPosition < startY + 2)
      )
        continue;
    }

    emptyMap[yPosition][xPosition] = BOMB;
    leftBomb--;
  }

  return emptyMap;
};

const placeNumber = (bombMap: Array<Array<T_mapTile>>) => {
  for (let i = 0; i < bombMap.length; i++) {
    for (let j = 0; j < bombMap[i].length; j++) {
      if (bombMap[i][j] === BOMB) {
        // 상
        if (i - 1 >= 0) {
          if (typeof bombMap[i - 1][j] === "number") {
            bombMap[i - 1][j] = (bombMap[i - 1][j] as number) + 1;
          } else bombMap[i - 1][j] = 1;

          // 상 - 좌
          if (j - 1 >= 0 && typeof bombMap[i - 1][j - 1] === "number") {
            bombMap[i - 1][j - 1] = (bombMap[i - 1][j - 1] as number) + 1;
          } else bombMap[i - 1][j - 1] = 1;

          // 상 - 우
          if (
            j + 1 < bombMap[i].length &&
            typeof bombMap[i - 1][j + 1] === "number"
          ) {
            bombMap[i - 1][j + 1] = (bombMap[i - 1][j + 1] as number) + 1;
          } else bombMap[i - 1][j + 1] = 1;
        }
        // 하
        if (i + 1 < bombMap.length) {
          if (typeof bombMap[i + 1][j] === "number") {
            bombMap[i + 1][j] = (bombMap[i + 1][j] as number) + 1;
          } else bombMap[i + 1][j] = 1;

          // 하 - 좌
          if (j - 1 >= 0 && typeof bombMap[i + 1][j - 1] === "number") {
            bombMap[i + 1][j - 1] = (bombMap[i + 1][j - 1] as number) + 1;
          } else bombMap[i + 1][j - 1] = 1;

          // 하 - 우
          if (
            j + 1 < bombMap[i].length &&
            typeof bombMap[i + 1][j + 1] === "number"
          ) {
            bombMap[i + 1][j + 1] = (bombMap[i + 1][j + 1] as number) + 1;
          } else bombMap[i + 1][j + 1] = 1;
        }

        // 좌
        if (j - 1 >= 0 && typeof bombMap[i][j - 1] === "number") {
          bombMap[i][j - 1] = (bombMap[i][j - 1] as number) + 1;
        } else bombMap[i][j - 1] = 1;

        // 우
        if (
          j + 1 < bombMap[i].length &&
          typeof bombMap[i][j + 1] === "number"
        ) {
          bombMap[i][j + 1] = (bombMap[i][j + 1] as number) + 1;
        } else bombMap[i][j + 1] = 1;
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
  let newY1 = y - 1;
  while (newY1 >= 0 && openTileMap[newY1][x] !== "O") {
    openTileMap[newY1][x] = "O";
    if (!map[newY1][x]) bangTile(x, newY1, openTileMap, map);
    if (map[newY1][x]) break;
    newY1--;
  }

  let newY2 = y + 1;
  while (newY2 < map.length && openTileMap[newY2][x] !== "O") {
    openTileMap[newY2][x] = "O";
    if (!map[newY2][x]) bangTile(x, newY2, openTileMap, map);
    if (map[newY2][x]) break;
    newY2++;
  }

  let newX1 = x - 1;
  while (newX1 >= 0 && openTileMap[y][newX1] !== "O") {
    openTileMap[y][newX1] = "O";
    if (!map[y][newX1]) bangTile(newX1, y, openTileMap, map);
    if (map[y][newX1]) break;
    newX1--;
  }

  let newX2 = x + 1;
  while (newX2 < map[0].length && openTileMap[y][newX2] !== "O") {
    openTileMap[y][newX2] = "O";
    if (!map[y][newX2]) bangTile(newX2, y, openTileMap, map);
    if (map[y][newX2]) break;
    newX2++;
  }

  let newY3 = y - 1,
    newX3 = x - 1;
  while (newY3 >= 0 && newX3 >= 0 && openTileMap[newY3][newX3] !== "O") {
    openTileMap[newY3][newX3] = "O";
    if (!map[newY3][newX3]) bangTile(newX3, newY3, openTileMap, map);
    if (map[newY3][newX3]) break;
    newY3--;
    newX3--;
  }

  let newY4 = y + 1,
    newX4 = x - 1;
  while (
    newY4 < map.length &&
    newX4 >= 0 &&
    openTileMap[newY4][newX4] !== "O"
  ) {
    openTileMap[newY4][newX4] = "O";
    if (!map[newY4][newX4]) bangTile(newX4, newY4, openTileMap, map);
    if (map[newY4][newX4]) break;
    newY4++;
    newX4--;
  }

  let newY5 = y + 1,
    newX5 = x + 1;
  while (
    newY5 < map.length &&
    newX5 < map[0].length &&
    openTileMap[newY5][newX5] !== "O"
  ) {
    openTileMap[newY5][newX5] = "O";
    if (!map[newY5][newX5]) bangTile(newX5, newY5, openTileMap, map);
    if (map[newY5][newX5]) break;
    newY5++;
    newX5++;
  }

  let newY6 = y - 1,
    newX6 = x + 1;
  while (
    newY6 >= 0 &&
    newX6 < map[0].length &&
    openTileMap[newY6][newX6] !== "O"
  ) {
    openTileMap[newY6][newX6] = "O";
    if (!map[newY6][newX6]) bangTile(newX6, newY6, openTileMap, map);
    if (map[newY6][newX6]) break;
    newY6--;
    newX6++;
  }
};
