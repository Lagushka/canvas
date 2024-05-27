import { CanvasSize } from '@/components/Canvas/state/canvasSizeSlice';
import { ResizeMethod } from '../types';

type ResizeImage = (
  newSize: CanvasSize,
  imageSize: CanvasSize,
  method: ResizeMethod,
) => CanvasSize;

const resizingByMethod: Record<
  ResizeMethod,
  (value: number, sideLength: number) => number
> = {
  pixel: (value) => value,
  percent: (value, sideLength) => Math.floor((value * sideLength) / 100),
};

export const resizeImage: ResizeImage = (newSize, imageSize, method) => {
  const resize = resizingByMethod[method];
  const width = resize(newSize.width, imageSize.width);
  const height = resize(newSize.height, imageSize.height);
  return { width, height };
};
