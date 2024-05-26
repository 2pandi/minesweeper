"use client";

import React from "react";
import Modal from "./Modal";
import useWin from "@/hooks/useWin";

interface I_containerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Container(props: I_containerProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const disableTouch = () => {
    if (ref.current) {
      ref.current.classList.add("no-touch");
    }
  };

  const enableTouch = () => {
    if (ref.current) {
      ref.current.classList.remove("no-touch");
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", disableTouch);
    window.addEventListener("orientationchange", disableTouch);

    const reEnableTouch = () => {
      setTimeout(enableTouch, 500);
    };

    window.addEventListener("resize", reEnableTouch);
    window.addEventListener("orientationchange", reEnableTouch);

    return () => {
      window.removeEventListener("resize", disableTouch);
      window.removeEventListener("orientationchange", disableTouch);
      window.removeEventListener("resize", reEnableTouch);
      window.removeEventListener("orientationchange", reEnableTouch);
    };
  }, []);

  useWin();

  return (
    <React.Fragment>
      <div ref={ref} className="container">
        {props.children}
      </div>
      <Modal />
    </React.Fragment>
  );
}
