'use client';

import { useAppSelector } from '@/store/hooks';
import { Card, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import styles from './ColorData.module.css';
import classNames from 'classnames';

type ColorFormats = {
  rgba: string;
  hex: string;
};

const colorInitialValue: ColorFormats = {
  rgba: '',
  hex: '',
};

const { Text } = Typography;

export const ColorData = () => {
  const pixelColor = useAppSelector((state) => state.colorData.color);
  const selectedPixelColor = useAppSelector(
    (state) => state.colorData.selectedColor,
  );
  const [currentColor, setCurrentColor] = useState<string>('');
  const [selectedColor, setSelectedColor] =
    useState<ColorFormats>(colorInitialValue);

  useEffect(() => {
    const { r, g, b, a } = selectedPixelColor;
    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    const hex = `#${r.toString(16)}${g.toString(16)}${b.toString(
      16,
    )}${a.toString(16)}`;
    setSelectedColor({ rgba, hex });
  }, [selectedPixelColor]);

  useEffect(() => {
    const { r, g, b, a } = pixelColor;
    setCurrentColor(`rgba(${r}, ${g}, ${b}, ${a})`);
  }, [pixelColor]);

  return (
    <Card title="Colors" bordered={false}>
      <Space size="large">
        <Space direction="vertical" size="middle">
          <div
            className={classNames(styles.color, styles.currentColor)}
            style={{ backgroundColor: currentColor }}
          />
          <div
            className={classNames(styles.color, styles.selectedColor)}
            style={{ backgroundColor: selectedColor.rgba }}
          />
        </Space>
        <Space direction="vertical" size="middle">
          <span>
            <Text>RGBA: </Text>
            <Text copyable>{selectedColor.rgba}</Text>
          </span>
          <span>
            <Text>HEX: </Text>
            <Text copyable>{selectedColor.hex}</Text>
          </span>
        </Space>
      </Space>
    </Card>
  );
};
