import { configureStore } from '@reduxjs/toolkit';

import jobStatsSlice from '../slices/jobsStatsSlice';
import userSlice from '../slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    jobs: jobStatsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
