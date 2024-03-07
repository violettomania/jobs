import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../util/axiosWrapper';

interface CreateJobArg {
  company: string;
  jobLocation: string;
  jobType: string;
  position: string;
  status: string;
  token: string;
}

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (
    { company, jobLocation, jobType, position, status, token }: CreateJobArg,
    thunkAPI
  ) => {
    try {
      const job = { company, jobLocation, jobType, position, status };
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
