import { AsyncStorage } from 'react-native';

const URL_PREFIX = 'http://192.168.1.3:3000';

function queryParams(params) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

export default function _fetch(url, method) { // eslint-disable-line no-underscore-dangle
  return async data => {
    let completeUrl = URL_PREFIX + url;
    const reqOptions = {
      method
    };

    let userInfo = await AsyncStorage.getItem('USER_INFO');
    userInfo = JSON.parse(userInfo);
    if (userInfo && userInfo.cookie) {
      reqOptions.headers = {
        Cookie: userInfo.cookie
      };
    }

    if (reqOptions.method === 'GET' && data) {
      completeUrl += (completeUrl.indexOf('?') === -1 ? '?' : '&') + queryParams(data);
    } else if (data) {
      reqOptions.body = JSON.stringify(data);
    }

    const res = {};
    const response = await fetch(completeUrl, reqOptions);
    res.status = response.status;
    res.code = response.code;
    res.headers = response.headers;

    return response.json().then(josnData => {
      res.data = josnData;
      return res;
    });
  };
}
