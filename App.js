import React from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from 'REDUX/store';
import rootSaga from 'SAGAS';
import ReduxNavigation from 'NAVIGATIONS/ReduxNavigation';

store.runSaga(rootSaga);

const styles = StyleSheet.create({
  applicationView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  }
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <View style={styles.applicationView}>
          <StatusBar backgroundColor="rgba(0,0,0,.2)" />
          <ReduxNavigation />
        </View>
      </PersistGate>
    </Provider>
  );
}
