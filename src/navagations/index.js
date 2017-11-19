import { StackNavigator } from 'react-navigation';
import Signin from '../containers/Signin';
import Home from '../containers/Home';

const RootNavigator = StackNavigator({
	Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Signin: {
    screen: Signin,
    navigationOptions: {
      headerTitle: 'Signin',
    },
  },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Signin',
});

export default RootNavigator;