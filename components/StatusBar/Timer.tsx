"use client";

import React from "react";
import { useGameStore } from "@/zustand/gameStore";
import useInterval from "@/hooks/useInterval";

export default function Timer() {
  const [minute, setMinute] = React.useState<number>(0);
  const [second, setSecond] = React.useState<number>(0);
  const [delay, setDelay] = React.useState<number>(0);

  const { status } = useGameStore();

  useInterval(() => {
    if (second < 59) setSecond((pre) => pre + 1);
    if (second === 59) {
      setSecond(0);
      setMinute((pre) => pre + 1);
    }
  }, delay);

  React.useEffect(() => {
    if (status === "P" && minute === 0 && second === 0) setDelay(1000);

    if (status === "R") {
      setDelay(0);
      setMinute(0);
      setSecond(0);
    }

    if (status !== "P" || (minute === 99 && second === 59)) setDelay(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="timer jaro-font">{`${String(minute).padStart(
      2,
      "0"
    )}:${String(second).padStart(2, "0")}`}</div>
  );
}
