import { applyMiddleware, createStore, compose } from 'redux';
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware, { END } from 'redux-saga';
import Immutable from 'seamless-immutable';
import reduxThunk from 'redux-thunk';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import rootReducer from '../reducer';
import enhancers from './enhancers';
import screenTrackingMiddleware from './screenTrackingMiddleware';

// Note: logger must be the last middleware in chain,
// otherwise it will log thunk and promise, not actual actions
const sagaMiddleware = createSagaMiddleware();
const middlewares = [reduxThunk, screenTrackingMiddleware, sagaMiddleware];
if (__DEV__) {
  const { logger } = require('redux-logger'); // eslint-disable-line
  middlewares.push(logger);
}

const myTransform = createTransform(
  // transform state coming from redux on its way to being serialized and stored
  state => (Immutable.isImmutable(state) ? Immutable.asMutable(state) : state),
  // transform state coming from storage, on its way to be rehydrated into redux
  state => Immutable(state)
)

const config = {
  key: 'root',
  debug: true,
  blacklist: ['nav', '_persist'],
  transforms: [myTransform],
  storage,
};

export const store = createStore(
  persistReducer(config, rootReducer),
  compose(applyMiddleware(...middlewares), ...enhancers)
);

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);

export const persistor = persistStore(store, null);

// clear storage when app is reloaded.
// if (__DEV__) persistor.purge();


if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require('../reducer/index').default; // eslint-disable-line
    store.replaceReducer(persistReducer(config, nextRootReducer))
  })
}
