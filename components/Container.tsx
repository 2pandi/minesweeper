import React from "react";

interface I_containerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Container(props: I_containerProps) {
  return <div className="container">{props.children}</div>;
}
