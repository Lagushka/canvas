import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { canvasSize } from '../constants';
import { setImageSize } from '@/components/CoordsData/state/cursorDataSlice';
import { RefObject, useLayoutEffect, useState } from 'react';

type ShowImage = (canvasRef: RefObject<HTMLCanvasElement>) => void;

export const useDrawImage: ShowImage = (canvasRef) => {
  const dispatch = useAppDispatch();
  const filePath = useAppSelector((state) => state.uploadedFile.filePath);

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current.getContext('2d');

    if (context) {
      const uploadedImage = new Image();
      uploadedImage.src = filePath;
      uploadedImage.onload = () => {
        const imgWidth = uploadedImage.width;
        const imgHeight = uploadedImage.height;
        dispatch(setImageSize({ width: imgWidth, height: imgHeight }));

        const scale = Math.min(
          canvasSize.width / imgWidth,
          canvasSize.height / imgHeight,
        );
        const x = (canvasSize.width - imgWidth * scale) / 2;
        const y = (canvasSize.height - imgHeight * scale) / 2;

        context.clearRect(0, 0, canvasSize.width, canvasSize.height);
        context.drawImage(
          uploadedImage,
          x,
          y,
          uploadedImage.width * scale,
          uploadedImage.height * scale,
        );
      };
    }
  }, [canvasRef, dispatch, filePath]);

  return;
};
