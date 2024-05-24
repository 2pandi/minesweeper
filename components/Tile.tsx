"use client";

import React from "react";
import { BOMB, FLAG, TILE_STATUS } from "@/constants";
import { T_mapTile } from "@/interface";
import { useGameStore } from "@/zustand/gameStore";

interface I_tileProps extends React.HTMLAttributes<HTMLButtonElement> {
  openStatus: keyof typeof TILE_STATUS;
  value: T_mapTile;
  x: number;
  y: number;
  tempClassName?: string;
}

export default function Tile(props: I_tileProps) {
  const {
    openStatus,
    value,
    style,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    tempClassName,
  } = props;

  const { status } = useGameStore();

  const buttonColor = {
    color: BUTTON_VALUE_COLORSET[value as number],
  };

  return (
    <button
      className={`tile pacifico-regular ${tempClassName} ${
        openStatus === "OPENED" ||
        (status === "LOSE" && openStatus !== "FLAGGED")
          ? "opened"
          : ""
      }`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      style={{ ...style, ...buttonColor }}
    >
      {openStatus === "CONCEALED" && status !== "LOSE"
        ? ""
        : openStatus === "FLAGGED"
        ? FLAG
        : value}
      <div
        className={
          openStatus === "FLAGGED" && value !== BOMB && status === "LOSE"
            ? "x_line"
            : ""
        }
      >
        <div className="x_line1"></div>
        <div className="x_line2"></div>
      </div>
    </button>
  );
}

enum BUTTON_VALUE_COLORSET {
  none,
  blue,
  green,
  red,
  deepBlue,
  brown,
  "#ff899d",
}
