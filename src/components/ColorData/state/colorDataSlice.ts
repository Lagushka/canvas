import { getStateSetter } from '@/store/lib/getStateSetter';
import { createSlice } from '@reduxjs/toolkit';

export type RGBColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type ColorDataState = {
  color: RGBColor;
  selectedColor: RGBColor;
};

const initialState: ColorDataState = {
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
    setColor: getStateSetter<ColorDataState, 'color'>('color'),
    selectColor: getStateSetter<ColorDataState, 'selectedColor'>(
      'selectedColor',
    ),
  },
});

export const { setColor, selectColor } = colorDataSlice.actions;

export default colorDataSlice.reducer;
