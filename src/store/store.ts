import { configureStore } from '@reduxjs/toolkit';

import uploadedFileReducer from '@/components/Controls/state/uploadedFileSlice';
import cursorCoordsReducer from '@/components/CoordsData/state/cursorDataSlice';
import colorDataReducer from '@/components/ColorData/state/colorDataSlice';
import canvasSizeReducer from '@/components/Canvas/state/canvasSizeSlice';
import zoomReducer from '@/components/RangeInput/state/zoomSlice';
import imageSizeReducer from '@/components/ImageSizeControl/state/imageSizeSlice';

export const store = configureStore({
  reducer: {
    uploadedFile: uploadedFileReducer,
    cursorData: cursorCoordsReducer,
    colorData: colorDataReducer,
    canvasSize: canvasSizeReducer,
    zoomState: zoomReducer,
    imageSize: imageSizeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
