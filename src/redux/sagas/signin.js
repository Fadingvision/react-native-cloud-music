import { put, call, fork, takeLatest } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation';
import api from 'SERVICE';
import { SIGN_IN } from 'ACTIONS/signin';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' })
  ]
});

const login = function* login(action) {
  try {
    const { phone, password } = action;
    const userInfo = yield call(api.signin, { phone, password });
    yield put({ type: SIGN_IN.SUCCESS, userInfo });
    yield put(resetAction);
  } catch (error) {
    yield put({ type: SIGN_IN.FAILURE, error })
  }
}

const watchLogin = function* watchLogin() {
  yield takeLatest(SIGN_IN.REQUEST, login);
}

export default [
  fork(watchLogin)
];
