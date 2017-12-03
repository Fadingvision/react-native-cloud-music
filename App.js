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
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#f23023'
  }
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <View style={styles.applicationView}>
          <StatusBar
            translucent={true}
            animated={false}
            hidden={false}
            backgroundColor="transparent"
          />
          <ReduxNavigation />
        </View>
      </PersistGate>
    </Provider>
  );
}
