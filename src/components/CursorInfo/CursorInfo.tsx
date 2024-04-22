'use client';

import React, { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import styles from './CursorInfo.module.css';
import { Card } from 'antd';

export const CursorInfo = () => {
  const cursorCoords = useAppSelector((state) => state.cursorData.coords);

  return (
    <div className={styles.cursorInfo}>
      <Card title="Coordinates" bordered={false}>
        <div>x: {cursorCoords.x}</div>
        <div>y: {cursorCoords.y}</div>
      </Card>
    </div>
  );
};
