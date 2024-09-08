import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adReducer from './adSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ads: adReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;