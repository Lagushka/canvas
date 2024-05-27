import { RefObject, useEffect } from 'react';
import { setCanvasSize } from '../state/canvasSizeSlice';
import { useAppDispatch } from '@/store/hooks';

type UseCanvasSize = (canvasRef: RefObject<HTMLCanvasElement>) => void;

type ComputePixelsSize = (propValue: string) => number;

const getComputedSize: ComputePixelsSize = (propValue) => {
  return Number(propValue.substring(0, propValue.length - 2));
};

export const useCanvasSize: UseCanvasSize = (canvasRef) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvasStyles = window.getComputedStyle(canvasRef.current);
    const width = getComputedSize(canvasStyles.width);
    const height = getComputedSize(canvasStyles.height);

    dispatch(setCanvasSize({ width, height }));
  }, [canvasRef, dispatch]);
};
