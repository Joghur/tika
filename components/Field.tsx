"use client";

import { useEffect, useRef, useState } from "react";

import {
  adjustCoords,
  calculatePercentageDistance,
  calculatePixelDistance,
} from "@/utils/coordinates";
import { handleDeviceEvent } from "@/utils/events";
import { Sprite, Stage } from "@pixi/react";

import FieldItem from "./FieldItem";

// TODO exchange with width of device if mobile and maxsize if desktop
const fieldSize: any = { width: 389, height: 802 };

export interface FieldItemType {
  type: string;
  step: number;
  number: string;
  positionX: number;
  positionY: number;
  color: string;
}

interface Props {
  isAwarded: boolean;
  editable: boolean;
  handleDistance: (distance: number, distancePercent: number) => void;
}

const Field = ({ editable, handleDistance, isAwarded }: Props) => {
  const getTemplate = async () => {
    const res = await fetch("http://localhost:3000/api/fieldItems/template");

    if (!res.ok) {
      //TODO  Error Boundary
      throw new Error("Failed to fetch data");
    }
    setFieldItems(await res.json());
  };

  // const [position, setPosition] = useState<Position | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const [field, setField] = useState<DOMRect | null>(null);
  const [fieldItems, setFieldItems] = useState<FieldItemType[] | null>(null);
  // const [starPosition, setStarPosition] = useState<Position | null>(
  //   succesStartPosition
  // );

  console.log("fieldItems", fieldItems);

  useEffect(() => {
    if (fieldRef.current) {
      const rect = fieldRef.current.getBoundingClientRect();
      console.log("Coordinates (left, top):", rect.left, rect.top);
      console.log("Dimensions (h,w):", rect.height, rect.width);
      setField(rect);
    }
    getTemplate();
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

  // TODO: handle any. Issues with TouchEventHandler not including clientX/Y
  const handleStagePointerDown = (e: any) => {
    const succesStartPosition: any = { x: 100, y: 60 };

    if (field) {
      const { x, y } = handleDeviceEvent(e);

      if (x && y) {
        const clickedPosition = adjustCoords(x, y, field);
        // setPosition(() => clickedPosition);
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
        {fieldItems?.map((o, index) => {
          switch (o.type) {
            case "player":
              return (
                <FieldItem
                  key={index}
                  type={o.type}
                  number={o.number}
                  positionX={o.positionX}
                  positionY={o.positionY}
                  color={o.color}
                  editable={editable}
                />
              );

            case "ball":
              return (
                <FieldItem
                  key={index}
                  type={o.type}
                  number={o.number}
                  positionX={o.positionX}
                  positionY={o.positionY}
                  color={o.color}
                  editable={editable}
                />
              );

            case "star":
              return (
                (editable || isAwarded) && (
                  <FieldItem
                    key={index}
                    type={o.type}
                    number={o.number}
                    positionX={o.positionX}
                    positionY={o.positionY}
                    color={o.color}
                    editable={editable}
                  />
                )
              );

            default:
              break;
          }
        })}

        {/*<FieldItem
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
        )} */}
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
