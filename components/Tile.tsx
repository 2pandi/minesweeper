"use client";

import React from "react";
import { FLAG, TILE_STATUS } from "@/constants";
import { T_mapTile } from "@/interface";

interface I_tileProps extends React.HTMLAttributes<HTMLButtonElement> {
  openStatus: keyof typeof TILE_STATUS;
  value: T_mapTile;
  x: number;
  y: number;
}

export default function Tile(props: I_tileProps) {
  const { openStatus, value, style, onClick } = props;

  return (
    <button
      className={`tile ${openStatus === "O" ? "opened" : ""}`}
      onClick={onClick}
      style={style}
    >
      {openStatus === "C" ? "" : openStatus === "F" ? FLAG : value}
    </button>
  );
}
