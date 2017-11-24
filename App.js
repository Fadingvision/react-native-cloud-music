import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { store, persistor } from 'REDUX/store';
import rootSaga from 'SAGAS';
import RootNavigator from './src/navagations';

store.runSaga(rootSaga);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
