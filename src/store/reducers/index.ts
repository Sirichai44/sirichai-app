// import { combineReducers } from 'redux';
import { combineSlices } from '@reduxjs/toolkit';

import authReducer from './authReducer';
import authApi from '../services/authService';
export default combineSlices({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer
});
