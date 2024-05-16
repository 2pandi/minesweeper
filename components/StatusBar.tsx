"use client";

import { BOMB, FLAG } from "@/constants";
import { useGameStore } from "@/zustand/gameStore";
import React from "react";

export default function StatusBar() {
  const { totalBomb, mode, changeMode } = useGameStore();

  const clickModeSwitchHandler = () => {
    changeMode(mode);
  };

  return (
    <React.Fragment>
      <div className="status_bar_container">
        <div className="left">{totalBomb}</div>
        <div className="mid">smile</div>
        <div className="right">
          <button onClick={clickModeSwitchHandler}>
            {mode === "B" ? BOMB : FLAG}
          </button>
          <div>time</div>
        </div>
      </div>
    </React.Fragment>
  );
}
