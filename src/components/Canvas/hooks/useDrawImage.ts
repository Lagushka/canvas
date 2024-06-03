import {
  setImageSize,
  setInitialImageSize,
} from '@/components/ImageSizeControl/state/imageSizeSlice';
import { setZoom } from '@/components/RangeInput/state/zoomSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RefObject, useLayoutEffect } from 'react';

type ShowImage = (canvasRef: RefObject<HTMLCanvasElement>) => void;

export const useDrawImage: ShowImage = (canvasRef) => {
  const dispatch = useAppDispatch();
  const filePath = useAppSelector((state) => state.uploadedFile.filePath);
  const canvasSize = useAppSelector((state) => state.canvasSize.size);
  const initialImageSize = useAppSelector(
    (state) => state.imageSize.initialSize,
  );

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current.getContext('2d');

    if (context) {
      const uploadedImage = new Image();
      uploadedImage.src = filePath;
      uploadedImage.onload = () => {
        dispatch(setZoom(100));

        const imgWidth = uploadedImage.width;
        const imgHeight = uploadedImage.height;
        dispatch(setInitialImageSize({ width: imgWidth, height: imgWidth }));
        dispatch(setImageSize({ width: imgWidth, height: imgHeight }));

        const canvasWidth = canvasSize.width;
        const canvasHeight = canvasSize.height;

        if (imgWidth > canvasWidth || imgHeight > canvasHeight) {
          return;
        }

        const x = (canvasWidth - imgWidth) / 2;
        const y = (canvasHeight - imgHeight) / 2;

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(uploadedImage, x, y, imgWidth, imgHeight);
      };
    }
  }, [
    canvasRef,
    canvasSize.height,
    canvasSize.width,
    dispatch,
    filePath,
    initialImageSize.height,
    initialImageSize.width,
  ]);

  return;
};
