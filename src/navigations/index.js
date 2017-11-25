import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import Signin from 'CONTAINERS/Signin';
import Home from 'CONTAINERS/Home';
import MyMusic from 'CONTAINERS/MyMusic';
import News from 'CONTAINERS/News';
import SideBar from 'CONTAINERS/SideBar';
import MainTabBar from 'COMPONENTS/MainTabBar';

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
  animationEnabled: false,
  lazy: true,
  swipeEnabled: true,
  tabBarComponent: MainTabBar,
  tabBarOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: '#ccc',
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      width: 100,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    style: {
      backgroundColor: '#f23023',
    },
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
    navigationOptions: {
      header: null,
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
