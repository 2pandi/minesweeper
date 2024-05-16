export const GAME_STATUS = {
  R: "READY",
  P: "PLAYING",
  W: "WIN",
  L: "LOSE",
} as const;

export const GAME_MODE = {
  B: "BOMB_MODE",
  F: "FLAG_MODE",
} as const;

export const TILE_STATUS = {
  C: "CONCEALED",
  N: "NUMBERED",
  F: "FLAGGED",
  B: "BOOMED",
  O: "OPENED",
} as const;

export const TILE_TYPE = {
  B: "BOMB",
  N: "NUMBER",
  E: "EMPTY",
} as const;

export const BOMB = "💣";
export const FLAG = "🚩";
