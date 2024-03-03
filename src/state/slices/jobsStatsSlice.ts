import { createSlice } from '@reduxjs/toolkit';

import { fetchJobStats } from '../actions/fetchJobStats';

interface JobsState {
  jobStats: JobStats;
  loading: boolean;
  error?: string;
}

const initialState: JobsState = {
  jobStats: {
    defaultStats: {
      pending: 0,
      interview: 0,
      declined: 0,
    },
    monthlyApplications: [],
  },
  loading: false,
  error: '',
};

export const jobsSlice = createSlice({
  name: 'jobStats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobStats.fulfilled, (state, action) => {
        state.jobStats = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
