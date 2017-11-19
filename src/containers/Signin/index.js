import React from 'react';
import {
  StyleSheet,
  Text,
  AsyncStorage,
  Alert,
  View,
  TextInput,
  Button
} from 'react-native';
import api from '../../service';
import { STORE_KEY } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: ''
    };
  }

  signin = () => {
    const { navigate } = this.props.navigation;
    return api.signin({
        phone: this.state.phone,
        password: this.state.password
      })
      .then(async res => {
        // console.log(res.headers.map['set-cookie'][0]);
        // console.log(res.data);
        await AsyncStorage.setItem(
          STORE_KEY.USER_INFO,
          JSON.stringify(res.data)
        );
        // Alert.alert('login success!');
        navigate('Home', {name: res.data.profile.nickname})
      });
  }

  getRecommendSongs = () => {
    api.getRecommendSongs().then(res => console.log(res.data), err => console.log(err));
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="phone"
          onChangeText={phone => this.setState({ phone })}
        />
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="password"
          onChangeText={password => this.setState({ password })}
        />

        <Button onPress={this.signin} title="press to login" color="#d23023" />
      </View>
    );
  }
}
