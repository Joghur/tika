import * as PIXI from "pixi.js";
import { useRef, useState } from "react";

import { Container, Graphics, Sprite, Text, useTick } from "@pixi/react";

import { Color, Position } from "../Field";

interface Props {
  position: Position;
  number?: string;
  color?: Color;
}

const FieldItems = ({ position, number, color }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<PIXI.Container>(null);
  const objectPosition = useRef(position);
  const initialClickPosition = useRef(position);

  const isPlayer = Boolean(number && color);

  const handlePointerDown = (e: any) => {
    setIsDragging(true);
    initialClickPosition.current = e.data.getLocalPosition(
      containerRef.current?.parent
    );
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  console.log("initialClickPosition.current", initialClickPosition.current);

  const handlePointerMove = (e: any) => {
    const speedMultiplier = 0.9;
    if (isDragging && containerRef.current) {
      const currentPosition = e.data.getLocalPosition(
        containerRef.current.parent
      );
      const deltaX =
        currentPosition.x - initialClickPosition.current.x * speedMultiplier;
      const deltaY =
        currentPosition.y - initialClickPosition.current.y * speedMultiplier;
      const newPosition = {
        x: objectPosition.current.x + deltaX,
        y: objectPosition.current.y + deltaY,
      };
      containerRef.current.position.set(newPosition.x, newPosition.y);
    }
  };

  const textStyle: PIXI.TextStyle = new PIXI.TextStyle({
    fill: "white",
    fontSize: 12,
    fontWeight: "bold",
  });

  useTick(() => {
    if (containerRef.current && isDragging) {
      objectPosition.current = containerRef.current.position;
    }
  });

  return (
    <Container
      ref={containerRef}
      position={objectPosition.current}
      pointerdown={handlePointerDown}
      pointerup={handlePointerUp}
      pointerupoutside={handlePointerUp}
      pointermove={handlePointerMove}
      eventMode="dynamic">
      {isPlayer && (
        <>
          <Graphics
            draw={(g) => {
              const offset = 2;
              g.beginFill(0x000000, 0.3);
              g.drawCircle(offset, offset, 10);
              g.endFill();
            }}
          />
          <Graphics
            draw={(g) => {
              g.beginFill(color === "blue" ? 0x0000ff : 0xff0000);
              g.drawCircle(0, 0, 10);
              g.endFill();
            }}
          />
          <Text
            text={number}
            style={textStyle}
            anchor={[0.5, 0.5]}
            position={[0, 0]}
          />
        </>
      )}
      {!isPlayer && <Sprite texture={PIXI.Texture.from("/ball.png")} />}
    </Container>
  );
};

export default FieldItems;
