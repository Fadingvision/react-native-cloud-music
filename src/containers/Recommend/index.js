import React from 'react';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import actionCreators from 'ACTIONS/recommend';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  swiperContainer: {
    width,
    height: 160
  },
  wrapper: {
    height: 200
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  fmContainer: {
    width,
    height: 120,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
  },

  fmIconContainer: {
    borderWidth: 1,
    borderColor: '#f23023',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center'
  },

  date: {
    position: 'absolute',
    left: new Date().getDate() < 9 ? 26 : 22,
    fontSize: 12,
    top: 24,
    color: '#f23023'
  },

  fmBox: {
    alignItems: 'center'
  },

  fmText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
    fontSize: 12
  },
  section: {
    paddingTop: 20,
    paddingBottom: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#f23023',
    alignItems: 'center',
    height: 18
  },
  sectionHeaderText: {
    fontSize: 16,
    color: '#333',
    marginRight: 5
  },

  sectionBodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  sectionItem: {
    width: (width - 4) / 3,
    marginTop: 15
  },
  sectionItemName: {
    color: '#333',
    lineHeight: 20,
    fontSize: 12,
    paddingLeft: 5
  },
  sectionItemLabel: {
    position: 'absolute',
    right: 5,
    top: 5,
    flexDirection: 'row',
  },
  sectionItemLabelText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 5
  }
});

function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      <Icon name="arrow-right" type="simple-line-icon" size={14} color="#999" />
    </View>
  );
}

@connect(
  state => ({
    banners: state.recommend.banners,
    recommendPlayLists: state.recommend.recommendPlayLists
  }),
  actionCreators
)
export default class Recommend extends React.Component {
  componentDidMount() {
    AsyncStorage.getAllKeys().then(console.log)
    this.props.getBanners();
    this.props.getRecommendPlayLists();
  }

  handleBannerPress = banner => {
    if (banner.url) {
      this.props.goToWeb(banner.url);
    }
  };

  renderSwiper() {
    const { banners } = this.props;
    return (
      <View style={styles.swiperContainer}>
        <Swiper
          width={width}
          height={160}
          style={{
            height: 160,
            backgroundColor: '#000000'
          }}
          autoplay
          autoplayTimeout={3}
        >
          {banners.map((banner, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => this.handleBannerPress(banner)}
            >
              <Image
                source={{ uri: banner.pic }}
                style={{ width, height: 160 }}
                key={index}
                resizeMode="contain"
              />
            </TouchableWithoutFeedback>
          ))}
        </Swiper>
      </View>
    );
  }

  renderFm() {
    return (
      <View style={styles.fmContainer}>
        <View style={styles.fmBox}>
          <View style={styles.fmIconContainer}>
            <Icon
              type="material-community"
              name="radio"
              size={30}
              underlayColor="white"
              color="#f23023"
            />
          </View>
          <Text style={styles.fmText}>私人FM</Text>
        </View>
        <View style={styles.fmBox}>
          <View style={styles.fmIconContainer}>
            <Icon
              type="font-awesome"
              name="calendar-o"
              size={30}
              color="#f23023"
            />
            <Text style={styles.date}>{new Date().getDate()}</Text>
          </View>
          <Text style={styles.fmText}>每日歌曲推荐</Text>
        </View>
        <View style={styles.fmBox}>
          <View style={styles.fmIconContainer}>
            <Icon
              type="material-community"
              name="chart-bar-stacked"
              size={30}
              color="#f23023"
            />
          </View>
          <Text style={styles.fmText}>云音乐热歌榜</Text>
        </View>
      </View>
    )
  }

  renderPlayList() {
    const { recommendPlayLists } = this.props;
    return (
      <View style={styles.section}>
        <SectionHeader title="推荐歌单" />
        <View style={styles.sectionBodyContainer}>
          {recommendPlayLists.map(playList => (
            <View style={styles.sectionItem} key={playList.id}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  // console.log('展现弹窗')
                }}
                onLongPress={() => {
                  // console.log('展现弹窗');
                }}
              >
                <Image
                  source={{ uri: playList.picUrl }}
                  style={{ width: (width - 4) / 3, height: 140 }}
                  resizeMode="contain"
                />
                <View style={styles.sectionItemLabel}>
                  <Icon
                    type="feather"
                    name="headphones"
                    size={11}
                    color="white"
                  />
                  <Text style={styles.sectionItemLabelText}>
                    {playList.playCount > 100000
                      ? `${+Math.floor(playList.playCount / 10000)}万`
                      : parseInt(playList.playCount, 10)}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.sectionItemName}>{playList.name}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderSwiper()}
        {this.renderFm()}
        {this.renderPlayList()}
      </ScrollView>
    );
  }
}
