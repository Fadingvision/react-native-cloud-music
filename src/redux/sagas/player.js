import { put, call, fork, takeEvery } from 'redux-saga/effects';
import api from 'SERVICE';
import {
  GET_MUSIC_URL,
  PLAY_MUSIC,
  CHANGE_CURRENT_MUSIC,
  TOGGLE_PLAYER_STATUS
} from 'ACTIONS/player';

// const getMusicUrl = function* getMusicUrl(action) {
//   try {
//     const { id } = action;
//     const { data } = yield call(api.getMusicUrl, { id });
//     yield put({ type: GET_MUSIC_URL.SUCCESS, musicUrl: data[0].url });
//   } catch (error) {
//     yield put({ type: GET_MUSIC_URL.FAILURE, error })
//   }
// }

const playMusic = function* playMusic(action) {
  try {
    const { song } = action;
    yield put({ type: GET_MUSIC_URL.REQUEST });
    const { data } = yield call(api.getMusicUrl, { id: song.id });
    yield put({
      type: CHANGE_CURRENT_MUSIC,
      song: { ...song, musicUrl: data[0].url }
    });
    yield put({ type: TOGGLE_PLAYER_STATUS, isPlaying: true });
  } catch (error) {
    yield put({ type: GET_MUSIC_URL.FAILURE, error });
  }
};

const watchMusic = function* watchMusic() {
  yield takeEvery(PLAY_MUSIC, playMusic);
};

export default [fork(watchMusic)];
