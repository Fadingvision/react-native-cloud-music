import { put, call, fork, takeEvery } from 'redux-saga/effects'
import api from 'SERVICE';
import { GET_MUSIC_URL } from 'ACTIONS/player';

const getMusicUrl = function* getMusicUrl(action) {
  try {
    const { id } = action;
    const { data } = yield call(api.getMusicUrl, { id });
    yield put({ type: GET_MUSIC_URL.SUCCESS, musicUrl: data[0].url });
  } catch (error) {
    yield put({ type: GET_MUSIC_URL.FAILURE, error })
  }
}

const watchMusic = function* watchMusic() {
  yield takeEvery(GET_MUSIC_URL.REQUEST, getMusicUrl);
}

export default [
  fork(watchMusic)
];
