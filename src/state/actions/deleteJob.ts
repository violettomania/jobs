import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../util/axiosWrapper';

interface DeleteJobArg {
  jobId: string;
  token: string;
}

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async ({ jobId, token }: DeleteJobArg, thunkAPI) => {
    try {
      const response = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An error occurred');
    }
  }
);
