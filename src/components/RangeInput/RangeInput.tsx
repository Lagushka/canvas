'use client';

import { Card, Slider } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setZoom } from './state/zoomSlice';
import { setDisplayedSize } from '../ImageSizeControl/state/imageSizeSlice';

type SliderChangeHandler = (value: number) => void;

export const RangeInput: FC = () => {
  const zoom = useAppSelector((state) => state.zoomState.zoom);
  const imageSize = useAppSelector((state) => state.imageSize.size);
  const canvasSize = useAppSelector((state) => state.canvasSize.size);
  const dispatch = useAppDispatch();

  const [maxZoomValue, setMaxZoomValue] = useState(300);

  useEffect(() => {
    if (
      canvasSize.width / imageSize.width < 3 ||
      canvasSize.height / imageSize.height < 3
    ) {
      const maxScale = Math.min(
        canvasSize.width / imageSize.width,
        canvasSize.height / imageSize.height,
      );
      setMaxZoomValue(Math.floor(maxScale * 100));
    } else {
      setMaxZoomValue(300);
    }
  }, [canvasSize.height, canvasSize.width, imageSize.height, imageSize.width]);

  const onChangeSlider: SliderChangeHandler = (value) => {
    dispatch(setZoom(value));
    const width = Math.floor((imageSize.width * value) / 100);
    const height = Math.floor((imageSize.height * value) / 100);
    console.log(value, imageSize, width, height);
    dispatch(setDisplayedSize({ width, height }));
  };

  const marks = {
    12: '12%',
    [maxZoomValue]: `${maxZoomValue}%`,
  };

  return (
    <Card style={{ width: 300 }}>
      <Slider
        onChange={onChangeSlider}
        marks={marks}
        value={zoom}
        min={12}
        max={maxZoomValue}
      />
    </Card>
  );
};
