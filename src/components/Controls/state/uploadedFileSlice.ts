import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UploadedFileState = {
  filePath: string;
};

const initialState: UploadedFileState = {
  filePath: '/default.jpg',
};

export const cursorCoordsSlice = createSlice({
  name: 'cursorCoords',
  initialState,
  reducers: {
    setFilePath: (state, action: PayloadAction<string>) => {
      state.filePath = action.payload;
    },
  },
});

export const { setFilePath } = cursorCoordsSlice.actions;

export default cursorCoordsSlice.reducer;
