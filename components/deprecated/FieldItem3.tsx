// import { TextStyle } from 'pixi.js';
// import React, { useRef, useState } from 'react';

// import { Container, Graphics, Sprite, Text, useTick } from '@pixi/react';

// import { Color } from '../Field';

// interface BallProps {
//   position: { x: number; y: number };
//   number?: string;
//   color?: Color;
// }

// const FieldItem3: React.FC<BallProps> = ({ position, number, color }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const containerRef = useRef<any>(null);
//   const objectPosition = useRef(position);

//   const handlePointerDown = () => {
//     setIsDragging(true);
//   };

//   const handlePointerUp = () => {
//     setIsDragging(false);
//   };

//   const handlePointerMove = (e: any) => {
//     if (isDragging && containerRef.current) {
//       const newPosition = e.data.getLocalPosition(containerRef.current.parent);
//       containerRef.current.position.set(newPosition.x, newPosition.y);
//     }
//   };

//   const handlePointerOver = () => {
//     if (isDragging) {
//       setIsDragging(false);
//     }
//   };

//   useTick(() => {
//     if (containerRef.current && isDragging) {
//       objectPosition.current = containerRef.current.position;
//     }
//   });

//   const textStyle: TextStyle = new TextStyle({
//     fill: "white",
//     fontSize: 12,
//     fontWeight: "bold",
//   });

//   const isPlayer = Boolean(number && color);

//   return (
//     <Container
//       ref={containerRef}
//       position={objectPosition.current}
//       pointerdown={handlePointerDown}
//       pointerup={handlePointerUp}
//       pointerupoutside={handlePointerUp}
//       pointermove={handlePointerMove}
//       pointerover={handlePointerOver}
//       eventMode="dynamic">
//       {isPlayer && (
//         <>
//           <Graphics
//             draw={(g) => {
//               const offset = 2;
//               g.beginFill(0x000000, 0.3);
//               g.drawCircle(offset, offset, 10);
//               g.endFill();
//             }}
//           />
//           <Graphics
//             draw={(g) => {
//               g.beginFill(color === "blue" ? 0x0000ff : 0xff0000);
//               g.drawCircle(0, 0, 10);
//               g.endFill();
//             }}
//           />
//           <Text
//             text={number}
//             style={textStyle}
//             anchor={[0.5, 0.5]}
//             position={[0, 0]}
//           />
//         </>
//       )}
//       {!isPlayer && <Sprite image={"ball.png"} />}
//     </Container>
    
//   );
// };

// export default FieldItem3;
