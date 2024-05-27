import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ZoomState = {
  zoom: number;
};

const initialState: ZoomState = {
  zoom: 100,
};

export const zoomSlice = createSlice({
  name: 'zoomState',
  initialState,
  reducers: {
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
  },
});

export const { setZoom } = zoomSlice.actions;

export default zoomSlice.reducer;
