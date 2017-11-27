import Immutable from 'seamless-immutable';
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
    password
  }) {
    return {
      type: SIGN_IN.REQUEST,
      phone,
      password
    }
  }
}

// ================================
// Action Handler
// ================================
export const SIGNIN_ACTION_HANDLERS = {
  [SIGN_IN.FAILURE]: (state, { error }) => Immutable.set(state, 'error', error),
  [SIGN_IN.SUCCESS]: (state, { userInfo }) => Immutable.replace(state, { ...userInfo }),
}
