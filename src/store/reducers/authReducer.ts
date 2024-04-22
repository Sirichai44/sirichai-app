import * as types from '@/store/typings/auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: types.IStateAuth = {
  profile: {
    login: false,
    username: '',
    email: '',
    token: ''
  },
  current_info: {
    system: 'Windows',
    position: {
      latitude: 13.7590203, //set default th
      longitude: 100.5564029 //set default th
    },
    weather: {
      loading: true,
      weather: '',
      description: '',
      icon: '',
      temp: 0,
      feels_like: 0,
      humidity: 0,
      wind: { speed: 0, deg: 0 },
      clouds: 0,
      system: {
        country: '',
        name: '',
        sunrise: 0,
        sunset: 0,
        timezone: 0
      }
    }
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
    },
    setPosition: (state, action: PayloadAction<types.IPosition>) => {
      state.current_info.position = action.payload;
    },
    setSystem: (state, action: PayloadAction<string>) => {
      state.current_info.system = action.payload;
    },
    setWeather: (state, action: PayloadAction<types.IWeather>) => {
      state.current_info.weather = action.payload;
    }
  }
});

export const {
  setProfile,
  setSessionUser,
  clearSessionUser,
  setPosition,
  setLogin,
  setSystem,
  setWeather
} = authSlice.actions;

export default authSlice.reducer;
