/* eslint-disable react/no-multi-comp */

import React from 'react';
import { StyleSheet} from 'react-native';
import { /* DrawerNavigator, */ TabNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; // eslint-disable-line

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});


class Home extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: () => (
      <Ionicons
        name="md-phone-portrait"
        style={styles.icon}
        size={30}
        color="#ccc"
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: () => (
      <Ionicons
        name="md-phone-portrait"
        style={styles.icon}
        size={30}
        color="#ccc"
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}


// const MyApp = DrawerNavigator({
//   Home: {
//     screen: Home,
//   },
//   Notifications: {
//     screen: MyNotificationsScreen,
//   },
// });

const MyApp = TabNavigator({
  Home: {
    screen: Home,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});


export default MyApp;
