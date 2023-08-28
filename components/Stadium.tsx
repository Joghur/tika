"use client";

import { Fragment, useEffect, useState } from "react";

import { updateArray } from "@/utils/arrays";

import Field from "./Field";

export type Role = "editor" | "admin" | "user";

export interface FieldItemType {
  id?: string;
  type: string;
  step: number;
  number: string;
  positionX: number;
  positionY: number;
  color: string;
}

const fieldItemUrl = "api/fieldItems";

const Stadium = () => {
  const getTemplate = async () => {
    const res = await fetch(fieldItemUrl);

    if (!res.ok) {
      //TODO Error Boundary
      throw new Error("Failed to fetch data");
    }
    setFieldItems(await res.json());
  };

  const role: Role = "editor";

  const [editable, setEditable] = useState(true);
  const [distance, setDistance] = useState<number | null>(null);
  const [distancePercent, setDistancePercent] = useState<number | null>(null);
  const [isAwarded, setIsAwarded] = useState(false);
  const [step, setStep] = useState(0);
  const [fieldItems, setFieldItems] = useState<FieldItemType[] | null>(null);

  useEffect(() => {
    getTemplate();
  }, []);

  const handleSaveStep = () => {
    console.log("handleSaveStep");
    const method =
      fieldItems && fieldItems?.length > 0 && fieldItems[0].hasOwnProperty("id")
        ? "PUT"
        : "POST";

    const options = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fieldItems),
    };

    fetch(fieldItemUrl, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Data message", data.message);
      })
      .catch((err) => {
        console.log("Err when saving data", err);
      });
  };

  // console.log("fieldItems", fieldItems);

  const handleMovedPosition = (fieldItem: FieldItemType) => {
    // UPDATE array
    if (!fieldItems) return;
    const newArray = updateArray(fieldItem, fieldItems);

    if (newArray.length > 0) {
      setFieldItems(() => [...newArray]);
    }
  };

  const handleToggleEdit = () => {
    setEditable((oldState) => !oldState);
  };

  const handleDistance = (distance: number, distancePercent: number) => {
    setDistance(() => distance);
    setDistancePercent(() => 100 - distancePercent);
    if (distancePercent < 11) {
      setIsAwarded(() => true);
      setTimeout(() => {
        setIsAwarded(() => false);
      }, 3000);
    }
  };
  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-row justify-center gap-2 items-center p-4">
          <div>
            <button
              className="button ring-2 p-2 shadow-sm text-sm"
              onClick={handleToggleEdit}>
              {editable ? "Editor" : "User"}
            </button>
          </div>
          {editable && (
            <div>
              <button
                className="button ring-2 p-2 shadow-sm text-sm"
                onClick={handleSaveStep}>
                Save {step === 0 ? "Template" : step}
              </button>
            </div>
          )}
          <div className="flex flex-col items-center">
            <div>
              <p className="text-xs">
                {step === 0 ? "Template" : `Step ${step}`}
              </p>
            </div>
            {!editable && (
              <div className="flex flex-row space-x-3">
                {distance && (
                  <div>
                    <p className="text-xs">Distance: {distance}</p>
                  </div>
                )}
                {distancePercent && (
                  <div>
                    <p className="text-xs">Score: {distancePercent}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex-grow">
          <div className="mx-auto max-w-screen-lg">
            <Field
              fieldItems={fieldItems}
              editable={editable}
              handleDistance={handleDistance}
              handleMovedPosition={handleMovedPosition}
              isAwarded={isAwarded}
              step={step}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Stadium;
