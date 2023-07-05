import React, { useRef, useState } from "react";
import { Container, Sprite, useTick } from "@pixi/react";
import { Texture } from "pixi.js";

interface SpriteMovementProps {
  initialPosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  duration: number;
}

const SpriteMovement: React.FC<SpriteMovementProps> = ({
  initialPosition,
  targetPosition,
  duration,
}) => {
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const startTimeRef = useRef<number | null>(null);

  const updatePosition = (elapsedTime: number) => {
    const progress = Math.min(elapsedTime / duration, 1);
    const newX = initialPosition.x + (targetPosition.x - initialPosition.x) * progress;
    const newY = initialPosition.y + (targetPosition.y - initialPosition.y) * progress;
    setCurrentPosition({ x: newX, y: newY });

    if (progress < 1) {
      requestAnimationFrame(updatePosition);
    }
  };

  useTick((delta) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = performance.now();
    }

    const elapsedTime = performance.now() - startTimeRef.current;
    updatePosition(elapsedTime);

    if (elapsedTime >= duration) {
      startTimeRef.current = null;
    }
  });

  return <Sprite texture={Texture.from("ball.png")} position={currentPosition} />;
};

export default SpriteMovement;
