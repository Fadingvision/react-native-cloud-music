import { NavigationActions } from 'react-navigation';
import { createRequestTypes } from 'UTILS/reduxHelper';
import api from 'SERVICE';
// ================================
// Action Type
// ================================
export const GET_DETAIL = createRequestTypes('GET_DETAIL');

// ================================
// Action Creator
// ================================
export default {
  getDetail(id) {
    return async dispatch => {
      dispatch({ type: GET_DETAIL.REQUEST });
      try {
        const currentPlayListDetail = await api.getPlayListDetail({ id });
        dispatch({ type: GET_DETAIL.SUCCESS, currentPlayListDetail });
      } catch (err) {
        dispatch({ type: GET_DETAIL.FAILURE, err });
      }
    }
  },

  goToWeb(url) {
    return NavigationActions.navigate({
      routeName: 'WebView',
      params: { url }
    });
  },
};

// ================================
// Action Handler
// ================================
export const DETAIL_ACTION_HANDLERS = {
  [GET_DETAIL.SUCCESS]: (state, { currentPlayListDetail }) => state.merge(currentPlayListDetail),

};
