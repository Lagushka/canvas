import { configureStore } from '@reduxjs/toolkit';

import uploadedFileReducer from '@/components/Controls/state/uploadedFileSlice';
import cursorCoordsReducer from '@/components/CursorInfo/state/cursorInfoSlice';

export const store = configureStore({
  reducer: {
    uploadedFile: uploadedFileReducer,
    cursorCoords: cursorCoordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
