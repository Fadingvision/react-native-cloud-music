import { put, call } from 'redux-saga/effects'
// import { NavigationActions } from 'react-navigation';
import api from 'SERVICE';
import { GET_BANNER } from 'ACTIONS/recommend';

const watchBannerRequest = function* watchLogin() {
  try {
    const { banners } = yield call(api.getBanners);
    yield put({ type: GET_BANNER.SUCCESS, banners });
  } catch (error) {
    yield put({ type: GET_BANNER.FAILURE, error })
  }
}

export default watchBannerRequest;
