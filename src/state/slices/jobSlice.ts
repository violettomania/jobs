import { createSlice } from '@reduxjs/toolkit';

import { createJob } from '../actions/createJob';
import { deleteJob } from '../actions/deleteJob';

interface JobState {
  loading: boolean;
  jobDeleted: boolean;
  deleteError?: string;
}

const initialState: JobState = {
  loading: false,
  jobDeleted: false,
  deleteError: '',
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      //       state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: '',
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        state.jobDeleted = true;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.jobDeleted = false;
        state.deleteError = action.error.message;
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
