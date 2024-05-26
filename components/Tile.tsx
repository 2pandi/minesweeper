"use client";

import React from "react";
import { BOMB, FLAG, TILE_STATUS } from "@/constants";
import { T_mapTile } from "@/interface";
import { useGameStore } from "@/zustand/gameStore";
import { pacifico } from "@/util/fonts";
import { registClickEvent } from "@/util";

interface I_tileProps extends React.HTMLAttributes<HTMLButtonElement> {
  openStatus: keyof typeof TILE_STATUS;
  value: T_mapTile;
  x: number;
  y: number;
  tempClassName?: string;
  onPointerDown: () => void;
  onPointerUp: () => void;
  onPointerLeave?: () => void;
}

export default function Tile(props: I_tileProps) {
  const {
    openStatus,
    value,
    style,
    onPointerDown,
    onPointerLeave,
    onPointerUp,
    tempClassName,
  } = props;

  const { status } = useGameStore();

  const buttonColor = {
    color: BUTTON_VALUE_COLORSET[value as number],
  };

  return (
    <button
      className={`${pacifico.className} tile ${tempClassName} ${
        openStatus === "OPENED" ||
        (status === "LOSE" && openStatus !== "FLAGGED")
          ? "opened"
          : ""
      }`}
      {...registClickEvent(onPointerDown, onPointerUp, onPointerLeave!)}
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
