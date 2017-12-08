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
    backgroundColor: 'transparent'
  }
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <View style={styles.applicationView}>
          <StatusBar
            translucent
            animated={false}
            hidden={false}
            barStyle='light-content'
            backgroundColor="#d23023"
          />
          <ReduxNavigation />
        </View>
      </PersistGate>
    </Provider>
  );
}
