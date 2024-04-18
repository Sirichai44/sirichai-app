import { takeEvery } from 'redux-saga/effects';
import * as actions from '@/store/typings/auth/actions';

import * as saga from './fetch';

export function* rootAuth() {
  yield takeEvery(actions.CALL_REGISTER, saga.CallRegister);
}
