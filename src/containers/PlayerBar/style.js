import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  albumPic: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 5
  },
  musicInfo: {
    flex: 1,
    alignItems: 'center',
    height: 55,
    flexDirection: 'row'
  },

  textContainer: {
    flexWrap: 'nowrap',
  },

  songTitle: {
    fontSize: 14,
    overflow: 'hidden',
    color: '#333',
  },
  artist: {
    fontSize: 10,
    color: '#999'
  },
  iconContainer: {
    paddingRight: 10,
    paddingLeft: 10,
  },

  playButtonContainer: {
    paddingTop: 10,
    width: 50,
    height: 50,
  },

  hidden: {
    height: 0,
  },

  playButton: {
    position: 'absolute',
    top: 5,
  },
});

export default styles;
