import { getStateSetter } from '@/store/lib/getStateSetter';
import { createSlice } from '@reduxjs/toolkit';

export type CanvasSize = Pick<HTMLCanvasElement, 'width' | 'height'>;

type CanvasDataState = {
  size: CanvasSize;
};

const initialState: CanvasDataState = {
  size: { width: 0, height: 0 },
};

export const canvasDataSlice = createSlice({
  name: 'canvasSize',
  initialState,
  reducers: {
    setCanvasSize: getStateSetter<CanvasDataState, 'size'>('size'),
  },
});

export const { setCanvasSize } = canvasDataSlice.actions;

export default canvasDataSlice.reducer;
