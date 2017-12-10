import React from 'react';
import { View, Text, TouchableNativeFeedback, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import actionCreator from 'ACTIONS/player';
import styles from './style';

@connect(state => state.player, actionCreator)
export default class PlayerBar extends React.Component {
  componentDidMount() {
    // this.player
  }

  loadStart = (...args) => {
    console.log(args);
  };
  setDuration = (...args) => {
    console.log(args);
  };
  setTime = (...args) => {
    console.log(args);
  };
  onEnd = (...args) => {
    console.log(args);
  };
  videoError = (...args) => {
    console.log(args);
  };
  onBuffer = (...args) => {
    console.log(args);
  };
  onTimedMetadata = (...args) => {
    console.log(args);
  };
  backgroundVideo = (...args) => {
    console.log(args);
  };

  render() {
    const { currentMusic /* , playList */ /* , playerStatus */ } = this.props;
    // const { navigate } = this.props;
    if (!currentMusic) return null;
    return (
      <TouchableNativeFeedback
        onPress={() => {
          /* navigate('Player') */
        }}
      >
        <View style={styles.container}>
          {currentMusic.musicUrl && (
            <Video
              source={{ uri: currentMusic.musicUrl }} // Can be a URL or a local file.
              ref={ref => {
                this.player = ref;
              }} // Store reference
              rate={1.0} // 0 is paused, 1 is normal.
              volume={1.0} // 0 is muted, 1 is normal.
              muted={false} // Mutes the audio entirely.
              paused={false} // Pauses playback entirely.
              // Fill the whole screen at aspect ratio.*
              resizeMode="cover"
              repeat // Repeat forever.
              // Audio continues to play when app entering background.
              playInBackground={false}
              // [iOS] Video continues to play when control or notification center are shown.
              playWhenInactive={false}
              // [iOS] ignore | obey - When 'ignore',
              // audio will still play with the iOS hard silent switch set to silent. When 'obey',
              // audio will toggle with the switch.
              // When not specified, will inherit audio settings as usual.
              ignoreSilentSwitch="ignore"
              // [iOS] Interval to fire onProgress (default to ~250ms)
              progressUpdateInterval={250.0}
              // Callback when video starts to load
              onLoadStart={this.loadStart}
              // Callback when video loads
              onLoad={this.setDuration}
              // Callback every ~250ms with currentTime
              onProgress={this.setTime}
              // Callback when playback finishes
              onEnd={this.onEnd}
              // Callback when video cannot be loaded
              onError={this.videoError}
              // Callback when remote video is buffering
              onBuffer={this.onBuffer}
              // Callback when the stream receive some metadata
              onTimedMetadata={this.onTimedMetadata}
              style={styles.backgroundVideo}
            />
          )}

          <View style={styles.musicInfo}>
            <Image
              source={{ uri: currentMusic.picUrl }}
              style={styles.albumPic}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.songTitle}>{currentMusic.name}</Text>
              <Text style={styles.artist}>{currentMusic.artist}</Text>
            </View>
          </View>
          <Icon
            containerStyle={styles.iconContainer}
            type="feather"
            size={35}
            onPress={() => {}}
            color="#666"
            name="play-circle"
          />
          <Icon
            containerStyle={styles.iconContainer}
            size={40}
            onPress={() => {}}
            color="#666"
            name="playlist-play"
          />
        </View>
      </TouchableNativeFeedback>
    );
  }
}
