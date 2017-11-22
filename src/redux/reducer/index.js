import { combineReducers } from 'redux';
import createReducer from 'UTILS/reduxHelper';
import initialState from '../store/initialState';
import { RESULT_ACTION_HANDLERS } from '../action/result';
import { SEARCH_ACTION_HANDLERS } from '../action/search';
// import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  result: createReducer(initialState.result, RESULT_ACTION_HANDLERS),
  search: createReducer(initialState.search, SEARCH_ACTION_HANDLERS),
});

export default rootReducer;
