export const GAME_STATUS = {
  R: "READY",
  P: "PLAYING",
  W: "WIN",
  L: "LOSE",
} as const;

export const TILE_STATUS = {
  C: "CONCEALED",
  N: "NUMBERED",
  F: "FLAGGED",
  B: "BOOMED",
} as const;

export const TILE_TYPE = {
  B: "BOMB",
  N: "NUMBER",
  E: "EMPTY",
} as const;
