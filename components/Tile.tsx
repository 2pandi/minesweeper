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
  const { type, value, style, x, y, onClick } = props;
  const [tileStatus, setTileStatus] = React.useState<T_status>("C");

  const clickTileHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick?.(e);

    switch (value) {
      case "💣":
        setTileStatus("B");
      case undefined:
        setTileStatus("O");
      default:
        setTileStatus("N");
    }
  };

  return (
    <button
      className={`tile ${tileStatus !== "C" ? "opened" : ""}`}
      onClick={(e) => clickTileHandler(e)}
      style={style}
    >
      {tileStatus === "C" ? "" : value}
    </button>
  );
}
