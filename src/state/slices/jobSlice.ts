import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
  addJobSuccess: boolean;
  addJobError: boolean;
  deleteJobSuccess: boolean;
  deleteJobError: boolean;
  editJobSuccess: boolean;
  editJobError: boolean;
  editedJobId: string;
}

const initialState: JobState = {
  _id: '',
  position: '',
  company: '',
  jobLocation: '',
  jobType: 'full-time',
  createdAt: '',
  status: 'interview',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  statusOptions: ['interview', 'declined', 'pending'],
  isEditing: false,
  loading: false,
  addJobSuccess: false,
  addJobError: false,
  deleteJobSuccess: false,
  deleteJobError: false,
  editJobSuccess: false,
  editJobError: false,
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
      })
      .addCase(createJob.fulfilled, (state) => {
        state.addJobSuccess = true;
        state.loading = false;
      })
      .addCase(createJob.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteJob.fulfilled, (state) => {
        state.deleteJobSuccess = true;
      })
      .addCase(deleteJob.rejected, (state) => {
        state.deleteJobSuccess = false;
        state.deleteJobError = true;
      })
      .addCase(editJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.loading = false;
        state.editJobSuccess = true;
      })
      .addCase(editJob.rejected, (state) => {
        state.loading = false;
        state.editJobError = true;
      });
  },
});

export const { handleJobChange, clearValues, flagJobAsBeingEdited } =
  jobSlice.actions;

export default jobSlice.reducer;
