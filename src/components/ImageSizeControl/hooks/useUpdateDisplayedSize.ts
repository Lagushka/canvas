import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { setDisplayedSize } from '../state/imageSizeSlice';

export const useUpdateDisplayedSize = () => {
  const imageSize = useAppSelector((state) => state.imageSize.size);
  const initialSize = useAppSelector((state) => state.imageSize.initialSize);
  const zoom = useAppSelector((state) => state.zoomState.zoom);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const width = Math.floor((imageSize.width * zoom) / 100);
    const height = Math.floor((imageSize.height * zoom) / 100);
    dispatch(setDisplayedSize({ width, height }));
  }, [dispatch, imageSize.height, imageSize.width, zoom]);
};
