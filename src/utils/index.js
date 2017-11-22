import is from './is';

// const isIOS = function() {
//   const u = navigator.userAgent;
//   return Boolean(u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)); //ios终端
// };
// private
const mosaicFunction = {
  name(val) {
    return val.length > 0 ? val.substr(0, val.length - 1).replace(/./g, '*') + val.substr(-1) : val;
  },

  phone(val) {
    return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  },

  idCard(val) {
    return val.replace(/(\d{5})\d{11}(\d{2})/, '$1***********$2');
  }
};


function leftPar(num) {
  if (parseInt(num, 10) < 10) return `0${num}`;
  return num;
}

// public

export const highOrderMosic = type => mosaicFunction[type];

export function timeStampToDate(timeStamp) {
  const date = new Date(timeStamp);
  return `${leftPar(date.getMonth() + 1)}月${leftPar(date.getDate())}日`;
}

export function removeUnit(str) {
  return str.replace('元', '');
}

export function emptyFilter(str) {
  if (is.empty(str)) return '--';
  return str;
}

export function changeTitle(title) {
  document.title = title;
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.setAttribute('src', 'http://named.cn/page/take/img/icon_phone.png');
  const loadFuncListener = function loadFuncListener() {
    setTimeout(() => {
      iframe.removeEventListener('load', loadFuncListener);
      document.body.removeChild(iframe);
    }, 0);
  };
  iframe.addEventListener('load', loadFuncListener);
  document.body.appendChild(iframe);
}

/**
 * improvement countDown
 */
export function countDown(countNum, onTick) {
  let resolve;
  let num = countNum;
  const promise = new Promise(fullfill => {
    resolve = fullfill;
  });
  // countDown
  let timer = setInterval(() => {
    num -= 1;
    onTick(num);
    if (num < 0) {
      clearInterval(timer);
      timer = null;
      resolve();
    }
  }, 1000);
  // First tick
  onTick(num);
  return {
    finish: promise,
    abort() {
      clearInterval(timer);
      timer = null;
    }
  };
}
