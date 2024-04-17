import { applyMiddleware, createStore, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { createLogger } from "redux-logger";

import rootReducer from './reducers';
import useLogger from '@/hook/useLogger';
import rootSaga from './sagas/index';
// import { IRootState } from './typings/type';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const logger = useLogger();

const middleware: Middleware[] = [logger, sagaMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

//Run the saga
sagaMiddleware.run(rootSaga);

export default store;
