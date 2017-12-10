import { NavigationActions } from 'react-navigation';
import { createRequestTypes } from 'UTILS/reduxHelper';
import api from 'SERVICE';
// ================================
// Action Type
// ================================
export const GET_MUSIC_URL = createRequestTypes('GET_MUSIC_URL');
export const PLAY_MUSIC = 'PLAY_MUSIC';
export const CHANGE_CURRENT_MUSIC = 'CHANGE_CURRENT_MUSIC';
export const UPDATE_PLAYER_STATUS = 'UPDATE_PLAYER_STATUS';
export const TOGGLE_PLAYER_STATUS = 'TOGGLE_PLAYER_STATUS';
export const UPDATE_PLAYER_PERCENT = 'UPDATE_PLAYER_PERCENT';

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
      dispatch({ type: TOGGLE_PLAYER_STATUS, isPlaying: true });
    };
  },

  navigate(routeName, params) {
    return NavigationActions.navigate({
      routeName,
      params
    });
  },

  updateDuration(duration) {
    return {
      type: UPDATE_PLAYER_STATUS,
      playerStatus: {
        duration: duration.duration
      }
    };
  },

  updatePercent(time) {
    return {
      type: UPDATE_PLAYER_PERCENT,
      time
    };
  },

  togglePlayStatus(isPlaying) {
    return {
      type: TOGGLE_PLAYER_STATUS,
      isPlaying
    };
  }
};

// ================================
// Action Handler
// ================================
export const PLAYER_ACTION_HANDLERS = {
  [GET_MUSIC_URL.REQUEST]: state => state.set('isFetching', true),

  [GET_MUSIC_URL.SUCCESS]: (state, { musicUrl }) =>
    state.merge({ currentMusic: state.currentMusic.set('musicUrl', musicUrl) }),

  [CHANGE_CURRENT_MUSIC]: (state, { song }) =>
    state.merge({ currentMusic: song }),

  [UPDATE_PLAYER_STATUS]: (state, { playerStatus }) =>
    state.merge({ playerStatus: state.playerStatus.merge(playerStatus) }),

  [TOGGLE_PLAYER_STATUS]: (state, { isPlaying }) =>
    state.merge({
      playerStatus: state.playerStatus.set('isPlaying', isPlaying)
    }),

  [UPDATE_PLAYER_PERCENT]: (state, { time }) => {
    const percent = parseFloat((time.currentTime / state.playerStatus.duration).toFixed(2)) * 100;
    return state.merge({
      playerStatus: state.playerStatus.merge({
        currentTime: time.currentTime,
        percent
      })
    })
  }

};
