import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

export default class SideBar extends React.Component {
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
