import React from "react";
import Modal from "./Modal";
import useWin from "@/hooks/useWin";

interface I_containerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Container(props: I_containerProps) {
  useWin();

  return (
    <React.Fragment>
      <div className="container">{props.children}</div>
      <Modal />
    </React.Fragment>
  );
}
