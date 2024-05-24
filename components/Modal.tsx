"use client";

import React from "react";
import { useModalStore } from "@/zustand/modalStore";

export default function Modal() {
  const { isOpen, setIsOpen, text } = useModalStore();

  return (
    <React.Fragment>
      {isOpen ? (
        <div className="modal">
          <div className="dim" />
          <div className="dialog">
            <div className="header">
              <span className="header_text">Alert</span>
              <button className="x_button" onClick={() => setIsOpen(false)}>
                X
              </button>
            </div>
            <div className="inner">
              <div className="text">{text}</div>
              <button className="button" onClick={() => setIsOpen(false)}>
                <div className="button_inline">OK</div>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
