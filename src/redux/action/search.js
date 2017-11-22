import { createRequestTypes } from 'UTILS/reduxHelper';
import api from 'SERVICE';
// import store from 'store';
// ================================
// Action Type
// ================================
export const SEARCH_PARTS_NAME = createRequestTypes('SEARCH_PARTS_NAME');
export const GET_MAX_SEARCH = createRequestTypes('GET_MAX_SEARCH');
export const RESULT_PAGE_INCREMENT = 'RESULT_PAGE_INCREMENT';
export const NO_MORE_SEARCH_DATA = 'NO_MORE_SEARCH_DATA';
export const CLEAR_SEARCH_RESULT = 'CLEAR_SEARCH_RESULT';

// ================================
// Action Creator
// ================================
export default {
  getSearchResult(partsName) {
    return async (dispatch, getState) => {
      dispatch({ type: SEARCH_PARTS_NAME.REQUEST });
      try {
        const { searchResultCount, searchResultPage } = getState().search;
        const { searchResult, pageFlag } = await api.searchByPartName({
          partsName,
          model: getState().result.queryResult.model,
          vin: getState().result.queryResult.vin,
          page: searchResultPage,
          count: searchResultCount
        });
        dispatch({
          type: SEARCH_PARTS_NAME.SUCCESS,
          searchResult
        });
        dispatch({ type: pageFlag ? RESULT_PAGE_INCREMENT : NO_MORE_SEARCH_DATA });
      } catch (error) {
        dispatch({
          type: SEARCH_PARTS_NAME.FAILURE,
          error
        });
      }
    };
  },

  clearSearchResult() {
    return { type: CLEAR_SEARCH_RESULT };
  },

  getMaxSearchList() {
    return async (dispatch, getState) => {
      dispatch({ type: GET_MAX_SEARCH.REQUEST });
      try {
        const { model } = getState().result.queryResult;
        const { maxList } = await api.getMaxSearch({ model });
        dispatch({
          type: GET_MAX_SEARCH.SUCCESS,
          maxList
        });
      } catch (error) {
        dispatch({
          type: GET_MAX_SEARCH.FAILURE,
          error
        });
      }
    };
  }
};

// ================================
// Action Handler
// ================================
export const SEARCH_ACTION_HANDLERS = {
  [CLEAR_SEARCH_RESULT]: search => ({
    ...search,
    searchResult: [],
    searchResultPage: 1,
    noMoreData: false
  }),
  [SEARCH_PARTS_NAME.REQUEST]: search => ({ ...search, isFetching: true }),
  [SEARCH_PARTS_NAME.SUCCESS]: (search, { searchResult }) => ({
    ...search,
    searchResult: [...search.searchResult, ...searchResult],
    isFetching: false
  }),
  [SEARCH_PARTS_NAME.FAILURE]: (search, { error }) => ({ ...search, error, isFetching: false }),

  [GET_MAX_SEARCH.SUCCESS]: (search, { maxList }) => ({ ...search, maxList }),
  [GET_MAX_SEARCH.FAILURE]: (search, { error }) => ({ ...search, error }),

  [RESULT_PAGE_INCREMENT]: search => ({ ...search, searchResultPage: search.searchResultPage + 1 }),
  [NO_MORE_SEARCH_DATA]: search => ({ ...search, noMoreData: true })
};
