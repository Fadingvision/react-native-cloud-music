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
