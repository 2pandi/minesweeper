import React from "react";
import { useGameStore } from "@/zustand/gameStore";
import { useModalStore } from "@/zustand/modalStore";

export default function useWin() {
  const { status } = useGameStore();
  const { setText, setIsOpen } = useModalStore();

  React.useEffect(() => {
    if (status === "WIN") {
      setText(`You win!`);
      setIsOpen(true);
      const winGames = localStorage.getItem("winGames") || 0;
      localStorage.setItem("winGames", String(+winGames + 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
}
