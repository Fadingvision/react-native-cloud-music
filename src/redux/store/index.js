import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
// import ReduxThunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import rootReducer from '../reducer';
import enhancers from './enhancers';
import screenTrackingMiddleware from './screenTrackingMiddleware';

// Note: logger must be the last middleware in chain,
// otherwise it will log thunk and promise, not actual actions
const sagaMiddleware = createSagaMiddleware();
const middlewares = [screenTrackingMiddleware, sagaMiddleware];
if (__DEV__) {
  const { logger } = require('redux-logger'); // eslint-disable-line
  middlewares.push(logger);
}

const config = {
  key: 'root',
  storage
};

/**
 * 接受三个参数
 * - 一个根reducer对象(通常由各个小的reducer再由combineReducer组合而来)
 * - 一个通常用于服务端同构state对象(可选)
 * - 一个用于增强store的各种中间件函数(可选)
 * @type {[type]}
 */
export const store = createStore(
  persistReducer(config, rootReducer),
  compose(applyMiddleware(...middlewares), ...enhancers)
);

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);

export const persistor = persistStore(store);

// clear storage when app is reloaded.
if (__DEV__) persistor.purge();


if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require('../reducer/index').default; // eslint-disable-line
    store.replaceReducer(nextRootReducer)
  })
}
