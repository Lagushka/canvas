import { canvasSize } from '../constants';

type ShowImage = (context: CanvasRenderingContext2D, path: string) => void;

export const showImage: ShowImage = (context, path) => {
  const uploadedImage = new Image();
  uploadedImage.src = path;

  uploadedImage.onload = () => {
    const scale = Math.min(
      canvasSize.width / uploadedImage.width,
      canvasSize.height / uploadedImage.height,
    );
    const x = (canvasSize.width - uploadedImage.width * scale) / 2;
    const y = (canvasSize.height - uploadedImage.height * scale) / 2;

    context.clearRect(0, 0, canvasSize.width, canvasSize.height);
    context.drawImage(
      uploadedImage,
      x,
      y,
      uploadedImage.width * scale,
      uploadedImage.height * scale,
    );
  };
};
