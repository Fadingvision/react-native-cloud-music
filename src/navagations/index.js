import { StackNavigator } from 'react-navigation';
import Signin from '../containers/Signin';
import Home from '../containers/Home';

const RootNavigator = StackNavigator({
  Home: {
    screen: Home,
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
  initialRouteName: 'Home',
});

export default RootNavigator;
