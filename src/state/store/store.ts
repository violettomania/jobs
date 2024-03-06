import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import jobSlice from '../slices/jobSlice';
import jobsSlice from '../slices/jobsSlice';
import jobStatsSlice from '../slices/jobsStatsSlice';
import userSlice from '../slices/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'jobStats'],
};

const rootReducer = combineReducers({
  user: userSlice,
  jobs: jobsSlice,
  job: jobSlice,
  jobStats: jobStatsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
