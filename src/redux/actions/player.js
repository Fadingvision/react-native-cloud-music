import { NavigationActions } from 'react-navigation';
import { createRequestTypes } from 'UTILS/reduxHelper';
import api from 'SERVICE';
// ================================
// Action Type
// ================================
export const GET_MUSIC_URL = createRequestTypes('GET_MUSIC_URL');
export const PLAY_MUSIC = 'PLAY_MUSIC';
export const CHANGE_CURRENT_MUSIC = 'CHANGE_CURRENT_MUSIC';

// ================================
// Action Creator
// ================================
export default {
  getMusicUrl(id) {
    return async dispatch => {
      dispatch({ type: GET_MUSIC_URL.REQUEST });
      try {
        const { data } = await api.getMusicUrl({ id });
        dispatch({ type: GET_MUSIC_URL.SUCCESS, musicUrl: data[0].url });
      } catch (err) {
        dispatch({ type: GET_MUSIC_URL.FAILURE, err });
      }
    };
  },

  play(song) {
    return dispatch => {
      dispatch({ type: CHANGE_CURRENT_MUSIC, song });
      dispatch({ type: GET_MUSIC_URL.REQUEST, id: song.id });
    }
  },

  navigate(routeName, params) {
    return NavigationActions.navigate({
      routeName,
      params
    });
  }
};

// ================================
// Action Handler
// ================================
export const PLAYER_ACTION_HANDLERS = {
  [GET_MUSIC_URL.REQUEST]: state => state.set('isFetching', true),

  [GET_MUSIC_URL.SUCCESS]: (state, { musicUrl }) =>
    state.merge({ currentMusic: state.currentMusic.set('musicUrl', musicUrl) }),

  [CHANGE_CURRENT_MUSIC]: (state, { song }) => {
    console.log(state)
    return state.merge({ currentMusic: song })
  }
};
