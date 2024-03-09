import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../util/axiosWrapper';

interface CreateJobArg {
  job: JobToCreate;
  token: string;
}

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async ({ job, token }: CreateJobArg, thunkAPI) => {
    try {
      const response = await customFetch.post('/jobs', job, {
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
