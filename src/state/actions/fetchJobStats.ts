import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../util/axiosWrapper';
import getCookie from '../../util/getCookie';

export const fetchJobStats = createAsyncThunk(
  'jobs/fetchJobStats',
  async () => {
    const token = getCookie('token');
    try {
      const response = await customFetch.get('jobs/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      throw new Error('An error occurred');
    }
  }
);
