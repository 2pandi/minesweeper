"use client";

import { TILE_STATUS, TILE_TYPE } from "@/constants";
import { useState } from "react";

type T_status = keyof typeof TILE_STATUS;
interface I_tileProps {
  type: keyof typeof TILE_TYPE;
  value?: number | "BOMB";
}

export default function Tile(props: I_tileProps) {
  const { type, value } = props;
  const [status, setStatus] = useState<T_status>("C");

  return <button>{status === "C" ? "" : value}</button>;
}
