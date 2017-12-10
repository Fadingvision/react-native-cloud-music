import { all } from 'redux-saga/effects';
import signinSaga from './signin';
import recommendSaga from './recommend';
import playerSaga from './player';

const root = function* root() {
  yield all([
    ...signinSaga,
    ...recommendSaga,
    ...playerSaga
  ]);
}

export default root;
