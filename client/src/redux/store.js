import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './slices/imagesSlice';

/**
 * Redux Store
 */
export const store = configureStore({
  reducer: {
    images: imagesReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
});

export default store;