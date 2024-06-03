import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RefObject, useEffect, useLayoutEffect, useState } from 'react';
import { interpolate } from './lib/interpolate';
import { drawZoomedImage } from './lib/drawZoomedImage';
import { disableZoomChanged } from '@/components/RangeInput/state/zoomSlice';

type ShowImage = (canvasRef: RefObject<HTMLCanvasElement>) => void;

export const useRedrawImage: ShowImage = (canvasRef) => {
  const dispatch = useAppDispatch();
  const filePath = useAppSelector((state) => state.uploadedFile.filePath);
  const canvasSize = useAppSelector((state) => state.canvasSize.size);
  const initialSize = useAppSelector((state) => state.imageSize.initialSize);
  const zoomChanged = useAppSelector((state) => state.zoomState.zoomChanged);
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
      prevSize.height === 0 ||
      (prevSize.width === displayedSize.width &&
        prevSize.height === displayedSize.height)
    ) {
      return;
    }

    if (zoomChanged) {
      drawZoomedImage(canvasRef, canvasSize, displayedSize, filePath);
      dispatch(disableZoomChanged());
    } else interpolate(canvasRef, prevSize, displayedSize);

    setPrevSize(displayedSize);
  }, [
    canvasRef,
    canvasSize,
    dispatch,
    displayedSize,
    filePath,
    prevSize,
    zoomChanged,
  ]);

  return;
};
