import { CanvasSize } from '@/components/Canvas/state/canvasSizeSlice';
import { getStateSetter } from '@/store/lib/getStateSetter';
import { createSlice } from '@reduxjs/toolkit';

type cursorDataState = {
  size: CanvasSize;
  initialSize: CanvasSize;
  displayedSize: CanvasSize;
};

const initialState: cursorDataState = {
  size: {
    width: 0,
    height: 0,
  },
  initialSize: {
    width: 0,
    height: 0,
  },
  displayedSize: {
    width: 0,
    height: 0,
  },
};

export const cursorDataSlice = createSlice({
  name: 'imageSize',
  initialState,
  reducers: {
    setImageSize: getStateSetter<cursorDataState, 'size', CanvasSize>('size'),
    setInitialImageSize: getStateSetter<
      cursorDataState,
      'initialSize',
      CanvasSize
    >('initialSize'),
    setDisplayedSize: getStateSetter<
      cursorDataState,
      'displayedSize',
      CanvasSize
    >('displayedSize'),
  },
});

export const { setImageSize, setInitialImageSize, setDisplayedSize } =
  cursorDataSlice.actions;

export default cursorDataSlice.reducer;
