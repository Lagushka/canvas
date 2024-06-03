import { getStateSetter } from '@/store/lib/getStateSetter';
import { createSlice } from '@reduxjs/toolkit';

export type Coords = {
  x: number;
  y: number;
};

type CursorDataState = {
  coords: Coords;
};

const initialState: CursorDataState = {
  coords: {
    x: 0,
    y: 0,
  },
};

export const cursorDataSlice = createSlice({
  name: 'cursorData',
  initialState,
  reducers: {
    setCursorCoords: getStateSetter<CursorDataState, 'coords'>('coords'),
  },
});

export const { setCursorCoords } = cursorDataSlice.actions;

export default cursorDataSlice.reducer;
