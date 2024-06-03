import { RefObject } from 'react';
import { CanvasSize } from '../../state/canvasSizeSlice';

type DrawZoomedImage = (
  canvasRef: RefObject<HTMLCanvasElement>,
  canvasSize: CanvasSize,
  newSize: CanvasSize,
  imgPath: string,
) => void;

export const drawZoomedImage: DrawZoomedImage = (
  canvasRef,
  canvasSize,
  newSize,
  imgPath,
) => {
  if (!canvasRef.current) {
    return;
  }

  const context = canvasRef.current.getContext('2d');

  if (!context) {
    return;
  }

  const uploadedImage = new Image();
  uploadedImage.src = imgPath;
  uploadedImage.onload = () => {
    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;

    const imgWidth = newSize.width;
    const imgHeight = newSize.height;

    const x = (canvasWidth - imgWidth) / 2;
    const y = (canvasHeight - imgHeight) / 2;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(uploadedImage, x, y, imgWidth, imgHeight);
  };
};
