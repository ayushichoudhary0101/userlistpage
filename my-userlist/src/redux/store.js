

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducer/Auth/authReducer';

const store = configureStore({
  reducer: {
    users: authReducer, 
  }
});

export default store;

