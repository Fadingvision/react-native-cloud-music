import { take, put, call, fork, all, takeLatest } from 'redux-saga/effects'
import api from 'SERVICE';
import { SIGN_IN } from '../actions/signin';

function* watchLogin(action) {
  try {
    const { phone, password } = action;
    const userInfo = yield call(api.signin, { phone, password });
    yield put({ type: SIGN_IN.SUCCESS, userInfo })
  } catch (error) {
    yield put({ type: SIGN_IN.FAILURE, error })
  }
}

const root = function* root() {
  yield all([
    takeLatest(SIGN_IN.REQUEST, watchLogin),
  ])
}


export default root;
