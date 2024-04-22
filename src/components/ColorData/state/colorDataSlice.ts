import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type RGBColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type colorDataState = {
  color: RGBColor;
  selectedColor: RGBColor;
};

const initialState: colorDataState = {
  color: {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  },
  selectedColor: {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  },
};

export const colorDataSlice = createSlice({
  name: 'colorData',
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<RGBColor>) => {
      state.color = { ...action.payload };
    },
    selectColor: (state, action: PayloadAction<RGBColor>) => {
      state.selectedColor = { ...action.payload };
    },
  },
});

export const { setColor, selectColor } = colorDataSlice.actions;

export default colorDataSlice.reducer;
