import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import createReducer from 'UTILS/reduxHelper';
import initialState from '../store/initialState';
import { SIGNIN_ACTION_HANDLERS } from '../actions/signin';
import { RECOMMEND_ACTION_HANDLERS } from '../actions/recommend';
import navReducer from './nav';

const rootReducer = combineReducers({
  userInfo: createReducer(Immutable(initialState.userInfo), SIGNIN_ACTION_HANDLERS),
  recommend: createReducer(Immutable(initialState.recommend), RECOMMEND_ACTION_HANDLERS),
  nav: navReducer,
  // _persist: state => state || {}
});

export default rootReducer;
