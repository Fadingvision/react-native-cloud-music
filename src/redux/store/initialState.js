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
      isPlaying: false,
      duration: 0,
      currentTime: 0,
      percent: 0,
      loop: false,
    },
  }
};
