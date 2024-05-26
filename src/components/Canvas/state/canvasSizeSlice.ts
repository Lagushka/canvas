import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CanvasSize = Pick<HTMLCanvasElement, 'width' | 'height'>;

const initialState: CanvasSize = {
  width: 0,
  height: 0,
};

export const canvasDataSlice = createSlice({
  name: 'canvasSize',
  initialState,
  reducers: {
    setCanvasSize: (state, action: PayloadAction<CanvasSize>) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

export const { setCanvasSize } = canvasDataSlice.actions;

export default canvasDataSlice.reducer;
