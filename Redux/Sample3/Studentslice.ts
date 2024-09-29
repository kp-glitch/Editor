// src/store/studentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StudentState {
  studentCode: string | null;
  mode: 'view' | 'edit' | 'new';
}

const initialState: StudentState = {
  studentCode: null,
  mode: 'view',
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudent(state, action: PayloadAction<{ studentCode: string; mode: 'view' | 'edit' | 'new' }>) {
      state.studentCode = action.payload.studentCode;
      state.mode = action.payload.mode;
    },
    clearStudent(state) {
      state.studentCode = null;
      state.mode = 'view';
    },
  },
});

export const { setStudent, clearStudent } = studentSlice.actions;
export default studentSlice.reducer;
