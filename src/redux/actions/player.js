import { NavigationActions } from 'react-navigation';
import { createRequestTypes } from 'UTILS/reduxHelper';
import api from 'SERVICE';
import R from 'ramda';
// ================================
// Action Type
// ================================
export const GET_MUSIC_URL = createRequestTypes('GET_MUSIC_URL');
export const PLAY_MUSIC = 'PLAY_MUSIC';
export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const CHANGE_HISTORY = 'CHANGE_HISTORY';
export const CHANGE_PLAY_MODE = 'CHANGE_PLAY_MODE';
export const CHANGE_CURRENT_MUSIC = 'CHANGE_CURRENT_MUSIC';
export const UPDATE_PLAYER_STATUS = 'UPDATE_PLAYER_STATUS';
export const TOGGLE_PLAYER_STATUS = 'TOGGLE_PLAYER_STATUS';
export const UPDATE_PLAYER_PERCENT = 'UPDATE_PLAYER_PERCENT';

const getRandomIndex = list => Math.floor(Math.random() * list.length);

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
    return {
      type: PLAY_MUSIC,
      song
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
  },

  addPlayList(playList) {
    return {
      type: ADD_PLAYLIST,
      playList
    };
  },

  playAll(songsData) {
    return (dispatch, getState) => {
      dispatch({
        type: ADD_PLAYLIST,
        playList: songsData
      });

      const { playList, playerStatus } = getState().player;

      function getRandomMusic() {
        const randomIndex = getRandomIndex(playList);
        return playList[randomIndex];
      }
      switch (playerStatus.mode) {
        case 'listLoop':
        case 'loop':
          dispatch({ type: PLAY_MUSIC, song: playList[0] });
          break;
        case 'random': {
          const song = getRandomMusic();
          dispatch({ type: PLAY_MUSIC, song });
          dispatch({ type: CHANGE_HISTORY, song });
          break;
        }
        default:
          break;
      }
    };
  },

  skipPrevious() {
    return (dispatch, getState) => {
      const {
        playList,
        playerStatus,
        currentMusic,
        history
      } = getState().player;

      function getRandomMusic() {
        const randomIndex = getRandomIndex(playList);
        if (playList[randomIndex].id !== currentMusic.id) {
          return playList[randomIndex];
        }
        return getRandomMusic();
      }

      switch (playerStatus.mode) {
        case 'listLoop':
        case 'loop': {
          playList.forEach((song, index) => {
            if (song.id === currentMusic.id) {
              dispatch({
                type: PLAY_MUSIC,
                song: playList[index !== 0 ? index - 1 : playList.length - 1]
              });
            }
          });
          break;
        }
        case 'random': {
          if (history.length > 1) {
            history.forEach((historySong, index) => {
              if (historySong.id === currentMusic.id) {
                if (index !== 0) {
                  dispatch({ type: PLAY_MUSIC, song: history[index - 1] });
                } else {
                  const song = getRandomMusic();
                  dispatch({ type: PLAY_MUSIC, song });
                  dispatch({ type: CHANGE_HISTORY, song });
                }
              }
            });
          } else {
            const song = getRandomMusic();
            dispatch({ type: PLAY_MUSIC, song });
            dispatch({ type: CHANGE_HISTORY, song });
          }
          break;
        }
        default:
          break;
      }
    };
  },

  skipNext() {
    return (dispatch, getState) => {
      const {
        playList,
        playerStatus,
        currentMusic,
        history
      } = getState().player;

      function getRandomMusic() {
        const randomIndex = getRandomIndex(playList);
        if (playList[randomIndex].id !== currentMusic.id) {
          return playList[randomIndex];
        }
        return getRandomMusic();
      }
      switch (playerStatus.mode) {
        case 'listLoop':
        case 'loop': {
          playList.forEach((song, index) => {
            if (song.id === currentMusic.id) {
              dispatch({
                type: PLAY_MUSIC,
                song: playList[index !== playList.length - 1 ? index + 1 : 0]
              });
            }
          });
          break;
        }
        case 'random': {
          if (history.length > 1) {
            history.forEach((historySong, index) => {
              if (historySong.id === currentMusic.id) {
                if (index !== history.length - 1) {
                  dispatch({ type: PLAY_MUSIC, song: history[index + 1] });
                } else {
                  const song = getRandomMusic();
                  dispatch({ type: PLAY_MUSIC, song });
                  dispatch({ type: CHANGE_HISTORY, song });
                }
              }
            });
          } else {
            const song = getRandomMusic();
            dispatch({ type: PLAY_MUSIC, song });
            dispatch({ type: CHANGE_HISTORY, song });
          }
          break;
        }
        default:
          break;
      }
    };
  },

  changePlayMode() {
    return {
      type: CHANGE_PLAY_MODE
    };
  }
};

// ================================
// Action Handler
// ================================
export const PLAYER_ACTION_HANDLERS = {
  [GET_MUSIC_URL.REQUEST]: state => state.set('isFetching', true),

  [GET_MUSIC_URL.SUCCESS]: state => state.set('isFetching', false),

  [CHANGE_CURRENT_MUSIC]: (state, { song }) =>
    state.merge({ currentMusic: song }),

  [UPDATE_PLAYER_STATUS]: (state, { playerStatus }) =>
    state.merge({ playerStatus: state.playerStatus.merge(playerStatus) }),

  [TOGGLE_PLAYER_STATUS]: (state, { isPlaying }) =>
    state.merge({
      playerStatus: state.playerStatus.set('isPlaying', isPlaying)
    }),

  [UPDATE_PLAYER_PERCENT]: (state, { time }) => {
    const percent =
      parseFloat((time.currentTime / state.playerStatus.duration).toFixed(2)) *
      100;
    return state.merge({
      playerStatus: state.playerStatus.merge({
        currentTime: time.currentTime,
        percent
      })
    });
  },

  [ADD_PLAYLIST]: (state, { playList }) => state.set('playList', playList),

  [CHANGE_HISTORY]: (state, { song }) => {
    const isAlreadyInHistory = state.history.some(historyItem => historyItem.id === song.id);

    if (isAlreadyInHistory) {
      return state.set('history', [
        ...state.history.filter(historyItem => historyItem.id !== song.id),
        song
      ]);
    }
    return state.set('history', [...state.history, song]);
  },

  [CHANGE_PLAY_MODE]: state => {
    const playModeList = ['listLoop', 'random', 'loop'];
    const currentMode = state.playerStatus.mode;
    const currentModeIndex = R.findIndex(mode => mode === currentMode)(playModeList);

    return state.merge({
      playerStatus: state.playerStatus.merge({
        mode:
          playModeList[
            currentModeIndex === playModeList.length - 1
              ? 0
              : currentModeIndex + 1
          ]
      }),
      history: []
    });
  }
};
