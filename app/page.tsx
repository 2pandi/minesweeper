"use client";

import React from "react";
import Container from "@/components/Container";
import StatusBar from "@/components/StatusBar";
import TileBox from "@/components/TileBox";

export default function Home() {
  React.useEffect(() => {
    document.oncontextmenu = () => false;
  }, []);

  return (
    <div className="home">
      <Container>
        <StatusBar />
        <TileBox />
      </Container>
    </div>
  );
}
