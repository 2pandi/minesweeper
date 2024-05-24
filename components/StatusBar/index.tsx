"use client";

import React from "react";
import { BEST_RECORD, BOMB, FLAG, TOTAL_GAMES, WIN_GAMES } from "@/constants";
import { useGameStore } from "@/zustand/gameStore";
import Timer from "./Timer";
import { useModalStore } from "@/zustand/modalStore";

export default function StatusBar() {
  const { flaggableBomb, mode, changeMode, restart, status } = useGameStore();
  const { setText, setIsOpen } = useModalStore();

  const clickTrophyHandler = () => {
    const totalGames = localStorage.getItem(TOTAL_GAMES) || 0;
    const winGames = localStorage.getItem(WIN_GAMES) || 0;
    const bestRecord = localStorage.getItem(BEST_RECORD) || "none";
    setText(`
Total Games: ${totalGames}\n
Win Games: ${winGames}\n
Winning Rate: ${
      totalGames ? ((+winGames / +totalGames) * 100).toFixed(1) : 0
    }%\n
Best Record: ${bestRecord}
    `);
    setIsOpen(true);
  };

  return (
    <React.Fragment>
      <div className="status_bar_container">
        <div className="left jaro-font">
          <div className="flaggable_bomb_counter">
            {String(flaggableBomb).padStart(3, "0")}
          </div>
          <div onClick={clickTrophyHandler} className="trophy">
            🏆
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
