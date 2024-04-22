import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Coords = {
  x: number;
  y: number;
};

type cursorDataState = {
  coords: Coords;
};

const initialState: cursorDataState = {
  coords: {
    x: 0,
    y: 0,
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
  },
});

export const { setCursorCoords } = cursorDataSlice.actions;

export default cursorDataSlice.reducer;
