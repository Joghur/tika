"use client";

import React, { useState } from 'react';

import Field from './Field';

export type Role = "editor" | "admin" | "user";

const Stadium = () => {
  const role: Role = "editor";

  const [editable, setEditable] = useState(true);
  const [distance, setDistance] = useState<number | null>(null);
  const [distancePercent, setDistancePercent] = useState<number | null>(null);

  const handleToggleEdit = () => {
    setEditable((oldState) => !oldState);
  };

  const handleDistance = (distance: number, distancePercent: number) => {
    setDistance(() => distance);
    setDistancePercent(() => distancePercent);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-row justify-center gap-2 items-center p-4">
          <div>
            <button
              className="button ring-2 p-2 shadow-sm"
              onClick={handleToggleEdit}>
              {editable ? "Editor" : "User"}
            </button>
          </div>
          {distance && (
            <div>
              <p>Distance: {distance}</p>
            </div>
          )}
          {distancePercent && (
            <div>
              <p>Distance%: {distancePercent}</p>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <div className="mx-auto max-w-screen-lg">
            <Field editable={editable} handleDistance={handleDistance} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stadium;
