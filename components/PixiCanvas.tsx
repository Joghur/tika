"use client";

import { Sprite, Stage } from "@pixi/react";
import FieldItem from "./FieldItem";
import FieldItem3 from "./FieldItem3";
import FieldItem4 from "./FieldItem4";
import FieldItem5 from "./FieldItem5";
import FieldItem6 from "./FieldItem6";

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

const redStartYIndex = 200;
const redStartXIndex = 10;
const redAccIndex = 60;
const blueStartYIndex = 300;
const blueStartXIndex = 10;
const blueAccIndex = 60;

const team: Team[] = [
  {
    number: "1",
    position: { x: blueStartXIndex, y: redStartYIndex },
    color: "blue",
  },
  {
    number: "2",
    position: { x: blueStartXIndex + blueAccIndex, y: redStartYIndex },
    color: "blue",
  },
  {
    number: "3",
    position: { x: blueStartXIndex + 2 * blueAccIndex, y: redStartYIndex },
    color: "blue",
  },
  {
    number: "4",
    position: { x: blueStartXIndex + 3 * blueAccIndex, y: redStartYIndex },
    color: "blue",
  },
  {
    number: "5",
    position: { x: blueStartXIndex + 4 * blueAccIndex, y: redStartYIndex },
    color: "blue",
  },
  {
    number: "1",
    position: { x: redStartXIndex, y: blueStartYIndex },
    color: "red",
  },
  {
    number: "2",
    position: { x: redStartXIndex + redAccIndex, y: blueStartYIndex },
    color: "red",
  },
  {
    number: "3",
    position: { x: redStartXIndex + 2 * redAccIndex, y: blueStartYIndex },
    color: "red",
  },
  {
    number: "4",
    position: { x: redStartXIndex + 3 * redAccIndex, y: blueStartYIndex },
    color: "red",
  },
  {
    number: "5",
    position: { x: redStartXIndex + 4 * redAccIndex, y: blueStartYIndex },
    color: "red",
  },
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
        <FieldItem5
          key={index}
          type={"player"}
          number={o.number}
          position={o.position}
          color={o.color}
        />
      ))}
      {/* <FieldItem4 position={succesStartPosition} /> */}
      <FieldItem5
        type={"element"}
        element={"ball"}
        position={succesStartPosition}
      />
      <FieldItem5
        type={"element"}
        element={"star"}
        position={ballStartPosition}
      />
    </Stage>
  );
};

export default PixiCanvas;
