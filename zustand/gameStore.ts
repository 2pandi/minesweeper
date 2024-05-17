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
  restart: () => void;

  mode: keyof typeof GAME_MODE;
  changeMode: (state: I_gameState["mode"]) => void;

  totalBomb: number;
  flagBomb: () => void;
  deflagBomb: () => void;

  map: T_mapTile[][];
  setMap: (newMap: I_gameState["map"]) => void;
  isMapSet: boolean;
  setIsMapSet: (state: I_gameState["isMapSet"]) => void;

  openTileMap: T_openMapTile[][];
  setOpenTileMap: (newMap: I_gameState["openTileMap"]) => void;

  startingPoint: [number, number];
  setStartingPoint: (point: I_gameState["startingPoint"]) => void;
}

const mapXLen = 13;
const mapYLen = 20;
const totalBomb = 60;

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
  restart: () =>
    set(() => ({
      status: "R",
      totalBomb,
      map: Array.from({
        length: 20,
      }).map(() => Array.from({ length: 13 }).fill(undefined)) as undefined[][],
      openTileMap: (
        Array.from({
          length: 20,
        }).map(() =>
          Array.from({ length: 13 }).fill(undefined)
        ) as undefined[][]
      ).map((line) => line.map(() => "C")),
      startingPoint: [-1, -1],
      isMapSet: false,
    })),

  mode: "B",
  changeMode: (state) => set({ mode: state === "B" ? "F" : "B" }),

  totalBomb,
  flagBomb: () => set((state) => ({ totalBomb: state.totalBomb - 1 })),
  deflagBomb: () => set((state) => ({ totalBomb: state.totalBomb + 1 })),

  map: defaultMap,
  setMap: (newMap) => set({ map: newMap }),
  isMapSet: false,
  setIsMapSet: (state) => set({ isMapSet: state }),

  openTileMap: defaultMap.map((line) => line.map(() => "C")),
  setOpenTileMap: (newMap) => set({ openTileMap: newMap }),

  startingPoint: [-1, -1],
  setStartingPoint: (point) => set({ startingPoint: point }),
}));
