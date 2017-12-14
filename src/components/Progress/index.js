import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import colors from 'THEMES/color';

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: colors.mainColor,
  },
  touchBar: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    top: -6,
    zIndex: 99,
  }
})

export default class Progress extends React.Component {
  static defaultProps = {
    height: 2,
    progress: 0,
  };

  componentDidMount() {
    
  }


  render() {
    const {
      backgroundStyle, fillStyle, progress, height
    } = this.props;
    const ownbackgroundStyle = {
      height
    }

    const ownfillStyle = {
      height,
      width: `${progress}%`
    }
    return (
      <View style={styles.progressBar}>
        <View style={styles.touchBar} />
        <View style={[styles.background, ownbackgroundStyle, backgroundStyle]} />
        <View style={[styles.fill, ownfillStyle, fillStyle]} />
      </View>
    );
  }
}
