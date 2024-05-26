import { Coords } from '@/components/CoordsData/state/cursorDataSlice';
import { CanvasSize } from '../state/canvasSizeSlice';

type GetCoords = (
  canvasSize: CanvasSize,
  canvas: HTMLCanvasElement,
  event: MouseEvent,
) => Coords;

export const getCoords: GetCoords = (canvasSize, canvas, event) => {
  const bbox = canvas.getBoundingClientRect();
  return {
    x: Math.round(event.clientX - bbox.left * (canvasSize.width / bbox.width)),
    y: Math.round(event.clientY - bbox.top * (canvasSize.height / bbox.height)),
  };
};
