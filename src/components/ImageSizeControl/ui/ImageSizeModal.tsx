'use client';

import { CanvasSize } from '@/components/Canvas/state/canvasSizeSlice';
import { InputNumber, Modal, ModalProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { OnInputChange } from '../types';

type ImageSizeModalProps = Required<
  Pick<ModalProps, 'onOk' | 'onCancel' | 'open'>
> & {
  selectedImageSize: CanvasSize;
  onInputChange: OnInputChange;
};

export const ImageSizeModal: FC<ImageSizeModalProps> = (props) => {
  const { onOk, onCancel, open, selectedImageSize, onInputChange } = props;

  return (
    <Modal title="Resize image" onOk={onOk} onCancel={onCancel} open={open}>
      <InputNumber
        value={selectedImageSize.width}
        onChange={onInputChange('width')}
      />
      <span>
        {' '}
        <CloseOutlined />{' '}
      </span>
      <InputNumber
        value={selectedImageSize.height}
        onChange={onInputChange('height')}
      />
    </Modal>
  );
};
