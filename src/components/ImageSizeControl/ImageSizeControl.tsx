'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { ModalButton } from './ui/ModalButton';
import { ImageSizeModal } from './ui/ImageSizeModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CanvasSize } from '../Canvas/state/canvasSizeSlice';
import { OnInputChange } from './types';
import { setImageSize } from './state/imageSizeSlice';

export const ImageSizeControl: FC = () => {
  const imageSize = useAppSelector((state) => state.imageSize.size);
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImageSize, setSelectedImageSize] =
    useState<CanvasSize>(imageSize);

  useEffect(() => {
    setSelectedImageSize(imageSize);
  }, [imageSize]);

  const onInputChange = useMemo<OnInputChange>(
    () => (side) => (value) => {
      setSelectedImageSize({ ...selectedImageSize, [side]: value });
    },
    [selectedImageSize],
  );

  const onClickButton = () => {
    setModalVisible(true);
  };

  const onCancelModal = () => {
    setModalVisible(false);
    setSelectedImageSize(imageSize);
  };

  const onOkModal = () => {
    setModalVisible(false);
    dispatch(setImageSize(selectedImageSize));
  };

  return (
    <div>
      <ModalButton onClick={onClickButton} />
      <ImageSizeModal
        onOk={onOkModal}
        onCancel={onCancelModal}
        open={modalVisible}
        selectedImageSize={selectedImageSize}
        onInputChange={onInputChange}
      />
    </div>
  );
};
