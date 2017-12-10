export default {
  userInfo: {},
  recommend: {
    banners: [],
    recommendPlayLists: []
  },
  currentPlayListDetail: {
    isFetching: false,
    playlist: {
      tracks: []
    }
  },

  // 播放器
  player: {
    currentMusic: null,
    playList: [],
    playerStatus: {
      // isPlaying: false,
      // toalTime: 200,
      // currentTime: 22,
      // percent: 20,
      // playerModel: 'loop',
    },
  }
};
