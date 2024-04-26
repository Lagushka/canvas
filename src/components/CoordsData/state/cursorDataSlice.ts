import { CanvasSize } from '@/app/constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Coords = {
  x: number;
  y: number;
};

type cursorDataState = {
  coords: Coords;
  initialImageSize: CanvasSize;
};

const initialState: cursorDataState = {
  coords: {
    x: 0,
    y: 0,
  },
  initialImageSize: {
    width: 0,
    height: 0,
  },
};

export const cursorDataSlice = createSlice({
  name: 'cursorData',
  initialState,
  reducers: {
    setCursorCoords: (state, action: PayloadAction<Coords>) => {
      const { x, y } = action.payload;
      state.coords = { x, y };
    },
    setImageSize: (state, action: PayloadAction<CanvasSize>) => {
      state.initialImageSize = action.payload;
    },
  },
});

export const { setCursorCoords, setImageSize } = cursorDataSlice.actions;

export default cursorDataSlice.reducer;
