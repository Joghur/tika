import React, { useState, useEffect } from "react";
import { Container, Sprite, useTick } from "@pixi/react";
import { Texture } from "pixi.js";

interface ObjectMovementProps {
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  step: number;
}

const ObjectMovement2: React.FC<ObjectMovementProps> = ({
  startPosition,
  endPosition,
  step,
}) => {
  const [currentPosition, setCurrentPosition] = useState(startPosition);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setCurrentPosition(startPosition);
  }, [startPosition]);

  useTick((delta) => {
    if (step === 1 && !isAnimating && !isAtEndPosition()) {
      setIsAnimating(true);
    }

    if (isAnimating) {
      const distanceX = endPosition.x - currentPosition.x;
      const distanceY = endPosition.y - currentPosition.y;
      const speed = 0.03; // Adjust the speed of movement

      const distanceToCoverX = distanceX * speed * delta;
      const distanceToCoverY = distanceY * speed * delta;

      const newX = currentPosition.x + distanceToCoverX;
      const newY = currentPosition.y + distanceToCoverY;

      setCurrentPosition({ x: newX, y: newY });

      if (isAtEndPosition()) {
        setIsAnimating(false);
      }
    }
  });

  const isAtEndPosition = () => {
    const distanceX = endPosition.x - currentPosition.x;
    const distanceY = endPosition.y - currentPosition.y;
    const threshold = 1; // Adjust the threshold for stopping movement

    return Math.abs(distanceX) <= threshold && Math.abs(distanceY) <= threshold;
  };

  return (
    <Container>
      <Sprite texture={Texture.from("ball.png")} position={currentPosition} />
    </Container>
  );
};

export default ObjectMovement2;
