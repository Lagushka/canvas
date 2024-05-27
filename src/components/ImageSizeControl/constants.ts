import { ResizeMethod, Sides } from './types';

export const resizeMethods: ResizeMethod[] = ['pixel', 'percent'];

export const oppositeSide: Record<Sides, Sides> = {
  width: 'height',
  height: 'width',
};
