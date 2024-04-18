import { Middleware } from 'redux';
// import { createLogger } from "redux-logger";

import rootReducer from './reducers';
import useLogger from '@/hook/useLogger';
import { configureStore } from '@reduxjs/toolkit';
import authApi from './services/authService';
import { useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';

const logger = useLogger();

const middleware: Middleware[] = [logger, authApi.middleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});

type AppState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = (arg: ReturnType<typeof store.dispatch>) => store.dispatch(arg);
export default store;
