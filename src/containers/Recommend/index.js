import React from 'react';
import Swiper from 'react-native-swiper';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import actionCreators from 'ACTIONS/recommend';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperContainer: {
    width,
    height: 160,
  },
  wrapper: {
    height: 200
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

@connect(
  state => ({
    banners: state.recommend.banners
  }),
  actionCreators
)
export default class Recommend extends React.Component {
  componentDidMount() {
    this.props.getBanners();
  }

  // handleBannerPress = banner => {

  // }

  render() {
    const { banners } = this.props;

    return (
      <View style={styles.container}>
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
            {banners.map(banner => (
              <Image
                key={banner.targetId}
                source={{ uri: banner.pic }}
                style={{ width, height: 160 }}
                resizeMode="contain"
              />
            ))}
          </Swiper>
        </View>
        <Text>123</Text>
      </View>
    );
  }
}
