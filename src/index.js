import React from 'react';
import setCookie from 'set-cookie-parser';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import api from './service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
  async componentDidMount() {
    await this.signin();
    this.getRecommendSongs();
  }

  signin = () =>
    api.signin({
      phone: '15708483717',
      password: '15808172259'
    }).then(async res => {
      res.data.cookie = setCookie.parse(res.headers.map['set-cookie'][0]);
      await AsyncStorage.setItem('USER_INFO', JSON.stringify(res.data));
      return res.data;
    });

  getRecommendSongs = () => {
    api.getRecommendSongs().then(res => res.data)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.jssss to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone tasdasdo open the developer menu.</Text>
      </View>
    );
  }
}
