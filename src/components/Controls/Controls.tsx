'use client';

import { useAppDispatch } from '@/store/hooks';
import { ChangeEventHandler, FC } from 'react';
import { setFilePath } from './state/uploadedFileSlice';
import { CursorInfo } from '../CursorInfo/CursorInfo';

export const Controls: FC = () => {
  const dispatch = useAppDispatch();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    if (!files?.length) return;
    console.log(URL.createObjectURL(files[0]));
    dispatch(setFilePath(URL.createObjectURL(files[0])));
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <CursorInfo />
    </div>
  );
};
