'use client';

import { CanvasSize } from '@/components/Canvas/state/canvasSizeSlice';
import {
  Button,
  InputNumber,
  Modal,
  ModalProps,
  Radio,
  RadioChangeEvent,
} from 'antd';
import { LockFilled } from '@ant-design/icons';
import { UnlockOutlined } from '@ant-design/icons';
import Text from 'antd/es/typography/Text';
import { CSSProperties, FC, useMemo } from 'react';
import { ImageSize, OnInputChange, ResizeMethod } from '../types';
import Paragraph from 'antd/es/typography/Paragraph';
import { resizeMethods } from '../constants';

type ImageSizeModalProps = Required<
  Pick<ModalProps, 'onOk' | 'onCancel' | 'open'>
> & {
  selectedImageSize: ImageSize;
  imageSize: CanvasSize;
  onInputChange: OnInputChange;
  resizeMethod: ResizeMethod;
  onChangeRadio: (e: RadioChangeEvent) => void;
  connectedResizing: boolean;
  onClickButton: () => void;
};

const buttonStyle: CSSProperties = {
  border: 'none',
};

export const ImageSizeModal: FC<ImageSizeModalProps> = (props) => {
  const {
    onOk,
    onCancel,
    open,
    selectedImageSize,
    imageSize,
    onInputChange,
    resizeMethod,
    onChangeRadio,
    connectedResizing,
    onClickButton,
  } = props;

  const getSizeAfterChanging = useMemo<string>(() => {
    const pixelSize = selectedImageSize['pixel'];
    const percentSize = selectedImageSize['percent'];
    const width = (pixelSize.width * percentSize.width) / 100;
    const height = (pixelSize.height * percentSize.height) / 100;

    return ((width * height) / 1000000).toFixed(2);
  }, [selectedImageSize]);

  return (
    <Modal title="Resize image" onOk={onOk} onCancel={onCancel} open={open}>
      <Paragraph>
        <Radio.Group value={resizeMethod} onChange={onChangeRadio}>
          {resizeMethods.map((method) => (
            <Radio key={method} value={method}>
              {method}
            </Radio>
          ))}
        </Radio.Group>
      </Paragraph>
      <Paragraph>
        <InputNumber
          value={selectedImageSize[resizeMethod].width}
          onChange={onInputChange('width')}
        />
        <Button style={buttonStyle} onClick={onClickButton}>
          {connectedResizing ? <LockFilled /> : <UnlockOutlined />}
        </Button>
        <InputNumber
          value={selectedImageSize[resizeMethod].height}
          onChange={onInputChange('height')}
        />
      </Paragraph>
      <div>
        <Paragraph>
          <Text>Before: </Text>
          <Text strong>
            {((imageSize.width * imageSize.height) / 1000000).toFixed(2)}MP
          </Text>
        </Paragraph>
        <Paragraph>
          <Text>After: </Text>
          <Text strong>{getSizeAfterChanging}MP</Text>
        </Paragraph>
      </div>
    </Modal>
  );
};
