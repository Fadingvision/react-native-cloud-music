import React from 'react';
import { StyleSheet, ToastAndroid, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
// import { NavigationActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'; // eslint-disable-line
import actionCreators from 'ACTIONS/signin';
import Validator from '../../utils/Validator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20
  },

  inputLine: {
    height: 60,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },

  input: {
    flex: 1,
    height: 60,
    borderBottomColor: '#f0f1f2',
    borderBottomWidth: 0
  },
  icon: {
    paddingTop: 20,
    paddingRight: 10
  },
  iconPortrait: {
    paddingTop: 20,
    paddingRight: 15
  }
});

@connect(state => ({
  error: state.userInfo.error,
}), actionCreators)
export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error && nextProps.error.msg) {
      ToastAndroid.show(nextProps.error.msg, ToastAndroid.SHORT);
    }
  }

  validate() {
    const validatorIns = new Validator();
    validatorIns
      .addRule(this.state.phone, [
        { rule: 'isEmpty', errMsg: '请输入手机号' },
        { rule: 'isIegalPhone', errMsg: '请输入11位数字的手机号' }
      ])
      .addRule(this.state.password, [{ rule: 'isEmpty', errMsg: '请输入密码' }]);
    return validatorIns.startVal(msg => {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    });
  }

  signin = () => {
    if (!this.validate()) return;
    // const { /* navigate, */dispatch } = this.props.navigation;
    this.props.signin({
      phone: this.state.phone,
      password: this.state.password
    });
    // .then(async res => {
    //   dispatch(NavigationActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({ routeName: 'Home' })]
    //   }));
    // })
    // .catch(err => {
    //   ToastAndroid.show(err.msg, ToastAndroid.SHORT);
    // });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputLine}>
          <Ionicons name="md-phone-portrait" style={styles.iconPortrait} size={30} color="#ccc" />
          <TextInput
            style={styles.input}
            placeholder="请输入手机号"
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <View style={styles.inputLine}>
          <Ionicons name="md-settings" style={styles.icon} size={25} color="#ccc" />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="请输入密码"
            onChangeText={password => this.setState({ password })}
          />
        </View>
        <Button
          middle
          onPress={this.signin}
          title="登录"
          buttonStyle={{
            backgroundColor: '#d23023',
            alignSelf: 'stretch',
            width: 300,
            borderRadius: 15,
            marginTop: 20
          }}
          textStyle={{ textAlign: 'center' }}
        />
      </View>
    );
  }
}
