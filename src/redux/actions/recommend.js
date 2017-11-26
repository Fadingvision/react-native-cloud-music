import { createRequestTypes } from 'UTILS/reduxHelper'

// ================================
// Action Type
// ================================
export const GET_BANNER = createRequestTypes('GET_BANNER');

// ================================
// Action Creator
// ================================
export default {
  getBanners() {
    return {
      type: GET_BANNER.REQUEST
    }
  }
}

// ================================
// Action Handler
// ================================
export const RECOMMEND_ACTION_HANDLERS = {
  [GET_BANNER.FAILURE]: (state, { error }) => ({ ...state, error }),
  [GET_BANNER.SUCCESS]: (state, { banners }) => ({ ...state, banners }),
}
