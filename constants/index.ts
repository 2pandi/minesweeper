export enum GAME_STATUS {
  READY,
  PLAYING,
  WIN,
  LOSE,
}

export enum GAME_MODE {
  BOMB_MODE,
  FLAG_MODE,
}

export enum TILE_STATUS {
  CONCEALED,
  NUMBERED,
  FLAGGED,
  BOOMED,
  OPENED,
}

export enum TILE_TYPE {
  BOMB,
  NUMBER,
  EMPTY,
}

export const BOMB = "💣";
export const FLAG = "🚩";

export const TOTAL_BOMB = 50;
export const MAP_X_LENGTH = 13;
export const MAP_Y_LENGTH = 20;

// localStorage
export const TOTAL_GAMES = "totalGames";
export const WIN_GAMES = "winGames";
export const BEST_RECORD = "bestRecord";

export const directions = [
  [0, -1], // 위
  [0, 1], // 아래
  [1, 0], // 오른쪽
  [-1, 0], // 왼쪽
  [1, -1], // 오른쪽 위
  [1, 1], // 오른쪽 아래
  [-1, -1], // 왼쪽 위
  [-1, 1], // 왼쪽 아래
] as const;
