import { TILE_STATUS } from "@/constants";

export type T_mapTile = undefined | "💣" | number;

export type T_openMapTile = keyof typeof TILE_STATUS;
