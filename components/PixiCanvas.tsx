"use client";

import { Sprite, Stage } from "@pixi/react";
import FieldItem from "./FieldItem";
import FieldItem3 from "./FieldItem3";
import FieldItem4 from "./FieldItem4";

export type Color = "red" | "blue";

export interface Position {
  x: number;
  y: number;
}

export interface Team {
  number: string;
  position: Position;
  color: Color;
}

const redStartIndex = 200;
const blueStartIndex = 300;

const team: Team[] = [
  { number: "1", position: { x: 10, y: redStartIndex }, color: "blue" },
  { number: "2", position: { x: 40, y: redStartIndex }, color: "blue" },
  { number: "3", position: { x: 70, y: redStartIndex }, color: "blue" },
  { number: "4", position: { x: 100, y: redStartIndex }, color: "blue" },
  { number: "5", position: { x: 130, y: redStartIndex }, color: "blue" },
  { number: "1", position: { x: 10, y: blueStartIndex }, color: "red" },
  { number: "2", position: { x: 40, y: blueStartIndex }, color: "red" },
  { number: "3", position: { x: 70, y: blueStartIndex }, color: "red" },
  { number: "4", position: { x: 100, y: blueStartIndex }, color: "red" },
  { number: "5", position: { x: 130, y: blueStartIndex }, color: "red" },
];

const ballStartPosition: Position = { x: 40, y: 60 };
const succesStartPosition: Position = { x: 100, y: 60 };

const PixiCanvas = () => {
  return (
    <Stage width={389} height={802}>
      <Sprite image={"field.png"} />
      {/* <FieldItems position={ballStartPosition} /> */}
      {/* <BallOrSuccess position={succesStartPosition} /> */}
      {/* <FieldItem position={succesStartPosition} /> */}
      {/* <Ball position={succesStartPosition} number={"2"} color={"blue"} /> */}
      {team.map((o, index) => (
        <FieldItem4
          key={index}
          number={o.number}
          position={o.position}
          color={o.color}
        />
      ))}
      <FieldItem4 position={ballStartPosition} />
    </Stage>
  );
};

export default PixiCanvas;
