import React, { useEffect, useState } from "react";
import "./Node.css";

type NodeProps = {
  kill: boolean;
  r: number;
  c: number;
  set: (r: number, c: number) => void;
  reset: (r: number, c: number) => void;
  mouseDown: boolean;
  rightMouseDown: boolean;
  handleClick: () => void;
  handleRightClick: () => void;
};

const Node = ({
  kill,
  r,
  c,
  set,
  reset,
  mouseDown,
  rightMouseDown,
  handleClick,
  handleRightClick,
}: NodeProps) => {
  return (
    <div
      className={`node ${kill && "alive"}`}
      onContextMenu={(e) => {
        e.preventDefault();
        reset(r, c);
        handleRightClick();
      }}
      onMouseDown={() => {
        set(r, c);
        handleClick();
      }}
      onMouseEnter={() => {
        if (rightMouseDown) {
          reset(r, c);
        } else if (mouseDown) {
          set(r, c);
        }
      }}
    ></div>
  );
};

export default Node;
