import { BOMB } from "@/constants";
import { T_mapTile } from "@/interface";

const placeBomb = (
  emptyMap: Array<Array<T_mapTile>>,
  totalBomb: number,
  x: number,
  y: number,
  startingPoint: [number, number]
) => {
  const [startX, startY] = startingPoint;
  let leftBomb = totalBomb;

  while (leftBomb) {
    const xPosition = Math.floor(Math.random() * x);
    const yPosition = Math.floor(Math.random() * y);

    if (
      emptyMap[yPosition][xPosition] ||
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
    for (let j = 0; j < bombMap[i].length; j++) {
      if (bombMap[i][j] === BOMB) {
        if (i - 1 >= 0) {
          if (typeof bombMap[i - 1][j] === "number") {
            bombMap[i - 1][j] = (bombMap[i - 1][j] as number) + 1;
          } else bombMap[i - 1][j] = 1;
          if (j - 1 >= 0) {
            if (typeof bombMap[i - 1][j - 1] === "number") {
              bombMap[i - 1][j - 1] = (bombMap[i - 1][j - 1] as number) + 1;
            } else bombMap[i - 1][j - 1] = 1;
          }
          if (j + 1 < bombMap[i].length) {
            if (typeof bombMap[i - 1][j + 1] === "number") {
              bombMap[i - 1][j + 1] = (bombMap[i - 1][j + 1] as number) + 1;
            } else bombMap[i - 1][j + 1] = 1;
          }
        }
        if (i + 1 < bombMap.length) {
          if (typeof bombMap[i + 1][j] === "number") {
            bombMap[i + 1][j] = (bombMap[i + 1][j] as number) + 1;
          } else bombMap[i + 1][j] = 1;
          if (j - 1 >= 0) {
            if (typeof bombMap[i + 1][j - 1] === "number") {
              bombMap[i + 1][j - 1] = (bombMap[i + 1][j - 1] as number) + 1;
            } else bombMap[i + 1][j - 1] = 1;
          }
          if (j + 1 < bombMap[i].length) {
            if (typeof bombMap[i + 1][j + 1] === "number") {
              bombMap[i + 1][j + 1] = (bombMap[i + 1][j + 1] as number) + 1;
            } else bombMap[i + 1][j + 1] = 1;
          }
        }
        if (j - 1 >= 0) {
          if (typeof bombMap[i][j - 1] === "number") {
            bombMap[i][j - 1] = (bombMap[i][j - 1] as number) + 1;
          } else bombMap[i][j - 1] = 1;
        }
        if (j + 1 < bombMap[i].length) {
          if (typeof bombMap[i][j + 1] === "number") {
            bombMap[i][j + 1] = (bombMap[i][j + 1] as number) + 1;
          } else bombMap[i][j + 1] = 1;
        }
      }
    }
  }

  return bombMap;
};

export const makeMap = (
  startingPoint: [number, number],
  x: number,
  y: number,
  totalBomb: number
) => {
  const emptyMap = Array.from({
    length: y,
  }).map(() => Array.from({ length: x }).fill(undefined)) as undefined[][];

  const newMap = placeBomb(emptyMap, totalBomb, x, y, startingPoint);

  return placeNumber(newMap);
};
