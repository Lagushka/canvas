'use client';

import { useAppDispatch } from '@/store/hooks';
import { ChangeEventHandler, FC } from 'react';
import { setFilePath } from './state/uploadedFileSlice';
import { Card, Space } from 'antd';
import { CoordsData } from '../CoordsData/CoordsData';
import { ColorData } from '../ColorData/ColorData';

import styles from './Controls.module.css';

export const Controls: FC = () => {
  const dispatch = useAppDispatch();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    if (!files?.length) return;
    console.log(URL.createObjectURL(files[0]));
    dispatch(setFilePath(URL.createObjectURL(files[0])));
  };

  return (
    <Space direction="vertical" size="middle" className={styles.controls}>
      <Card>
        <input type="file" onChange={handleChange} />
      </Card>
      <CoordsData />
      <ColorData />
    </Space>
  );
};
