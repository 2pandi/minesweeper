"use client";

import React from "react";
import { TILE_STATUS, TILE_TYPE } from "@/constants";
import { useGameStore } from "@/zustand/gameStore";
import { T_mapTile } from "@/interface";

type T_status = keyof typeof TILE_STATUS;
interface I_tileProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: keyof typeof TILE_TYPE;
  value: T_mapTile;
  x: number;
  y: number;
}

export default function Tile(props: I_tileProps) {
  const { type, value, style, x, y } = props;
  const [tileStatus, setTileStatus] = React.useState<T_status>("C");
  const { status, start, startingPoint, setStartingPoint } = useGameStore();

  const clickTileHandler = () => {
    console.log(status);
    console.log(startingPoint);
    if (status === "R" && startingPoint[0] < 0) {
      start();
      setStartingPoint([x, y]);
    }

    switch (value) {
      case "💣":
        setTileStatus("B");
      case undefined:
        setTileStatus("O");
      default:
        setTileStatus("N");
    }
    console.log(value);
  };

  return (
    <button
      className={`${tileStatus !== "C" ? "opened" : ""}`}
      onClick={clickTileHandler}
      style={style}
    >
      {tileStatus === "C" ? "" : value}
    </button>
  );
}
