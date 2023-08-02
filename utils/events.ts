export const handleDeviceEvent = (e: any): { x: number; y: number } => {
  if (!e) throw new Error("No event registered");

  let x, y;

  if (e.type === "touchstart") {
    // Handle touch e
    const touch = e.touches[0];
    x = touch.clientX;
    y = touch.clientY;
  } else if (e.type === "click") {
    // Handle click e (desktop)
    x = e.clientX;
    y = e.clientY;
  }
  return { x, y };
};
