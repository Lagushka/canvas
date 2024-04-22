'use client';

import { useAppSelector } from '@/store/hooks';
import { Card } from 'antd';
import React from 'react';

export const CoordsData = () => {
  const cursorCoords = useAppSelector((state) => state.cursorData.coords);

  return (
    <Card title="Coordinates" bordered={false}>
      <div>x: {cursorCoords.x}</div>
      <div>y: {cursorCoords.y}</div>
    </Card>
  );
};
