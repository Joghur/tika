"use client";

import {
  Sprite,
  Stage,
  useApp,
  AppProvider,
  ParticleContainer,
} from "@pixi/react";
import FieldItem from "./FieldItem";
import FieldItem3 from "./FieldItem3";
import FieldItem4 from "./FieldItem4";
import FieldItem5 from "./FieldItem5";
import FieldItem6 from "./FieldItem6";
import { PointerEvents } from "pixi.js";
import { useEffect, useState } from "react";
import SpriteMovement from "./SpriteMovement";
import FieldItem7 from "./FieldItem7";
import ObjectMovement from "./ObjectMovement";
import ObjectMovement2 from "./ObjectMovement2";

export type Color = "red" | "blue";

export interface Position {
  x: number;
  y: number;
}

export interface Team {
  number: string;
  position: Position;
  slutPosition: Position;
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
    slutPosition: {
      x: blueStartXIndex + Math.floor(Math.random() * 201) - 100,
      y: redStartYIndex + Math.floor(Math.random() * 201) - 100,
    },
    color: "blue",
  },
  {
    number: "2",
    position: { x: blueStartXIndex + blueAccIndex, y: redStartYIndex },
    slutPosition: {
      x: blueStartXIndex + Math.floor(Math.random() * 201) - 100,
      y: redStartYIndex + Math.floor(Math.random() * 201) - 100,
    },
    color: "blue",
  },
  {
    number: "3",
    position: { x: blueStartXIndex + 2 * blueAccIndex, y: redStartYIndex },
    slutPosition: {
      x: blueStartXIndex + Math.floor(Math.random() * 201) - 100,
      y: redStartYIndex + Math.floor(Math.random() * 201) - 100,
    },
    color: "blue",
  },
  {
    number: "4",
    position: { x: blueStartXIndex + 3 * blueAccIndex, y: redStartYIndex },
    slutPosition: {
      x: blueStartXIndex + Math.floor(Math.random() * 201) - 100,
      y: redStartYIndex + Math.floor(Math.random() * 201) - 100,
    },
    color: "blue",
  },
  {
    number: "5",
    position: { x: blueStartXIndex + 4 * blueAccIndex, y: redStartYIndex },
    slutPosition: {
      x: blueStartXIndex + Math.floor(Math.random() * 201) - 100,
      y: redStartYIndex + Math.floor(Math.random() * 201) - 100,
    },
    color: "blue",
  },
  {
    number: "1",
    position: { x: redStartXIndex, y: blueStartYIndex },
    slutPosition: {
      x: blueStartXIndex + Math.floor(Math.random() * 201) - 100,
      y: redStartYIndex + Math.floor(Math.random() * 201) - 100,
    },
    color: "red",
  },
  {
    number: "2",
    position: { x: redStartXIndex + redAccIndex, y: blueStartYIndex },
    slutPosition: {
      x: blueStartXIndex + Math.floor(Math.random() * 201) - 100,
      y: redStartYIndex + Math.floor(Math.random() * 201) - 100,
    },
    color: "red",
  },
  {
    number: "3",
    position: { x: redStartXIndex + 2 * redAccIndex, y: blueStartYIndex },
    slutPosition: {
      x: blueStartXIndex + Math.floor(Math.random() * 201) - 100,
      y: redStartYIndex + Math.floor(Math.random() * 201) - 100,
    },
    color: "red",
  },
  {
    number: "4",
    position: { x: redStartXIndex + 3 * redAccIndex, y: blueStartYIndex },
    slutPosition: {
      x: blueStartXIndex + Math.floor(Math.random() * 201) - 100,
      y: redStartYIndex + Math.floor(Math.random() * 201) - 100,
    },
    color: "red",
  },
  {
    number: "5",
    position: { x: redStartXIndex + 4 * redAccIndex, y: blueStartYIndex },
    slutPosition: {
      x: blueStartXIndex + Math.floor(Math.random() * 201) - 100,
      y: redStartYIndex + Math.floor(Math.random() * 201) - 100,
    },
    color: "red",
  },
];
console.log("team", team);
const ballStartPosition: Position = { x: 40, y: 60 };
const succesStartPosition: Position = { x: 100, y: 60 };

const PixiCanvas = () => {
  const [step, setStep] = useState(0);

  const handleClick = (e: any) => {
    const { x, y } = e.data.global;
    console.log("Clicked on Sprite:", x, y);
  };

  const handleTouchStart = (e: any) => {
    const { x, y } = e.data.global;
    console.log("Touched on Sprite:", x, y);
  };

  const handlePointerOver = (e: any) => {
    const { x, y } = e.data.global;
    console.log("Pointer over Sprite:", x, y);
  };

  const handleToggleStep = () => {
    setStep((prevStep) => (prevStep === 0 ? 1 : 0));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="m-4 flex justify-center items-center gap-4">
        <button
          className="button ring-2 p-2 shadow-sm"
          onClick={handleToggleStep}>
          {step === 0 ? "Goto Step 2" : "Goto Step 1"}
        </button>
        <p>Step {step + 1}</p>
      </div>
      <Stage width={389} height={802}>
        <Sprite
          touchstart={handleTouchStart}
          pointerdown={handleClick}
          pointerover={handlePointerOver}
          image={"field.png"}
        />
        <SpriteMovement
          initialPosition={{ x: 100, y: 100 }}
          targetPosition={{ x: 250, y: 500 }}
          duration={2000}
        />
        {team.map((o, index) => (
          <ObjectMovement2
            key={index}
            startPosition={{ x: o.position.x, y: o.position.y }}
            endPosition={{ x: o.slutPosition.x, y: o.slutPosition.y }}
            step={step}
          />
        ))}
        {/* <FieldItem4 position={succesStartPosition} /> */}
        <ObjectMovement2
          startPosition={{ x: 40, y: 50 }}
          endPosition={{ x: 50, y: 160 }}
          step={step}
        />
      </Stage>

      <Stage width={389} height={802}>
        <Sprite
          touchstart={handleTouchStart}
          pointerdown={handleClick}
          pointerover={handlePointerOver}
          image={"field.png"}
        />
        {/* <ObjectMovement
          step={toggle}
          startPosition={{ x: 140, y: 100 }}
          endPosition={{ x: 300, y: 300 }}
        /> */}
        {/* <FieldItems position={ballStartPosition} /> */}
        {/* <BallOrSuccess position={succesStartPosition} /> */}
        {/* <FieldItem position={succesStartPosition} /> */}
        {/* <Ball position={succesStartPosition} number={"2"} color={"blue"} /> */}
        {team.map((o, index) => (
          <FieldItem7
            key={index}
            type={"player"}
            number={o.number}
            position={o.position}
            color={o.color}
          />
        ))}
        {/* <FieldItem4 position={succesStartPosition} /> */}
        <FieldItem7
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
    </div>
  );
};

export default PixiCanvas;
