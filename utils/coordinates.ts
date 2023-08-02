export const adjustCoords = (x: number, y: number, field: DOMRect) => {
  if (!x || !y || !field) {
    return { x: 0, y: 0 };
  }
  return { x: x - field?.left, y: y - field?.top };
};

export const percentCoords = (x: number, y: number, field: DOMRect) => {
  if (!x || !y || !field) {
    return { x: 0, y: 0 };
  }
  return {
    x: (x - field.left) / field.width,
    y: (y - field.top) / field.height,
  };
};

// Calculate distance in pixels
export const calculatePixelDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

// Calculate distance in percentage
export const calculatePercentageDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  container: DOMRect
) => {
  const dx = (x2 - x1) / container.width;
  const dy = (y2 - y1) / container.height;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance * 100;
};
