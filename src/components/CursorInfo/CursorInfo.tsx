'use client';

import React, { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import styles from './CursorInfo.module.css';

export const CursorInfo = () => {
  const cursorCoords = useAppSelector((state) => state.cursorCoords.coords);
  const pixelColor = useAppSelector((state) => state.cursorCoords.color);

  const styledRGBColor = useMemo<string>(() => {
    return `rgb(${pixelColor.r} ${pixelColor.g} ${pixelColor.b} / ${
      pixelColor.a / 255
    })`;
  }, [pixelColor]);

  return (
    <div className={styles.cursorInfo}>
      <div className={styles.coords}>
        <span>x: {cursorCoords.x}</span>
        <span>y: {cursorCoords.y}</span>
      </div>
      <span
        className={styles.color}
        style={{ backgroundColor: styledRGBColor }}
      ></span>
    </div>
  );
};
