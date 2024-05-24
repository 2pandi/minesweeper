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
