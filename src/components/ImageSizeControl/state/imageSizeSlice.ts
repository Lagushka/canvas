import { CanvasSize } from '@/components/Canvas/state/canvasSizeSlice';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type cursorDataState = {
  size: CanvasSize;
};

const initialState: cursorDataState = {
  size: {
    width: 0,
    height: 0,
  },
};

export const cursorDataSlice = createSlice({
  name: 'imageSize',
  initialState,
  reducers: {
    setImageSize: (state, action: PayloadAction<CanvasSize>) => {
      state.size = action.payload;
    },
  },
});

export const { setImageSize } = cursorDataSlice.actions;

export default cursorDataSlice.reducer;
