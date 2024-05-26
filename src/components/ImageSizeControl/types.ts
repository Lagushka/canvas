import { InputNumberProps } from 'antd';

export type OnInputChange = (
  side: 'width' | 'height',
) => InputNumberProps['onChange'];
