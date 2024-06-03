import { getStateSetter } from '@/store/lib/getStateSetter';
import { createSlice } from '@reduxjs/toolkit';

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
    setFilePath: getStateSetter<UploadedFileState, 'filePath'>('filePath'),
  },
});

export const { setFilePath } = cursorCoordsSlice.actions;

export default cursorCoordsSlice.reducer;
