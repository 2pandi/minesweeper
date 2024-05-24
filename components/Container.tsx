import React from "react";
import Modal from "./Modal";
import { useGameStore } from "@/zustand/gameStore";
import { useModalStore } from "@/zustand/modalStore";

interface I_containerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Container(props: I_containerProps) {
  const { status } = useGameStore();
  const { setText, setIsOpen } = useModalStore();

  React.useEffect(() => {
    if (status === "WIN") {
      setText("You win!");
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <React.Fragment>
      <div className="container">{props.children}</div>
      <Modal />
    </React.Fragment>
  );
}
