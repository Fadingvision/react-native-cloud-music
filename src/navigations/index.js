import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import Signin from 'CONTAINERS/Signin';
import Recommend from 'CONTAINERS/Recommend';
import PlayList from 'CONTAINERS/PlayList';
import PlayListDetail from 'CONTAINERS/PlayListDetail';
import Dj from 'CONTAINERS/Dj';
import RankList from 'CONTAINERS/RankList';
import MyMusic from 'CONTAINERS/MyMusic';
import News from 'CONTAINERS/News';
import SideBar from 'CONTAINERS/SideBar';
import MainTabBar from 'COMPONENTS/MainTabBar';
import HomeTabBar from 'COMPONENTS/HomeTabBar';
import WebView from 'COMPONENTS/WebView';

const HomeTabNav = TabNavigator({
  Recommend: {
    screen: Recommend,
  },
  PlayList: {
    screen: PlayList,
  },
  Dj: {
    screen: Dj,
  },
  RankList: {
    screen: RankList,
  },
}, {
  tabBarPosition: 'top',
  tabBarComponent: HomeTabBar,
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: '#333',
    inactiveTintColor: '#ccc',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#fff',
    },
  },
});

const MainTabNav = TabNavigator({
  MyMusic: {
    screen: MyMusic,
  },
  Home: {
    screen: HomeTabNav,
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
    screen: MainTabNav,
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
  PlayListDetail: {
    screen: PlayListDetail,
    navigationOptions: {
      header: null,
    },
  },
  WebView: {
    screen: WebView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f23023'
      },
      headerBackTitleStyle: {
        color: '#fff'
      }
    },
  },
}, {
  // Default config for all screens
  headerMode: 'screen',
  // @TODO: Add splash Screen as initialRouteName
  initialRouteName: 'Home',
});

export default RootNavigator;
