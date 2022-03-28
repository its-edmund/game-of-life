import React, { useEffect, useState } from "react";
import "./Node.css";

type NodeProps = {
  kill: boolean;
  r: number;
  c: number;
  set: (r: number, c: number) => void;
  reset: (r: number, c: number) => void;
  mouseDown: boolean;
  handleClick: () => void;
};

const Node = ({
  kill,
  r,
  c,
  set,
  reset,
  mouseDown,
  handleClick,
}: NodeProps) => {
  return (
    <div
      className={`node ${kill && "alive"}`}
      onMouseDown={() => {
        set(r, c);
        handleClick();
      }}
      onMouseEnter={() => {
        if (mouseDown) {
          set(r, c);
        }
      }}
    ></div>
  );
};

export default Node;
