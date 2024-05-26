"use client";

import React from "react";
import { useModalStore } from "@/zustand/modalStore";
import { dunggeunmo } from "@/util/fonts";

export default function Modal() {
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  const { isOpen, setIsOpen, text } = useModalStore();

  const updateDim = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  };

  React.useEffect(() => {
    updateDim();
    window.addEventListener("resize", updateDim);
    window.addEventListener("orientationchange", updateDim);

    return () => {
      window.removeEventListener("resize", updateDim);
      window.removeEventListener("orientationchange", updateDim);
    };
  }, []);

  return (
    <React.Fragment>
      {isOpen ? (
        <div
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
          }}
          className={`${dunggeunmo.className} modal`}
        >
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
                <div className={`${dunggeunmo.className} button_inline`}>
                  OK
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
