"use client";

import * as PIXI from "pixi.js";
import { Fragment, useEffect, useRef, useState } from "react";

import { Container, Graphics, Text, useTick } from "@pixi/react";

import { Team } from "./Field";

interface Props extends Team {}

const Player = ({ number, position, color }: Props) => {
  const objectRef = useRef<PIXI.Text>(null);
  const [objectPosition, setObjectPosition] = useState(position);
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

  const textStyle: PIXI.TextStyle = new PIXI.TextStyle({
    fill: "white",
    fontSize: 12,
    fontWeight: "bold",
  });

  return (
    <Fragment>
      <Container position={objectPosition}>
        <Graphics
          draw={(g) => {
            g.beginFill(color === "blue" ? 0x0000ff : 0xff0000);
            g.drawCircle(0, 0, 10);
            g.endFill();
          }}
        />
      </Container>
      {isMouseDown && (
        <Text
          text={number}
          ref={objectRef}
          style={textStyle}
          anchor={[0.5, 0.5]}
          eventMode="dynamic"
          pointerdown={(e) => {
            prevMousePosition.current = e.data.global;
          }}
          pointermove={handleMouseMove}
        />
      )}
    </Fragment>
  );
};

export default Player;
