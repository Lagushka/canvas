'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Controls } from '@/components/Controls/Controls';
import {
  setColor,
  setCursorCoords,
} from '@/components/CursorInfo/state/cursorInfoSlice';

type CanvasSize = Pick<HTMLCanvasElement, 'width' | 'height'>;

const canvasSize: CanvasSize = {
  width: 600,
  height: 400,
};

type ShowImage = (context: CanvasRenderingContext2D, path: string) => void;

const showImage: ShowImage = (context, path) => {
  const uploadedImage = new Image();
  uploadedImage.src = path;

  uploadedImage.onload = () => {
    console.log(context);
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

function windowToCanvas(canvas: HTMLCanvasElement, x: number, y: number) {
  var bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height),
  };
}

export default function Home() {
  const filePath = useAppSelector((state) => state.uploadedFile.filePath);
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !filePath) {
      return;
    }

    canvasRef.current.onmousemove = (event) => {
      if (!canvasRef.current) {
        return;
      }
      const cursorLocation = windowToCanvas(
        canvasRef.current,
        event.clientX,
        event.clientY,
      );

      const context = canvasRef.current.getContext('2d');

      if (!context) {
        return;
      }

      const pixel = context.getImageData(
        cursorLocation.x,
        cursorLocation.y,
        1,
        1,
      );
      const data = pixel.data;
      dispatch(setColor({ r: data[0], g: data[1], b: data[2], a: data[3] }));

      dispatch(setCursorCoords(cursorLocation));
    };
  }, [canvasRef, dispatch, filePath]);

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current.getContext('2d');

    if (context) {
      showImage(context, filePath);
    }
  }, [filePath]);

  return (
    <main className={styles.main}>
      <h1>Upload Image</h1>
      <div className={styles.imagePanel}>
        <canvas
          width={canvasSize.width}
          height={canvasSize.height}
          ref={canvasRef}
        ></canvas>
        <Controls />
      </div>
    </main>
  );
}
