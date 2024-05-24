import React from "react";
import { TOTAL_GAMES } from "@/constants";
import { useGameStore } from "@/zustand/gameStore";

export default function useStart() {
  const { status } = useGameStore();

  React.useEffect(() => {
    if (status === "PLAYING") {
      const totalGames = localStorage.getItem(TOTAL_GAMES) || 0;
      localStorage.setItem(TOTAL_GAMES, String(+totalGames + 1));
    }
  }, [status]);
}
