'use client';

import { useAppSelector } from '@/store/hooks';
import { Card } from 'antd';
import React from 'react';

export const CoordsData = () => {
  const cursorCoords = useAppSelector((state) => state.cursorData.coords);
  const imageSize = useAppSelector(
    (state) => state.cursorData.initialImageSize,
  );

  return (
    <Card title="Coordinates" bordered={false}>
      <div>
        Image size: {imageSize.width}px x {imageSize.height}px
      </div>
      <div>x: {cursorCoords.x}</div>
      <div>y: {cursorCoords.y}</div>
    </Card>
  );
};
