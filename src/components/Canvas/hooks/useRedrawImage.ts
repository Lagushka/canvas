import { setImageSize } from '@/components/ImageSizeControl/state/imageSizeSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RefObject, useEffect, useLayoutEffect, useState } from 'react';
import { interpolate } from './lib/interpolate';

type ShowImage = (canvasRef: RefObject<HTMLCanvasElement>) => void;

export const useRedrawImage: ShowImage = (canvasRef) => {
  const dispatch = useAppDispatch();
  const filePath = useAppSelector((state) => state.uploadedFile.filePath);
  const canvasSize = useAppSelector((state) => state.canvasSize.size);
  const initialSize = useAppSelector((state) => state.imageSize.initialSize);
  const displayedSize = useAppSelector(
    (state) => state.imageSize.displayedSize,
  );

  const [prevSize, setPrevSize] = useState(initialSize);

  useEffect(() => {
    setPrevSize(initialSize);
  }, [initialSize]);

  useLayoutEffect(() => {
    let imgWidth = displayedSize.width;
    let imgHeight = displayedSize.height;

    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;

    if (
      imgWidth > canvasWidth ||
      imgHeight > canvasHeight ||
      imgWidth === 0 ||
      imgHeight === 0 ||
      prevSize.width === 0 ||
      prevSize.height === 0
    ) {
      return;
    }

    interpolate(canvasRef, prevSize, displayedSize);

    setPrevSize(displayedSize);
  }, [
    canvasRef,
    canvasSize,
    canvasSize.height,
    canvasSize.width,
    dispatch,
    displayedSize,
    filePath,
    prevSize,
  ]);

  return;
};
