import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import createReducer from 'UTILS/reduxHelper';
import initialState from '../store/initialState';
import { SIGNIN_ACTION_HANDLERS } from '../actions/signin';
import { RECOMMEND_ACTION_HANDLERS } from '../actions/recommend';
import { DETAIL_ACTION_HANDLERS } from '../actions/currentPlayListDetail';
import { PLAYER_ACTION_HANDLERS } from '../actions/player';
import navReducer from './nav';

const rootReducer = combineReducers({
  userInfo: createReducer(
    Immutable(initialState.userInfo),
    SIGNIN_ACTION_HANDLERS
  ),

  recommend: createReducer(
    Immutable(initialState.recommend),
    RECOMMEND_ACTION_HANDLERS
  ),

  currentPlayListDetail: createReducer(
    Immutable(initialState.currentPlayListDetail),
    DETAIL_ACTION_HANDLERS
  ),

  player: createReducer(
    Immutable(initialState.player),
    PLAYER_ACTION_HANDLERS
  ),

  nav: navReducer
  // _persist: state => state || {}
});

export default rootReducer;
