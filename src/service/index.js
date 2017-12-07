import _fetch from './fetch';

const apiService = {
  // 登录
  signin: _fetch('/login/cellphone', 'GET'),
  getRecommendSongs: _fetch('/recommend/songs', 'GET'),
  getBanners: _fetch('/banner', 'GET'),
  getRecommendPlayLists: _fetch('/personalized', 'GET'),
  getPlayListDetail: _fetch('/playlist/detail', 'GET'),
};

export default apiService;
