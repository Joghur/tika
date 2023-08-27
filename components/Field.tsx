"use client";

import { useEffect, useRef, useState } from 'react';

import {
    adjustCoords, calculatePercentageDistance, calculatePixelDistance
} from '@/utils/coordinates';
import { handleDeviceEvent } from '@/utils/events';
import { Sprite, Stage } from '@pixi/react';

import FieldItem from './FieldItem';

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

interface Props {
  isAwarded: boolean;
  editable: boolean;
  handleDistance: (distance: number, distancePercent: number) => void;
}

const ballStartPosition: Position = { x: 40, y: 60 };
const succesStartPosition: Position = { x: 100, y: 60 };

// TODO exchange with width of device if mobile and maxsize if desktop
const fieldSize: any = { width: 389, height: 802 };

const Field = ({ editable, handleDistance, isAwarded }: Props) => {
  const [position, setPosition] = useState<Position | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const [field, setField] = useState<DOMRect | null>(null);
  const [starPosition, setStarPosition] = useState<Position | null>(
    succesStartPosition
  );

  useEffect(() => {

    if (fieldRef.current) {
      const rect = fieldRef.current.getBoundingClientRect();
      console.log("Coordinates (left, top):", rect.left, rect.top);
      console.log("Dimensions (h,w):", rect.height, rect.width);
      setField(rect);
    }
  }, []);

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

  console.log("team", team);

  // TODO: handle any. Issues with TouchEventHandler not including clientX/Y
  const handleStagePointerDown = (e: any) => {
    if (field) {
      const { x, y } = handleDeviceEvent(e);

      if (x && y) {
        const clickedPosition = adjustCoords(x, y, field);
        setPosition(() => clickedPosition);
        handleDistance(
          Math.round(
            calculatePixelDistance(
              clickedPosition.x,
              clickedPosition.y,
              succesStartPosition.x,
              succesStartPosition.y
            )
          ),
          Math.round(
            calculatePercentageDistance(
              clickedPosition.x,
              clickedPosition.y,
              succesStartPosition.x,
              succesStartPosition.y,
              field
            )
          )
        );
      }
    }
  };

  return (
    <div ref={fieldRef}>
      <Stage
        width={fieldSize.width}
        height={fieldSize.height}
        onTouchStart={handleStagePointerDown}
        onClick={handleStagePointerDown}>
        <Sprite
          touchstart={handleTouchStart}
          pointerdown={handleClick}
          pointerover={handlePointerOver}
          image={"field.png"}
        />
        {team.map((o, index) => (
          <FieldItem
            key={index}
            type={"player"}
            number={o.number}
            position={o.position}
            color={o.color}
            editable={editable}
          />
        ))}
        <FieldItem
          type={"element"}
          element={"ball"}
          position={ballStartPosition}
          editable={editable}
        />
        {(editable || isAwarded) && (
          <FieldItem
            type={"element"}
            element={"star"}
            position={succesStartPosition}
            editable={editable}
          />
        )}
      </Stage>
    </div>
  );
};

export default Field;

// Ball movements
{
  /* <Stage
          width={389}
          height={802}
          onTouchStart={handleStagePointerDown}
          onClick={handleStagePointerDown}>
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
          //  <FieldItem4 position={succesStartPosition} />
          <ObjectMovement2
            startPosition={{ x: 40, y: 50 }}
            endPosition={{ x: 50, y: 160 }}
            step={step}
          />
        </Stage> */

  {
    /* <ObjectMovement
          step={toggle}
          startPosition={{ x: 140, y: 100 }}
          endPosition={{ x: 300, y: 300 }}
        /> */
  }
  {
    /* <FieldItems position={ballStartPosition} /> */
  }
  {
    /* <BallOrSuccess position={succesStartPosition} /> */
  }
  {
    /* <FieldItem position={succesStartPosition} /> */
  }
  {
    /* <Ball position={succesStartPosition} number={"2"} color={"blue"} /> */
  }

  {
    /* <FieldItem4 position={succesStartPosition} /> */
  }
}
