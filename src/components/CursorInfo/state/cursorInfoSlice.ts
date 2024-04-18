import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Coords = {
  x: number;
  y: number;
};

type RGBColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type cursorInfoState = {
  coords: Coords;
  color: RGBColor;
};

const initialState: cursorInfoState = {
  coords: {
    x: 0,
    y: 0,
  },
  color: {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  },
};

export const cursorCoordsSlice = createSlice({
  name: 'cursorCoords',
  initialState,
  reducers: {
    setCursorCoords: (state, action: PayloadAction<Coords>) => {
      const { x, y } = action.payload;
      state.coords = { x, y };
    },
    setColor: (state, action: PayloadAction<RGBColor>) => {
      state.color = { ...action.payload };
    },
  },
});

export const { setCursorCoords, setColor } = cursorCoordsSlice.actions;

export default cursorCoordsSlice.reducer;
