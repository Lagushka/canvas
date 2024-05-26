'use client';

import React, { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useDrawImage } from './hooks/useDrawImage';
import { getCoords } from './lib/getCoords';
import { setCursorCoords } from '@/components/CoordsData/state/cursorDataSlice';
import { getColor } from './lib/getColor';
import {
  selectColor,
  setColor,
} from '@/components/ColorData/state/colorDataSlice';
import styles from './Canvas.module.css';
import { useCanvasSize } from './hooks/useCanvasSize';

export const Canvas: FC = () => {
  const cursorCoords = useAppSelector((state) => state.cursorData.coords);
  const canvasSize = useAppSelector((state) => state.canvasSize);
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDrawImage(canvasRef);
  useCanvasSize(canvasRef);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.onmousemove = (event) => {
      if (!canvasRef.current) {
        return;
      }
      const coords = getCoords(canvasSize, canvasRef.current, event);
      if (coords.x === cursorCoords.x && coords.y === cursorCoords.y) {
        return;
      }
      dispatch(setCursorCoords(coords));

      const color = getColor(canvasRef.current, coords);
      dispatch(setColor(color));
    };

    canvasRef.current.onclick = () => {
      if (!canvasRef.current) {
        return;
      }

      const color = getColor(canvasRef.current, cursorCoords);
      dispatch(selectColor(color));
    };
  }, [canvasRef, canvasSize, cursorCoords, dispatch]);

  return (
    <canvas
      width={canvasSize.width}
      height={canvasSize.height}
      className={styles.canvas}
      ref={canvasRef}
    />
  );
};
