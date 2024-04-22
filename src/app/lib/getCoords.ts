import { Coords } from '@/components/CoordsData/state/cursorDataSlice';

type GetCoords = (canvas: HTMLCanvasElement, event: MouseEvent) => Coords;

export const getCoords: GetCoords = (canvas, event) => {
  const bbox = canvas.getBoundingClientRect();
  return {
    x: Math.round(event.clientX - bbox.left * (canvas.width / bbox.width)),
    y: Math.round(event.clientY - bbox.top * (canvas.height / bbox.height)),
  };
};
