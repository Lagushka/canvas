'use client';

import { Card, Slider } from 'antd';
import { FC } from 'react';
import { marks } from './constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setZoom } from './state/zoomSlice';
import { setImageSize } from '../ImageSizeControl/state/imageSizeSlice';

type SliderChangeHandler = (value: number) => void;

export const RangeInput: FC = () => {
  const zoom = useAppSelector((state) => state.zoomState.zoom);
  const imageSize = useAppSelector((state) => state.imageSize.size);
  const dispatch = useAppDispatch();

  const onChangeSlider: SliderChangeHandler = (value) => {
    dispatch(setZoom(value));

    const width = Math.floor(imageSize.width * value);
    const height = Math.floor(imageSize.height * value);
    dispatch(setImageSize({ width, height }));
  };

  return (
    <Card style={{ width: 300 }}>
      <Slider
        onChange={onChangeSlider}
        marks={marks}
        value={zoom}
        min={12}
        max={300}
      />
    </Card>
  );
};
