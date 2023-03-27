import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './feacture/dataSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
