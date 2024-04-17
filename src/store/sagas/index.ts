import { all, fork } from 'redux-saga/effects';

import { rootAuth } from './auth';

export default function* rootSaga() {
  yield all([fork(rootAuth)]);
}
