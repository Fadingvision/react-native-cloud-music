import _fetch from './fetch';

const apiService = {
  // 登录
  signin: _fetch('/login/cellphone', 'GET'),
  getRecommendSongs: _fetch('/recommend/songs', 'GET'),
};

export default apiService;
