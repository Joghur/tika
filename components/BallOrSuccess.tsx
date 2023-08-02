"use client";

import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";

import { Sprite, useTick } from "@pixi/react";

import { Position } from "./Field";

const defaultPosition: Position = { x: 0, y: 0 };

interface Props {
  position?: Position;
}

const BallOrSuccess = ({ position }: Props) => {
  const objectRef = useRef<PIXI.Sprite>(null);
  const [objectPosition, setObjectPosition] = useState(
    position || defaultPosition
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const prevMousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    if (isMouseDown) {
      const { x, y } = e.data.global;
      const deltaX = x - prevMousePosition.current.x;
      const deltaY = y - prevMousePosition.current.y;
      setObjectPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));
      prevMousePosition.current = { x, y };
    }
  };

  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useTick(() => {
    if (objectRef.current && isMouseDown) {
      objectRef.current.position.set(objectPosition.x, objectPosition.y);
    }
  });

  return (
    <Sprite
      texture={PIXI.Texture.from("/ball.png")}
      ref={objectRef}
      eventMode="dynamic"
      pointerdown={(e) => {
        prevMousePosition.current = e.data.global;
      }}
      pointermove={handleMouseMove}
    />
  );
};

export default BallOrSuccess;
