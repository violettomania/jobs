import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../util/axiosWrapper';

interface FetchJobsArg {
  page?: number;
  searchTerm?: string;
  status?: string;
  jobType?: string;
  sort?: string;
  token: string;
}

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (
    { page, searchTerm, status, jobType, sort, token }: FetchJobsArg,
    thunkAPI
  ) => {
    let url = `/jobs?status=${status}&jobType=${jobType}&sort=${sort}&page=${page}`;
    if (searchTerm) {
      url = url + `&search=${searchTerm}`;
    }
    try {
      const response = await customFetch.get(url, {
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
