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
import { FieldItemType } from "./Stadium";

// TODO exchange with width of device if mobile and maxsize if desktop
const fieldSize: any = { width: 389, height: 802 };

interface Props {
  fieldItems: FieldItemType[] | null;
  isAwarded: boolean;
  editable: boolean;
  step: number;
  handleDistance: (distance: number, distancePercent: number) => void;
  handleMovedPosition: (arg0: any) => void;
}

const Field = ({
  fieldItems,
  editable,
  handleDistance,
  handleMovedPosition,
  isAwarded,
  step,
}: Props) => {
  // const [position, setPosition] = useState<Position | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const [field, setField] = useState<DOMRect | null>(null);
  // const [starPosition, setStarPosition] = useState<Position | null>(
  //   succesStartPosition
  // );

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

  // TODO: handle any. Issues with TouchEventHandler not including clientX/Y
  const handleStagePointerDown = (e: any) => {
    const succesStartPosition: any = { x: 100, y: 60 };

    const foundObject = fieldItems?.find((item) => item.type === "star");

    if (field && foundObject) {
      const { x, y } = handleDeviceEvent(e);

      if (x && y) {
        const clickedPosition = adjustCoords(x, y, field);
        // setPosition(() => clickedPosition);
        handleDistance(
          Math.round(
            calculatePixelDistance(
              clickedPosition.x,
              clickedPosition.y,
              foundObject.positionX,
              foundObject.positionY
            )
          ),
          Math.round(
            calculatePercentageDistance(
              clickedPosition.x,
              clickedPosition.y,
              foundObject.positionX,
              foundObject.positionY,
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
                  fieldItem={o}
                  editable={editable}
                  handleMovedPosition={handleMovedPosition}
                />
              );

            case "ball":
              return (
                <FieldItem
                  key={index}
                  fieldItem={o}
                  editable={editable}
                  handleMovedPosition={handleMovedPosition}
                />
              );

            case "star":
              return (
                (editable || isAwarded) && (
                  <FieldItem
                    key={index}
                    fieldItem={o}
                    editable={editable}
                    handleMovedPosition={handleMovedPosition}
                  />
                )
              );

            default:
              break;
          }
        })}
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
