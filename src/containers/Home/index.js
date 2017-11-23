/* eslint-disable react/no-multi-comp */

import React from 'react';
import { View, Text } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';

function MyMusic() {
  return (
    <View>
      <Text>MyMusic</Text>
    </View>
  );
}

function Home() {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View>
      <Text>Notifications</Text>
    </View>
  );
}

class SideBar extends React.Component {
  toSignin = () => {
    const { navigate } = this.props.navigation;
    navigate('Signin');
  }

  render() {
    return (
      <View>
        <Button title="登录" onPress={this.toSignin} />
      </View>
    )
  }
}

const HomeTabNav = TabNavigator({
  MyMusic: {
    screen: MyMusic,
  },
  Home: {
    screen: Home,
  },
  Notifications: {
    screen: Notifications,
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

const DrawerNav = DrawerNavigator({
  Home: {
    screen: HomeTabNav,
  },
}, {
  contentComponent: SideBar,
  drawerBackgroundColor: '#ccc',
  initialRouteName: 'Home',
});


export default DrawerNav;
