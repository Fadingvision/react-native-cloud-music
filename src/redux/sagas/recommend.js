import { put, call, fork, takeLatest } from 'redux-saga/effects'
import api from 'SERVICE';
import { GET_BANNER, GET_RE_PLAY_LIST } from 'ACTIONS/recommend';

const getBanner = function* getBanner() {
  try {
    const { banners } = yield call(api.getBanners);
    yield put({ type: GET_BANNER.SUCCESS, banners });
  } catch (error) {
    yield put({ type: GET_BANNER.FAILURE, error })
  }
}

const watchGetBanner = function* watchGetBanner() {
  yield takeLatest(GET_BANNER.REQUEST, getBanner);
}

const getRecommendPlayLists = function* getRecommendPlayLists() {
  try {
    const { result } = yield call(api.getRecommendPlayLists);
    yield put({ type: GET_RE_PLAY_LIST.SUCCESS, result });
  } catch (error) {
    yield put({ type: GET_RE_PLAY_LIST.FAILURE, error })
  }
}

const watchGetRecommendPlayLists = function* watchGetRecommendPlayLists() {
  yield takeLatest(GET_RE_PLAY_LIST.REQUEST, getRecommendPlayLists);
}

export default [
  fork(watchGetBanner),
  fork(watchGetRecommendPlayLists)
];
