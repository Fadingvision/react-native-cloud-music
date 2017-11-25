import React from 'react';
import { Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { PersistGate } from 'redux-persist/es/integration/react'
import { store, persistor } from 'REDUX/store';
import rootSaga from 'SAGAS';
import ReduxNavigation from 'NAVIGATIONS/ReduxNavigation';

store.runSaga(rootSaga);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <ReduxNavigation />
      </PersistGate>
    </Provider>
  );
}
