import { Container, Graphics, Sprite, Text, useTick } from "@pixi/react";
import React, { useEffect, useRef, useState } from "react";
import { Color } from "./PixiCanvas";
import { TextStyle } from "pixi.js";

type BallOrStar = {
  type: "element";
  element: "star" | "ball";
};

type Player = {
  type: "player";
  number: string;
  color: Color;
};

type BallProps = {
  type: "element" | "player";
  position: { x: number; y: number };
} & (BallOrStar | Player);

/**
 * This is the the main test prototype
 */
const FieldItem7: React.FC<BallProps> = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<any>(null);
  const objectPosition = useRef(props.position);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  const eToGlobalPosition = (
    e: MouseEvent | Touch
  ): { x: number; y: number } => {
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // const handlePointerDown = () => {
  //   setIsDragging(true);
  // };
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: any) => {
    if (isDragging && containerRef.current) {
      const newPosition = e.data.getLocalPosition(containerRef.current.parent);
      containerRef.current.position.set(newPosition.x, newPosition.y);
    }
  };

  const handlePointerOver = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    console.log("touch", touch);
    const newPosition = eToGlobalPosition(touch);
    lastMousePosition.current = newPosition;
    handlePointerDown(touch);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    const newPosition = eToGlobalPosition(touch);
    handlePointerMove({ data: { getLocalPosition: () => newPosition } });
  };

  const handleTouchEnd = () => {
    handlePointerUp();
  };

  useEffect(() => {
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useTick(() => {
    if (containerRef.current && isDragging) {
      objectPosition.current = containerRef.current.position;
    }
  });

  const textStyle: TextStyle = new TextStyle({
    fill: "white",
    fontSize: 12,
    fontWeight: "bold",
  });

  const isPlayer = props.type === "player";

  return (
    <Container
      ref={containerRef}
      position={objectPosition.current}
      pointerdown={handlePointerDown}
      pointerup={handlePointerUp}
      pointerupoutside={handlePointerUp}
      pointermove={handlePointerMove}
      pointerover={handlePointerOver}
      touchstart={handleTouchStart}
      eventMode="dynamic">
      <Graphics
        // visible={false}
        draw={(g) => {
          g.beginFill(0xffffff, 0.001);
          g.drawCircle(0, 0, 25);
          g.endFill();
        }}
      />
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
              g.beginFill(props.color === "blue" ? 0x0000ff : 0xff0000);
              g.drawCircle(0, 0, 10);
              g.endFill();
            }}
          />
          <Text
            text={props.number}
            style={textStyle}
            anchor={[0.5, 0.5]}
            position={[0, 0]}
          />
        </>
      )}
      {!isPlayer && (
        <Sprite
          anchor={[0.5, 0.5]}
          position={[0, 0]}
          image={props.element === "ball" ? "ball.png" : "star.png"}
        />
      )}
    </Container>
  );
};

export default FieldItem7;
