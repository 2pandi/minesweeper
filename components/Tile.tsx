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
    color: BUTTON_VALUE_COLORSET[value!],
  };

  return (
    <button
      className={`tile pacifico-regular ${tempClassName} ${
        openStatus === "O" || (status === "L" && openStatus !== "F")
          ? "opened"
          : ""
      }`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      style={{ ...style, ...buttonColor }}
    >
      {openStatus === "C" && status !== "L"
        ? ""
        : openStatus === "F"
        ? FLAG
        : value}
      <div
        className={
          openStatus === "F" && value !== BOMB && status === "L" ? "x_line" : ""
        }
      >
        <div className="x_line1"></div>
        <div className="x_line2"></div>
      </div>
    </button>
  );
}

const BUTTON_VALUE_COLORSET: { [key: string | number]: string } = {
  1: "blue",
  2: "green",
  3: "red",
  4: "deepBlue",
  5: "brown",
  6: "#ff899d",
};
