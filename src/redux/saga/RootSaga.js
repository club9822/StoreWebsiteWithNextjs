import {
  all, call, delay, put, take, takeLatest,
} from 'redux-saga/effects';

function* RootSaga() {
  yield all([
    // call(runClockSaga),
    // takeLatest(actionTypes.LOAD_DATA, loadDataSaga),
  ]);
}

export default RootSaga;
