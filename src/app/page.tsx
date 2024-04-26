'use client';

import React, { useEffect, useRef } from 'react';
import styles from './page.module.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Controls } from '@/components/Controls/Controls';
import { setCursorCoords } from '@/components/CoordsData/state/cursorDataSlice';
import { getColor } from './lib/getColor';
import { getCoords } from './lib/getCoords';
import { canvasSize } from './constants';
import { Card } from 'antd';
import Title from 'antd/es/typography/Title';
import {
  selectColor,
  setColor,
} from '@/components/ColorData/state/colorDataSlice';
import { useDrawImage } from './hooks/useDrawImage';

export default function Home() {
  const cursorCoords = useAppSelector((state) => state.cursorData.coords);
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDrawImage(canvasRef);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.onmousemove = (event) => {
      if (!canvasRef.current) {
        return;
      }
      const coords = getCoords(canvasRef.current, event);
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
  }, [canvasRef, cursorCoords, dispatch]);

  return (
    <main className={styles.main}>
      <Title level={1}>Upload Image</Title>
      <div className={styles.imageBlock}>
        <Card>
          <canvas
            width={canvasSize.width}
            height={canvasSize.height}
            ref={canvasRef}
          ></canvas>
        </Card>
        <Controls />
      </div>
    </main>
  );
}
