import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

import { createJob } from '../actions/createJob';
import { deleteJob } from '../actions/deleteJob';
import { editJob } from '../actions/editJob';

export interface JobState {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  createdAt: string;
  status: string;
  jobTypeOptions: string[];
  statusOptions: string[];
  isEditing: boolean;
  loading: boolean;
  jobAdded: boolean;
  jobDeleted: boolean;
  deleteError?: string;
  editedJobId: string;
}

const initialState: JobState = {
  _id: '',
  position: '',
  company: '',
  jobLocation: '',
  jobType: '',
  createdAt: '',
  status: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  statusOptions: ['interview', 'declined', 'pending'],
  isEditing: false,
  loading: false,
  jobAdded: false,
  jobDeleted: false,
  deleteError: '',
  editedJobId: '',
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleJobChange: (
      state,
      action: PayloadAction<{
        name: keyof JobState;
        value: JobState[keyof JobState];
      }>
    ) => {
      (state as any)[action.payload.name] = action.payload.value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: '',
      };
    },
    flagJobAsBeingEdited: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.jobAdded = false;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.jobAdded = true;
        state.loading = false;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.jobAdded = false;
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

export const { handleJobChange, clearValues, flagJobAsBeingEdited } =
  jobSlice.actions;

export default jobSlice.reducer;
