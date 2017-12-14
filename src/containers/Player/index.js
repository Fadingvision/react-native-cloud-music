import React from 'react';
import {
  View,
  Text,
  Image,
  // Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import actionCreator from 'ACTIONS/player';
import Progress from 'COMPONENTS/Progress';
import styles from './style';

// const { width } = Dimensions.get('window');

function leftPart(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

function turnSecondsToMinutes(seconds) {
  const minutes = Math.floor(parseFloat(seconds) / 60);
  const leftSeconds = Math.floor(seconds - 60 * minutes);
  return `${leftPart(minutes)}:${leftPart(leftSeconds)}`
}

@connect(state => state.player, actionCreator)
export default class Player extends React.Component {
  componentWillMount() {

  }

  render() {
    const { currentMusic, playerStatus } = this.props;
    const { togglePlayStatus } = this.props;
    const { goBack } = this.props.navigation;
    if (!currentMusic) return null;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            type="ionicon"
            size={40}
            reverse
            color="rgba(0,0,0,.1)"
            reverseColor="#fff"
            name="ios-arrow-round-back"
            containerStyle={styles.iconContainer}
            onPress={() => goBack(null)}
          />
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              {currentMusic.name}
            </Text>
            <Text style={styles.headerArtist}>
              {currentMusic.artist}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Icon
              type="simple-line-icon"
              size={20}
              reverse
              reverseColor="#fff"
              color="rgba(0,0,0,.1)"
              containerStyle={styles.iconContainer}
              onPress={() => {}}
              name="share"
            />
          </View>
        </View>

        <View style={styles.playerBody}>
          <View style={[styles.albumContainer]}>
            <Image
              style={{ width: 320, height: 320 }}
              source={require('IMAGES/album.png')}
              resizeMode="contain"
            />

            <Image
              style={[styles.needle]}
              source={require('IMAGES/needle.png')}
              resizeMode="contain"
            />
            <Image
              source={{ uri: currentMusic.picUrl }}
              style={styles.albumPic}
              resizeMode="cover"
              borderRadius={100}
            />
          </View>

          <View style={styles.songOpBar}>
            <Icon
              type="font-awesome"
              size={25}
              reverse
              reverseColor="#ccc"
              color="rgba(0,0,0,.1)"
              containerStyle={styles.songOpIconContainer}
              onPress={() => {}}
              name="heart-o"
              // name="heart"
            />
            <Icon
              type="simple-line-icon"
              size={25}
              reverse
              reverseColor="#ccc"
              color="rgba(0,0,0,.1)"
              containerStyle={styles.songOpIconContainer}
              onPress={() => {}}
              name="cloud-download"
            />
            <Icon
              type="material-community"
              size={25}
              reverse
              reverseColor="#ccc"
              color="rgba(0,0,0,.1)"
              containerStyle={styles.songOpIconContainer}
              onPress={() => {}}
              name="comment-text-outline"
            />
            <Icon
              type="entypo"
              size={23}
              reverse
              reverseColor="#ccc"
              color="rgba(0,0,0,.1)"
              containerStyle={styles.songOpIconContainer}
              onPress={() => {}}
              name="dots-three-vertical"
            />
          </View>
        </View>

        <View style={styles.playerContainer}>
          <View style={styles.progressContainer}>
            <Text style={styles.currentTime}>{turnSecondsToMinutes(playerStatus.currentTime)}</Text>
            <Progress progress={parseInt(playerStatus.percent, 10)} />
            <Text style={styles.duration}>{turnSecondsToMinutes(playerStatus.duration)}</Text>
          </View>
          <View style={styles.controlContainer}>
            <Icon
              size={30}
              reverse
              reverseColor="#c1c1c1"
              color="rgba(0,0,0,.1)"
              containerStyle={styles.songOpIconContainer}
              onPress={() => {}}
              name="loop"
            />

            <View style={styles.playControl}>
              <Icon
                type="material-community"
                size={40}
                reverse
                reverseColor="#fff"
                color="rgba(0,0,0,.1)"
                containerStyle={styles.songOpIconContainer}
                onPress={() => {}}
                name="skip-previous"
              />
              <Icon
                size={50}
                reverse
                reverseColor="#fff"
                color="rgba(0,0,0,.1)"
                containerStyle={styles.songOpIconContainer}
                onPress={() => {
                  togglePlayStatus(!playerStatus.isPlaying);
                }}
                name={playerStatus.isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
              />
              <Icon
                type="material-community"
                size={40}
                reverse
                reverseColor="#fff"
                color="rgba(0,0,0,.1)"
                containerStyle={styles.songOpIconContainer}
                onPress={() => {}}
                name="skip-next"
              />
            </View>

            <Icon
              size={35}
              reverse
              reverseColor="#c1c1c1"
              color="rgba(0,0,0,.1)"
              containerStyle={styles.songOpIconContainer}
              onPress={() => {}}
              name="playlist-play"
            />
          </View>
        </View>
      </View>
    );
  }
}
