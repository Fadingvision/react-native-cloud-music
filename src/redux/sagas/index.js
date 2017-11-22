import { take, put, call, fork, all } from 'redux-saga/effects'
import api from 'SERVICE';
import { SIGN_IN } from '../action/signin';

function* watchLogin() {
  while (true) { // eslint-disable-line
    const { phone, pwd } = yield take(SIGN_IN.REQUEST);
    try {
      yield call(api.signin, { phone, pwd });
      yield put({ type: SIGN_IN.SUCCESS })
    } catch (error) {
      yield put({ type: SIGN_IN.FAILURE, error })
    }
  }
}

export default function* root() {
  yield all([
    fork(watchLogin),
  ])
}
