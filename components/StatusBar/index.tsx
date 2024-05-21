"use client";

import { BOMB, FLAG } from "@/constants";
import { useGameStore } from "@/zustand/gameStore";
import React from "react";
import Timer from "./Timer";

export default function StatusBar() {
  const { flaggableBomb, mode, changeMode, restart, status } = useGameStore();

  return (
    <React.Fragment>
      <div className="status_bar_container">
        <div className="left jaro-font">
          <div className="flaggable_bomb_counter">
            {String(flaggableBomb).padStart(3, "0")}
          </div>
        </div>
        <div onClick={() => restart()} className="mid">
          {status === "W" ? "😎" : status === "L" ? "😵" : "🙂"}
        </div>
        <div className="right">
          <button onClick={() => changeMode(mode)} className="mode_switch">
            {mode === "B" ? BOMB : FLAG}
          </button>
          <Timer />
        </div>
      </div>
    </React.Fragment>
  );
}
