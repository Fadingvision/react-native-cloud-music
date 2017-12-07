import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import actionCreators from 'ACTIONS/currentPlayListDetail';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .3)',
    height: 50
  }
});

@connect(
  state => ({
    detail: state.currentPlayListDetail
  }),
  actionCreators
)
export default class PlayListDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.navigation.state.params;
    const { detail } = this.props;
    if (detail.code !== 200) this.props.getDetail(id);
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            type="ionicon"
            size={35}
            reverse
            color="rgba(0,0,0,.1)"
            reverseColor="#fff"
            name="ios-arrow-round-back"
            containerStyle={{
              backgroundColor: 'transparent',
              height: 45,
              width: 45
            }}
            onPress={() => goBack(null)}
          />
          <Text style={{ color: '#fff', fontSize: 18 }}>歌单</Text>
          <Icon
            type="feather"
            size={20}
            reverse
            reverseColor="#fff"
            color="rgba(0,0,0,.1)"
            containerStyle={{
              backgroundColor: 'transparent',
              height: 45,
              width: 45
            }}
            name="search"
          />
        </View>
      </View>
    );
  }
}
