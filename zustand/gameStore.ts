import { T_mapTile, T_openMapTile } from "@/interface";
import {
  GAME_MODE,
  GAME_STATUS,
  MAP_X_LENGTH,
  MAP_Y_LENGTH,
  TOTAL_BOMB,
} from "./../constants/index";
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

  flaggableBomb: number;
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

  bombedPoint: I_gameState["startingPoint"];
  setBombedPoint: (point: I_gameState["startingPoint"]) => void;
}

const defaultMap = Array.from({
  length: 20,
}).map(() => Array.from({ length: 13 }).fill(undefined)) as undefined[][];

export const useGameStore = create<I_gameState>()((set) => ({
  mapXLen: MAP_X_LENGTH,
  mapYLen: MAP_Y_LENGTH,

  status: "R",
  start: () => set(() => ({ status: "P" })),
  lose: () => set(() => ({ status: "L" })),
  win: () => set(() => ({ status: "W" })),
  restart: () =>
    set(() => ({
      status: "R",
      flaggableBomb: TOTAL_BOMB,
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
      bombedPoint: [-1, -1],
      isMapSet: false,
    })),

  mode: "B",
  changeMode: (state) => set({ mode: state === "B" ? "F" : "B" }),

  flaggableBomb: TOTAL_BOMB,
  flagBomb: () => set((state) => ({ flaggableBomb: state.flaggableBomb - 1 })),
  deflagBomb: () =>
    set((state) => ({ flaggableBomb: state.flaggableBomb + 1 })),

  map: defaultMap,
  setMap: (newMap) => set({ map: newMap }),
  isMapSet: false,
  setIsMapSet: (state) => set({ isMapSet: state }),

  openTileMap: defaultMap.map((line) => line.map(() => "C")),
  setOpenTileMap: (newMap) => set({ openTileMap: newMap }),

  startingPoint: [-1, -1],
  setStartingPoint: (point) => set({ startingPoint: point }),

  bombedPoint: [-1, -1],
  setBombedPoint: (point) => set({ bombedPoint: point }),
}));
