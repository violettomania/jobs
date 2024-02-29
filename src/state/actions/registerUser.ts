import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RegistrationErrorResponse {
  response?: {
    data: {
      msg: string;
    };
  };
}

interface RegistrationSuccessResponse {
  user: User;
}

export const registerUser = createAsyncThunk(
  'user/register',
  async (user: { name: string; email: string; password: string }) => {
    try {
      const {
        data: { user: userData },
      }: { data: RegistrationSuccessResponse } = await axios.post(
        'https://jobify-prod.herokuapp.com/api/v1/toolkit/auth/register',
        user
      );
      return userData;
    } catch (error: unknown) {
      const err = error as RegistrationErrorResponse;
      if (err.response?.data.msg) {
        throw new Error(err.response.data.msg);
      } else {
        throw new Error('An error occurred');
      }
    }
  }
);
