import { T_mapTile } from "@/interface";
import { GAME_MODE, GAME_STATUS } from "./../constants/index";
import { create } from "zustand";

interface I_gameState {
  status: keyof typeof GAME_STATUS;
  start: () => void;
  lose: () => void;
  win: () => void;

  mode: keyof typeof GAME_MODE;
  changeMode: (state: I_gameState["mode"]) => void;

  totalBomb: number;

  map: T_mapTile[][];
  setMap: (newMap: I_gameState["map"]) => void;

  startingPoint: [number, number];
  setStartingPoint: (point: I_gameState["startingPoint"]) => void;
}

export const useGameStore = create<I_gameState>()((set) => ({
  status: "R",
  start: () => set(() => ({ status: "P" })),
  lose: () => set(() => ({ status: "L" })),
  win: () => set(() => ({ status: "W" })),

  mode: "B",
  changeMode: (state) => set({ mode: state === "B" ? "F" : "B" }),

  totalBomb: 100,

  map: [],
  setMap: (newMap) => set({ map: newMap }),

  startingPoint: [-1, -1],
  setStartingPoint: (point) => set({ startingPoint: point }),
}));
