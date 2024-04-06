import { takeEvery } from "redux-saga/effects";

import * as Actions from "@/store/actions/action.ts";
import { helloSaga } from "./fetch";

export function* rootHome() {
  yield takeEvery(Actions.TEST_HELLO_SAGA, helloSaga);
}
