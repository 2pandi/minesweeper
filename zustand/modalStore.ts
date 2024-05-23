import { create } from "zustand";

interface I_modalState {
  isOpen: boolean;
  setIsOpen: (state: I_modalState["isOpen"]) => void;

  text: string;
  setText: (state: I_modalState["text"]) => void;
}

export const useModalStore = create<I_modalState>()((set) => ({
  isOpen: false,
  setIsOpen: (state) => set(() => ({ isOpen: state })),

  text: "",
  setText: (state) => set(() => ({ text: state })),
}));
