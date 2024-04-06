import { all, fork } from "redux-saga/effects";

import { rootHome } from "./home";
export default function* rootSaga() {
  yield all([fork(rootHome)]);
}
