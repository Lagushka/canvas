import { configureStore } from '@reduxjs/toolkit';

import uploadedFileReducer from '@/components/Controls/state/uploadedFileSlice';
import cursorCoordsReducer from '@/components/CoordsData/state/cursorDataSlice';
import colorDataReducer from '@/components/ColorData/state/colorDataSlice';

export const store = configureStore({
  reducer: {
    uploadedFile: uploadedFileReducer,
    cursorData: cursorCoordsReducer,
    colorData: colorDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
