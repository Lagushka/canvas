'use client';

import { Button } from 'antd';
import { FC } from 'react';

type ButtonProps = {
  onClick: () => void;
};

export const ModalButton: FC<ButtonProps> = (props) => {
  const { onClick } = props;

  return (
    <Button type="primary" onClick={onClick}>
      Resize image
    </Button>
  );
};
