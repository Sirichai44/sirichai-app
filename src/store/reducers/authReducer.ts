import * as types from '@/store/typings/auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: types.IStateAuth = {
  profile: {
    login: false,
    username: '',
    email: '',
    token: ''
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<types.IAuthProfile>) => {
      state.profile = action.payload;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.profile.login = action.payload;
    },
    setSessionUser: (_, action: PayloadAction<string>) => {
      localStorage.setItem('token', action.payload);
    },
    clearSessionUser: (state) => {
      localStorage.removeItem('token');
      state.profile = initialState.profile;
    }
  }
});

export const { setProfile, setSessionUser, clearSessionUser } = authSlice.actions;
export default authSlice.reducer;
