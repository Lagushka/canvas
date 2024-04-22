import { RGBColor } from '@/components/ColorData/state/colorDataSlice';
import { Coords } from '@/components/CoordsData/state/cursorDataSlice';

type GetColor = (canvas: HTMLCanvasElement, coords: Coords) => RGBColor;

export const getColor: GetColor = (canvas, coords) => {
  const context = canvas.getContext('2d');
  if (!context) {
    return { r: 0, g: 0, b: 0, a: 0 };
  }
  const pixel = context.getImageData(coords.x, coords.y, 1, 1);
  const data = pixel.data;
  return { r: data[0], g: data[1], b: data[2], a: data[3] };
};
