'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { ModalButton } from './ui/ModalButton';
import { ImageSizeModal } from './ui/ImageSizeModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ImageSize, OnInputChange, ResizeMethod } from './types';
import { setImageSize } from './state/imageSizeSlice';
import { resizeImage } from './lib/resizeImage';
import { RadioChangeEvent } from 'antd';
import { oppositeSide } from './constants';
import { useUpdateDisplayedSize } from './hooks/useUpdateDisplayedSize';

export const ImageSizeControl: FC = () => {
  const imageSize = useAppSelector((state) => state.imageSize.size);
  const dispatch = useAppDispatch();
  useUpdateDisplayedSize();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [connectedResizing, setConnectedResizing] = useState<boolean>(false);

  const sizeDefaultValue: ImageSize = useMemo(
    () => ({
      percent: {
        width: 100,
        height: 100,
      },
      pixel: imageSize,
    }),
    [imageSize],
  );
  const [selectedImageSize, setSelectedImageSize] =
    useState<ImageSize>(sizeDefaultValue);

  const [resizeMethod, setResizeMethod] = useState<ResizeMethod>('pixel');

  useEffect(() => {
    setSelectedImageSize((prevSize) => ({ ...prevSize, pixel: imageSize }));
  }, [imageSize]);

  const onInputChange = useMemo<OnInputChange>(
    () => (side) => (value) => {
      setSelectedImageSize((prevSize) => {
        if (typeof value !== 'number') {
          return prevSize;
        }

        const otherSide = oppositeSide[side];
        const otherSideLength = sizeDefaultValue[resizeMethod][otherSide];
        const scale = value / sizeDefaultValue[resizeMethod][side];
        const newOtherSide = connectedResizing
          ? Math.round(otherSideLength * scale)
          : otherSideLength;

        return {
          ...prevSize,
          [resizeMethod]: {
            [otherSide]: newOtherSide,
            [side]: value,
          },
        };
      });
    },
    [connectedResizing, resizeMethod, sizeDefaultValue],
  );

  const onClickModalButton = () => {
    setModalVisible(true);
  };

  const onCancelModal = () => {
    setModalVisible(false);
    setSelectedImageSize({ ...sizeDefaultValue, pixel: imageSize });
  };

  const onOkModal = () => {
    setModalVisible(false);
    const newSize = resizeImage(
      selectedImageSize[resizeMethod],
      imageSize,
      resizeMethod,
    );
    dispatch(setImageSize(newSize));
    setSelectedImageSize({ ...sizeDefaultValue, pixel: imageSize });
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    setResizeMethod(e.target.value);
    setSelectedImageSize({ ...sizeDefaultValue, pixel: imageSize });
  };

  const onClickConnectingButton = () => {
    setConnectedResizing((prevState) => !prevState);
  };

  return (
    <div>
      <ModalButton onClick={onClickModalButton} />
      <ImageSizeModal
        onOk={onOkModal}
        onCancel={onCancelModal}
        open={modalVisible}
        selectedImageSize={selectedImageSize}
        imageSize={imageSize}
        onInputChange={onInputChange}
        onChangeRadio={onChangeRadio}
        resizeMethod={resizeMethod}
        connectedResizing={connectedResizing}
        onClickButton={onClickConnectingButton}
      />
    </div>
  );
};
