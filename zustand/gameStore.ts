import { T_mapTile, T_openMapTile } from "@/interface";
import { GAME_MODE, GAME_STATUS } from "./../constants/index";
import { create } from "zustand";

interface I_gameState {
  mapXLen: number;
  mapYLen: number;

  status: keyof typeof GAME_STATUS;
  start: () => void;
  lose: () => void;
  win: () => void;

  mode: keyof typeof GAME_MODE;
  changeMode: (state: I_gameState["mode"]) => void;

  totalBomb: number;

  map: T_mapTile[][];
  setMap: (newMap: I_gameState["map"]) => void;

  openTileMap: T_openMapTile[][];
  setOpenTileMap: (newMap: I_gameState["openTileMap"]) => void;

  startingPoint: [number, number];
  setStartingPoint: (point: I_gameState["startingPoint"]) => void;
}

const mapXLen = 13;
const mapYLen = 20;
const totalBomb = 100;

const defaultMap = Array.from({
  length: 20,
}).map(() => Array.from({ length: 13 }).fill(undefined)) as undefined[][];

export const useGameStore = create<I_gameState>()((set) => ({
  mapXLen,
  mapYLen,

  status: "R",
  start: () => set(() => ({ status: "P" })),
  lose: () => set(() => ({ status: "L" })),
  win: () => set(() => ({ status: "W" })),

  mode: "B",
  changeMode: (state) => set({ mode: state === "B" ? "F" : "B" }),

  totalBomb,

  map: defaultMap,
  setMap: (newMap) => set({ map: newMap }),

  openTileMap: defaultMap.map((line) => line.map(() => "C")),
  setOpenTileMap: (newMap) => set({ openTileMap: newMap }),

  startingPoint: [-1, -1],
  setStartingPoint: (point) => set({ startingPoint: point }),
}));
