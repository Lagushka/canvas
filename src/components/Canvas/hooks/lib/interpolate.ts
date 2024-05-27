import { RefObject } from 'react';
import { CanvasSize } from '../../state/canvasSizeSlice';

type Interpolate = (
  canvasRef: RefObject<HTMLCanvasElement>,
  prevSize: CanvasSize,
  newSize: CanvasSize,
) => void;

export const interpolate: Interpolate = (canvasRef, prevSize, newSize) => {
  if (!canvasRef.current) {
    return;
  }
  const context = canvasRef.current.getContext('2d');

  if (!context) {
    return;
  }

  const canvasWidth = canvasRef.current.width;
  const canvasHeight = canvasRef.current.height;
  const { width: imgWidth, height: imgHeight } = prevSize;
  const x = (canvasWidth - imgWidth) / 2;
  const y = (canvasHeight - imgHeight) / 2;

  const imageData = context.getImageData(x, y, imgWidth, imgHeight);
  const data = imageData.data;

  const { width: newWidth, height: newHeight } = newSize;
  console.log('old', x, y, imgWidth, imgHeight);
  console.log('new', newWidth, newHeight);
  const newImageData = new ImageData(newWidth, newHeight);
  const newData = newImageData.data;
  console.log(newData.length);

  for (let i = 0; i < newWidth; i++) {
    for (let j = 0; j < newHeight; j++) {
      const nearestElemX = Math.floor((imgWidth / newWidth) * i);
      const nearestElemY = Math.floor((imgHeight / newHeight) * j);
      const nearestElemIndex = (nearestElemY * imgWidth + nearestElemX) * 4;
      const newImageIndex = (j * newWidth + i) * 4;
      for (let k = 0; k < 4; k++) {
        newData[newImageIndex + k] = data[nearestElemIndex + k];
      }
    }
  }

  context.clearRect(0, 0, canvasWidth, canvasHeight);

  const newX = (canvasWidth - newWidth) / 2;
  const newY = (canvasHeight - newHeight) / 2;
  context.putImageData(newImageData, newX, newY);
};
