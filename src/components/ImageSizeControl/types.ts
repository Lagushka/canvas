import { InputNumberProps } from 'antd';
import { CanvasSize } from '../Canvas/state/canvasSizeSlice';

export type Sides = 'width' | 'height';

export type OnInputChange = (side: Sides) => InputNumberProps['onChange'];

export type ResizeMethod = 'pixel' | 'percent';

export type ImageSize = Record<ResizeMethod, CanvasSize>;
