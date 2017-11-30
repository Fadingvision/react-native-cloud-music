import { all } from 'redux-saga/effects';
import signinSaga from './signin';
import recommendSaga from './recommend';

const root = function* root() {
  yield all([
    ...signinSaga,
    ...recommendSaga
  ]);
}

export default root;
