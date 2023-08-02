// import { TextStyle } from "pixi.js";
// import React, { useEffect, useRef, useState } from "react";

// import { Container, Graphics, Sprite, Text, useTick } from "@pixi/react";

// import { Color } from "../Field";

// interface BallProps {
//   position: { x: number; y: number };
//   number?: string;
//   color?: Color;
// }

// /**
//  * Touch doesnt work
//  */

// const FieldItem6: React.FC<BallProps> = ({ position, number, color }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const containerRef = useRef<any>(null);
//   const objectPosition = useRef(position);
//   const lastMousePosition = useRef({ x: 0, y: 0 });

//   const handlePointerDown = (e: any) => {
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handlePointerUp = () => {
//     setIsDragging(false);
//   };

//   const handlePointerMove = (e: any) => {
//     if (isDragging && containerRef.current) {
//       const newPosition = e.data.getLocalPosition(containerRef.current);
//       containerRef.current.position.set(
//         newPosition.x - containerRef.current.width / 2,
//         newPosition.y - containerRef.current.height / 2
//       );
//     }
//   };

//   const handleWindowMouseMove = (e: MouseEvent) => {
//     if (isDragging && containerRef.current) {
//       const newPosition = eToGlobalPosition(e);
//       const dx = newPosition.x - lastMousePosition.current.x;
//       const dy = newPosition.y - lastMousePosition.current.y;
//       containerRef.current.position.x += dx;
//       containerRef.current.position.y += dy;
//       lastMousePosition.current = newPosition;
//     }
//   };

//   const handleTouchStart = (e: TouchEvent) => {
//     const touch = e.touches[0];
//     const newPosition = eToGlobalPosition(touch);
//     lastMousePosition.current = newPosition;
//     handlePointerDown(touch);
//   };

//   const handleTouchMove = (e: TouchEvent) => {
//     const touch = e.touches[0];
//     const newPosition = eToGlobalPosition(touch);
//     handlePointerMove({ data: { getLocalPosition: () => newPosition } });
//   };

//   const handleTouchEnd = () => {
//     handlePointerUp();
//   };

//   useEffect(() => {
//     window.addEventListener("mousemove", handleWindowMouseMove);
//     window.addEventListener("touchmove", handleTouchMove);
//     window.addEventListener("touchend", handleTouchEnd);
//     return () => {
//       window.removeEventListener("mousemove", handleWindowMouseMove);
//       window.removeEventListener("touchmove", handleTouchMove);
//       window.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, []);

//   const eToGlobalPosition = (
//     e: MouseEvent | Touch
//   ): { x: number; y: number } => {
//     const rect = containerRef.current.getBoundingClientRect();
//     return {
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     };
//   };

//   useTick(() => {
//     if (containerRef.current) {
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
//     <Container position={objectPosition.current}>
//       <Container
//         ref={containerRef}
//         eventMode="dynamic"
//         pointerdown={handlePointerDown}
//         pointerup={handlePointerUp}
//         pointerupoutside={handlePointerUp}
//         pointermove={handlePointerMove}
//         touchstart={handleTouchStart}>
//         {isPlayer && (
//           <>
//             <Graphics
//               visible={false} // Set visible to false to make it invisible
//               draw={(g) => {
//                 const offset = 2;
//                 g.beginFill(0x000000, 0.3);
//                 g.drawCircle(offset, offset, 10);
//                 g.endFill();
//               }}
//             />
//             <Graphics
//               draw={(g) => {
//                 g.beginFill(color === "blue" ? 0x0000ff : 0xff0000);
//                 g.drawCircle(0, 0, 10);
//                 g.endFill();
//               }}
//             />
//             <Text
//               text={number}
//               style={textStyle}
//               anchor={[0.5, 0.5]}
//               position={[0, 0]}
//             />
//           </>
//         )}
//         {!isPlayer && <Sprite image={"ball.png"} />}
//       </Container>
//     </Container>
//   );
// };

// export default FieldItem6;
