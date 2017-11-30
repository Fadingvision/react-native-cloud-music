import { put, call, fork, takeLatest } from 'redux-saga/effects'
import api from 'SERVICE';
import { GET_BANNER } from 'ACTIONS/recommend';

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

export default [
  fork(watchGetBanner)
];
