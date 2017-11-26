import { combineReducers } from 'redux';
import createReducer from 'UTILS/reduxHelper';
import initialState from '../store/initialState';
import { SIGNIN_ACTION_HANDLERS } from '../actions/signin';
import navReducer from './nav';

const rootReducer = combineReducers({
  userInfo: createReducer(initialState.userInfo, SIGNIN_ACTION_HANDLERS),
  nav: navReducer,
  _persisit: state => state || {}
});

export default rootReducer;
