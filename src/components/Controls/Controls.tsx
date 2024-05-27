'use client';

import { useAppDispatch } from '@/store/hooks';
import { ChangeEventHandler, FC } from 'react';
import { setFilePath } from './state/uploadedFileSlice';
import { Card, Space } from 'antd';
import { CoordsData } from '../CoordsData/CoordsData';
import { ColorData } from '../ColorData/ColorData';

import styles from './Controls.module.css';
import { RangeInput } from '../RangeInput/RangeInput';
import { ImageSizeControl } from '../ImageSizeControl/ImageSizeControl';
import { setInitialImageSize } from '../ImageSizeControl/state/imageSizeSlice';

export const Controls: FC = () => {
  const dispatch = useAppDispatch();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    if (!files?.length) return;
    const newPath = URL.createObjectURL(files[0]);
    console.log(newPath);
    const uploadedImage = new Image();
    uploadedImage.src = newPath;
    uploadedImage.onload = () => {
      dispatch(
        setInitialImageSize({
          width: uploadedImage.width,
          height: uploadedImage.height,
        }),
      );
    };
    dispatch(setFilePath(newPath));
  };

  return (
    <Space direction="horizontal" size="large" className={styles.controls}>
      <Card>
        <input type="file" onChange={handleChange} />
      </Card>
      <CoordsData />
      <ColorData />
      <RangeInput />
      <ImageSizeControl />
    </Space>
  );
};
