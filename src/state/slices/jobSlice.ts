import { createSlice } from '@reduxjs/toolkit';

import { createJob } from '../actions/createJob';
import { deleteJob } from '../actions/deleteJob';
import { editJob } from '../actions/editJob';

interface JobState {
  job: Job;
  jobTypeOptions: string[];
  statusOptions: string[];
  isEditing: boolean;
  loading: boolean;
  jobDeleted: boolean;
  deleteError?: string;
}

const initialState: JobState = {
  job: {
    _id: '',
    position: '',
    company: '',
    jobLocation: '',
    jobType: '',
    createdAt: '',
    status: '',
  },
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  statusOptions: ['interview', 'declined', 'pending'],
  isEditing: false,
  loading: false,
  jobDeleted: false,
  deleteError: '',
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      // §state[name] = value;
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
      })
      .addCase(editJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        // TODO: add job
        state.loading = false;
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
