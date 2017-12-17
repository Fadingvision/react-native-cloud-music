import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // PlayList Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 0.2,
    borderBottomColor: '#f0f0f0',
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    height: 60,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
  },
  headerArtist: {
    fontSize: 14,
    color: '#ccc',
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconContainer: {
    backgroundColor: 'transparent',
    height: 45,
    width: 45,
  },

  // Player album

  playerBody: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
  },

  albumContainer: {
    marginTop: 50,
    width: 320,
    height: 320,
    position: 'relative',
  },
  albumPic: {
    position: 'absolute',
    left: 60,
    top: 60,
    width: 200,
    height: 200
  },
  needle: {
    position: 'absolute',
    top: 0,
    left: 140,
    width: 150,
    height: 120,
    zIndex: 99,
  },

  // songOpBar
  songOpBar: {
    flexDirection: 'row',
  },

  songOpIconContainer: {
    backgroundColor: 'transparent',
    height: 60,
    width: 60,
  },

  // playerContainer

  playerContainer: {
    backgroundColor: 'rgba(0, 0, 0, .3)',

  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },

  playControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },

  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },

  currentTime: {
    color: '#fff',
    fontSize: 10,
    marginRight: 10,
  },

  duration: {
    color: '#ccc',
    fontSize: 10,
    marginLeft: 10,
  }
});

export default styles;
