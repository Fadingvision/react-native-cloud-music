import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import Signin from 'CONTAINERS/Signin';
import Home from 'CONTAINERS/Home';
import MyMusic from 'CONTAINERS/MyMusic';
import News from 'CONTAINERS/News';
import SideBar from 'CONTAINERS/SideBar';

const HomeTabNav = TabNavigator({
  MyMusic: {
    screen: MyMusic,
  },
  Home: {
    screen: Home,
  },
  News: {
    screen: News,
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
  drawerBackgroundColor: '#fff',
  initialRouteName: 'Home',
});

const RootNavigator = StackNavigator({
  Home: {
    screen: DrawerNav,
    // @TODO: remove header in spec screen
    navigationOptions: {
      headerTitle: '首页',
    },
  },
  Signin: {
    screen: Signin,
    navigationOptions: {
      headerTitle: '手机号登录',
    },
  },
}, {
  // Default config for all screens
  headerMode: 'screen',
  // @TODO: Add splash Screen as initialRouteName
  initialRouteName: 'Home',
});

export default RootNavigator;
