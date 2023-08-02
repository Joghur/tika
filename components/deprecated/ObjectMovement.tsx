import React, { useState } from "react";
import { Container, Sprite, useTick } from "@pixi/react";
import { Texture } from "pixi.js";

interface ObjectMovementProps {
  isMoving: boolean;
  onToggleMoving: () => void;
}

const ObjectMovement: React.FC<ObjectMovementProps> = ({ isMoving, onToggleMoving }) => {
  const [currentPosition, setCurrentPosition] = useState({ x: 100, y: 100 });

  useTick((delta) => {
    if (isMoving) {
      const newX = currentPosition.x + 2 * delta; // Adjust the speed of movement
      setCurrentPosition((prevPosition) => ({ ...prevPosition, x: newX }));
    }
  });

  return (
    <Container>
      <Sprite texture={Texture.from("star.png")} position={currentPosition} />
    </Container>
  );
};

export default ObjectMovement;

// import React, { useState, useEffect } from "react";
// import { Container, Sprite, useTick } from "@pixi/react";
// import { Texture } from "pixi.js";

// interface ObjectMovementProps {
//   step: 0 | 1;
//   startPosition: { x: number; y: number };
//   endPosition: { x: number; y: number };
// }

// const ObjectMovement: React.FC<ObjectMovementProps> = ({
//   step,
//   startPosition,
//   endPosition,
// }) => {
//   const [isMoving, setIsMoving] = useState(step === 0);
//   const [currentPosition, setCurrentPosition] = useState(startPosition);

//   useEffect(() => {
//     if (isMoving) {
//       setCurrentPosition(startPosition);
//     } else {
//       setCurrentPosition(endPosition);
//     }
//   }, [isMoving, step]);

//   useTick((delta) => {
//     if (isMoving) {
//       const newX =
//         currentPosition.x + (endPosition.x - startPosition.x) * delta;
//       const newY =
//         currentPosition.y + (endPosition.y - startPosition.y) * delta;
//       setCurrentPosition({ x: newX, y: newY });
//     }
//   });

//   const handleClick = () => {
//     setIsMoving(!isMoving);
//   };

//   return (
//     <Container>
//       <Sprite
//         texture={Texture.from("star.png")}
//         position={currentPosition}
//         eventMode="dynamic"
//         pointerdown={handleClick}
//       />
//     </Container>
//   );
// };

// export default ObjectMovement;
