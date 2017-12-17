import React from 'react';
import { View, Text, Image, Animated, Dimensions, Easing } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import actionCreator from 'ACTIONS/player';
import Progress from 'COMPONENTS/Progress';
import styles from './style';

const { height } = Dimensions.get('window');

console.log(height);

function leftPart(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

function turnSecondsToMinutes(seconds) {
  const minutes = Math.floor(parseFloat(seconds) / 60);
  const leftSeconds = Math.floor(seconds - 60 * minutes);
  return `${leftPart(minutes)}:${leftPart(leftSeconds)}`;
}

const ModeMap = {
  loop: {
    type: undefined,
    name: 'loop',
  },
  listLoop: {
    type: 'simple-line-icon',
    name: 'loop',
  },
  random: {
    type: 'font-awesome',
    name: 'random',
  }
}

@connect(state => state.player, actionCreator)
export default class Player extends React.Component {
  state = {
    angle: new Animated.Value(0),
    needle: new Animated.Value(0),
  };

  componentDidMount() {
    const { playerStatus } = this.props;
    if (playerStatus.isPlaying) this.spring();
  }

  componentDidUpdate(prevProps) {
    const { playerStatus } = this.props;
    if (prevProps.playerStatus.isPlaying && !playerStatus.isPlaying) {
      Animated.timing(this.state.angle).stop();
      this.moveNeedle(1);
    } else if (!prevProps.playerStatus.isPlaying && playerStatus.isPlaying) {
      this.moveNeedle(0);
      this.spring();
    }
  }

  moveNeedle(toValue) {
    Animated.timing(this.state.needle, {
      toValue,
      duration: 500,
      easing: Easing.linear
    }).start();
  }

  spring() {
    Animated.timing(this.state.angle, {
      toValue: 1,
      duration: 30000,
      easing: Easing.linear
    }).start(this.onSpringCompletion);
  }

  onSpringCompletion = ({ finished }) => {
    if (finished) {
      this.state.angle.setValue(0);
      this.spring();
    }
  }

  render() {
    const { currentMusic, playerStatus } = this.props;
    const {
      togglePlayStatus, skipPrevious, skipNext, changePlayMode
    } = this.props;
    const { goBack } = this.props.navigation;

    const spin = this.state.angle.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    const needleSpin = this.state.needle.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-45deg']
    })


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
            <Text style={styles.headerTitle}>{currentMusic.name}</Text>
            <Text style={styles.headerArtist}>{currentMusic.artist}</Text>
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
          <Animated.Image
            style={[styles.needle, {
              transform: [{ rotateZ: needleSpin }]
            }]}
            source={require('IMAGES/needle.png')}
            resizeMode="contain"
          />
          <Animated.View style={[styles.albumContainer, {
            transform: [{ rotate: spin }]
          }]}
          >
            <Image
              style={{ width: 320, height: 320 }}
              source={require('IMAGES/album.png')}
              resizeMode="contain"
            />
            <Image
              source={{ uri: currentMusic.picUrl }}
              style={styles.albumPic}
              resizeMode="cover"
              borderRadius={100}
            />
          </Animated.View>

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
            <Text style={styles.currentTime}>
              {turnSecondsToMinutes(playerStatus.currentTime)}
            </Text>
            <Progress progress={parseInt(playerStatus.percent, 10)} />
            <Text style={styles.duration}>
              {turnSecondsToMinutes(playerStatus.duration)}
            </Text>
          </View>
          <View style={styles.controlContainer}>
            <Icon
              size={30}
              reverse
              reverseColor="#c1c1c1"
              color="rgba(0,0,0,.1)"
              containerStyle={styles.songOpIconContainer}
              onPress={changePlayMode}
              name={ModeMap[playerStatus.mode].name}
              type={ModeMap[playerStatus.mode].type}
            />

            <View style={styles.playControl}>
              <Icon
                type="material-community"
                size={40}
                reverse
                reverseColor="#fff"
                color="rgba(0,0,0,.1)"
                containerStyle={styles.songOpIconContainer}
                onPress={skipPrevious}
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
                name={
                  playerStatus.isPlaying
                    ? 'pause-circle-outline'
                    : 'play-circle-outline'
                }
              />
              <Icon
                type="material-community"
                size={40}
                reverse
                reverseColor="#fff"
                color="rgba(0,0,0,.1)"
                containerStyle={styles.songOpIconContainer}
                onPress={skipNext}
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
