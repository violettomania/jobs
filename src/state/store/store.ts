import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import jobSlice from '../slices/jobSlice';
import jobsSlice from '../slices/jobsSlice';
import jobStatsSlice from '../slices/jobsStatsSlice';
import userSlice, {
  LoginState,
  RegisterState,
  UpdateState,
  UserState,
} from '../slices/userSlice';

const saveSubsetFilter = createTransform<
  UserState & RegisterState & LoginState & UpdateState,
  UserState & RegisterState & LoginState & UpdateState
>(
  (inboundState, key) => {
    if (key === 'user') {
      // remove error from user state
      const { error, ...stateWithoutError } = inboundState;
      return stateWithoutError;
    }
    return inboundState;
  },
  (outboundState) => {
    return outboundState;
  }
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'jobStats'],
  transforms: [saveSubsetFilter],
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
