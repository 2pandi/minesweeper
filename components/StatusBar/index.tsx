"use client";

import React from "react";
import { BOMB, FLAG } from "@/constants";
import { useGameStore } from "@/zustand/gameStore";
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
          {status === "WIN" ? "😎" : status === "LOSE" ? "😵" : "🙂"}
        </div>
        <div className="right">
          <button onClick={() => changeMode(mode)} className="mode_switch">
            {mode === "BOMB_MODE" ? BOMB : FLAG}
          </button>
          <Timer />
        </div>
      </div>
    </React.Fragment>
  );
}
