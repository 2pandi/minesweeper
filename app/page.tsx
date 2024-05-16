"use client";

import React from "react";
import Container from "@/components/Container";
import StatusBar from "@/components/StatusBar";
import TileBox from "@/components/TileBox";

export default function Home() {
  return (
    <div className="home">
      <Container>
        <StatusBar />
        <TileBox></TileBox>
      </Container>
    </div>
  );
}
