import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ZoomState = {
  zoom: number;
  zoomChanged: boolean;
};

const initialState: ZoomState = {
  zoom: 100,
  zoomChanged: false,
};

export const zoomSlice = createSlice({
  name: 'zoomState',
  initialState,
  reducers: {
    setZoom: (state: ZoomState, action: PayloadAction<ZoomState['zoom']>) => {
      state.zoom = action.payload;
      state.zoomChanged = true;
    },
    disableZoomChanged: (state: ZoomState) => {
      state.zoomChanged = false;
    },
  },
});

export const { setZoom, disableZoomChanged } = zoomSlice.actions;

export default zoomSlice.reducer;
