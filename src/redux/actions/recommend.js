import { NavigationActions } from 'react-navigation';
import { createRequestTypes } from 'UTILS/reduxHelper';
// ================================
// Action Type
// ================================
export const GET_BANNER = createRequestTypes('GET_BANNER');
export const GET_RE_PLAY_LIST = createRequestTypes('GET_RE_PLAY_LIST');

// ================================
// Action Creator
// ================================
export default {
  getBanners() {
    return {
      type: GET_BANNER.REQUEST
    };
  },

  goToWeb(url) {
    return NavigationActions.navigate({
      routeName: 'WebView',
      params: { url }
    });
  },

  getRecommendPlayLists() {
    return {
      type: GET_RE_PLAY_LIST.REQUEST
    };
  }
};

// ================================
// Action Handler
// ================================
export const RECOMMEND_ACTION_HANDLERS = {
  [GET_BANNER.FAILURE]: (state, { error }) => state.set('error', error),
  [GET_BANNER.SUCCESS]: (state, { banners }) => state.set('banners', banners),

  [GET_RE_PLAY_LIST.FAILURE]: (state, { error }) => state.set('error', error),
  [GET_RE_PLAY_LIST.SUCCESS]: (state, { result: recommendPlayLists }) =>
    state.set('recommendPlayLists', recommendPlayLists),
};
