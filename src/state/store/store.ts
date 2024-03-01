import { configureStore } from '@reduxjs/toolkit';

import jobsSlice from '../slices/jobsSlice';
import sidebarSlice from '../slices/sidebarSlice';
import userSlice from '../slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    jobs: jobsSlice,
    sidebar: sidebarSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
