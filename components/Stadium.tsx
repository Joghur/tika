"use client";

import { useState } from 'react';

import Field from './Field';

export type Role = "editor" | "admin" | "user";

const Stadium = () => {
  const role: Role = "editor";

  const [editable, setEditable] = useState(true);
  const [distance, setDistance] = useState<number | null>(null);
  const [distancePercent, setDistancePercent] = useState<number | null>(null);
  const [isAwarded, setIsAwarded] = useState(false);

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
              <p>Score: {distancePercent}</p>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <div className="mx-auto max-w-screen-lg">
            <Field
              editable={editable}
              handleDistance={handleDistance}
              isAwarded={isAwarded}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stadium;
