import { createSlice } from '@reduxjs/toolkit';

import { fetchJobStats } from '../actions/fetchJobStats';

interface JobStatsState {
  jobStats: JobStats;
  loading: boolean;
  error: boolean;
}

const initialState: JobStatsState = {
  jobStats: {
    defaultStats: {
      pending: 0,
      interview: 0,
      declined: 0,
    },
    monthlyApplications: [],
  },
  loading: false,
  error: false,
};

export const jobStatsSlice = createSlice({
  name: 'jobStats',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobStats.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchJobStats.fulfilled, (state, action) => {
        state.jobStats = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchJobStats.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetError } = jobStatsSlice.actions;

export default jobStatsSlice.reducer;
