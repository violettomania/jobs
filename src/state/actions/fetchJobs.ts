import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../util/axiosWrapper';

interface FetchJobsArg {
  page: number;
  search: boolean;
  searchStatus: string;
  searchType: string;
  sort: string;
  token: string;
}

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobStats',
  async (
    { page, search, searchStatus, searchType, sort, token }: FetchJobsArg,
    thunkAPI
  ) => {
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
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
