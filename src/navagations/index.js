import { StackNavigator } from 'react-navigation';
import Signin from '../containers/Signin';
import Home from '../containers/Home';

const RootNavigator = StackNavigator({
	Home: {
    screen: Home,
    navigationOptions: {
      headerMode: 'none',
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
  initialRouteName: 'Signin',
});

export default RootNavigator;