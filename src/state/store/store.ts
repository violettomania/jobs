import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import jobStatsSlice from '../slices/jobsStatsSlice';
import userSlice, { UserState } from '../slices/userSlice';

// makes sure that state persists even after a page refresh
const SetTransform = createTransform(
  // transform state going to localStorage
  (inboundState: UserState, key) => {
    if (key === 'user' && typeof inboundState === 'object') {
      const inboundStateClone = { ...inboundState };
      const { user } = inboundStateClone;
      if (user && user.token) {
        Cookies.set('token', user.token, {
          secure: true,
          sameSite: 'Strict',
        });
      } else {
        Cookies.remove('token');
      }
      return inboundStateClone;
    }
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState: UserState, key) => {
    if (key === 'user' && typeof outboundState === 'object') {
      const jwt = Cookies.get('token');
      if (jwt && outboundState.user) {
        return {
          ...outboundState,
          user: { ...outboundState.user },
        };
      }
    }
    return outboundState;
  }
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'jobs'],
  transforms: [SetTransform],
};

const rootReducer = combineReducers({
  user: userSlice,
  jobs: jobStatsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
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
