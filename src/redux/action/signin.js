import { createRequestTypes } from 'UTILS/reduxHelper'

// ================================
// Action Type
// ================================
export const SIGN_IN = createRequestTypes('SIGN_IN');

// ================================
// Action Creator
// ================================
export default {
  signin({
    phone,
    pwd
  }) {
    return {
      type: SIGN_IN.REQUEST,
      phone,
      pwd
    }
  }
}

// ================================
// Action Handler
// ================================
export const ACTION_HANDLERS = {
  [SIGN_IN.FAILURE]: () => ({ fail: true }),
  [SIGN_IN.REQUEST]: () => ({ fail: false })
}
