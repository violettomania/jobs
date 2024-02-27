import { createSlice } from '@reduxjs/toolkit';

interface JobsState {}

const initialState: JobsState = {};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
});

export default jobsSlice.reducer;
