import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  ToastAndroid
} from 'react-native';
import { Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import actionCreator from 'ACTIONS/player';
import colors from 'THEMES/color';
import styles from './style';

@connect(state => state.player, actionCreator)
export default class PlayerBar extends React.Component {
  componentWillMount() {
    // disable the player when component inital mount
    this.props.togglePlayStatus(false);
  }

  loadStart = (...args) => {
    console.log(args);
  };
  onEnd = (...args) => {
    // determin wheter loop or what's the next song to play
  };
  videoError = () => {
    ToastAndroid.show('网络错误', ToastAndroid.SHORT);
  };
  onBuffer = (...args) => {
    console.log(args);
  };
  onTimedMetadata = (...args) => {
    console.log(args);
  };

  render() {
    const { currentMusic, playList, playerStatus } = this.props;
    const { navigate, togglePlayStatus } = this.props;
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
              ref={ref => { this.player = ref }}
              rate={playerStatus.rate} // 0 is paused, 1 is normal.
              volume={playerStatus.volume} // 0 is muted, 1 is normal.
              muted={playerStatus.muted} // Mutes the audio entirely.
              paused={!playerStatus.isPlaying} // Pauses playback entirely.
              // Fill the whole screen at aspect ratio.*
              resizeMode="cover"
              repeat={playerStatus.loop} // Repeat forever.
              // Audio continues to play when app entering background.
              playInBackground={true}
              // [iOS] Video continues to play when control or notification center are shown.
              playWhenInactive={false}
              // [iOS] Interval to fire onProgress (default to ~250ms)
              progressUpdateInterval={500}
              // Callback when video starts to load
              onLoadStart={this.loadStart}
              // Callback when video loads
              onLoad={this.props.updateDuration}
              // Callback every ~250ms with currentTime
              onProgress={this.props.updatePercent}
              // Callback when playback finishes
              onEnd={this.onEnd}
              // Callback when video cannot be loaded
              onError={this.videoError}
              // Callback when remote video is buffering
              onBuffer={this.onBuffer}
              // Callback when the stream receive some metadata
              onTimedMetadata={this.onTimedMetadata}
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

          <TouchableOpacity
            opacity={0.9}
            onPress={() => {
              togglePlayStatus(!playerStatus.isPlaying);
            }}
          >
            <View style={[styles.iconContainer, styles.playButtonContainer]}>
              <AnimatedCircularProgress
                size={30}
                width={1}
                fill={playerStatus.percent}
                tintColor={colors.mainColor}
                backgroundColor="#333"
                rotation={0}
                children={() => (
                  <Icon
                    containerStyle={[
                      styles.playButton,
                      { left: playerStatus.isPlaying ? 10 : 12 }
                    ]}
                    type="ionicon"
                    size={20}
                    color="#666"
                    name={playerStatus.isPlaying ? 'ios-pause' : 'ios-play'}
                  />
                )}
              />
            </View>
          </TouchableOpacity>
          <Icon
            containerStyle={styles.iconContainer}
            size={33}
            onPress={() => {
              alert(12333);
            }}
            color="#666"
            name="playlist-play"
          />
        </View>
      </TouchableNativeFeedback>
    );
  }
}