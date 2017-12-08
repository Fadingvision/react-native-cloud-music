import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";

import actionCreators from "ACTIONS/currentPlayListDetail";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  playListInfoContainer: {
    backgroundColor: "rgba(0, 0, 0, .3)"
  },

  // PlayList Header

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50
  },
  headerText: { color: "#fff", fontSize: 18, flex: 1 },
  headerRight: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  iconContainer: {
    backgroundColor: "transparent",
    height: 45,
    width: 45,
    margin: 0
  },

  // PlayList Section

  playListInfo: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 20
  },

  playListSection: {
    justifyContent: "flex-start",
    flexDirection: "row"
  },

  playListCover: {
    position: "relative",
    marginRight: 15
  },
  sectionItemLabel: {
    position: "absolute",
    right: 5,
    top: 5,
    flexDirection: "row"
  },
  sectionItemLabelText: {
    color: "#fff",
    fontSize: 10,
    marginLeft: 5
  },

  playListDesc: {
    justifyContent: "flex-start",
    flex: 1
  },

  playListTitle: {
    color: "#fff",
    marginTop: 7,
    fontSize: 20,
    flexWrap: "wrap"
  },

  creatorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  },

  creatorName: {
    color: "#f0f0f0",
    fontSize: 12,
    marginLeft: 5,
    marginRight: 3,
  },

  avatar: {
    width: 20,
    height: 20
  },

  // PlayList OperatorBar

  operateBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  operateText: {
    color: '#fff'
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
    console.log(detail);
  }

  render() {
    const { goBack } = this.props.navigation;
    const { playlist } = this.props.detail;
    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="rgba(0, 0, 0, .3)" />
        <View style={styles.playListInfoContainer}>
          <View style={styles.header}>
            <Icon
              type="ionicon"
              size={35}
              reverse
              color="rgba(0,0,0,.1)"
              reverseColor="#fff"
              name="ios-arrow-round-back"
              containerStyle={styles.iconContainer}
              onPress={() => goBack(null)}
            />
            <Text style={styles.headerText}>歌单</Text>
            <View style={styles.headerRight}>
              <Icon
                type="feather"
                size={22}
                reverse
                reverseColor="#fff"
                color="rgba(0,0,0,.1)"
                containerStyle={styles.iconContainer}
                onPress={() => goBack(null)}
                name="search"
              />
              <Icon
                type="entypo"
                size={20}
                reverse
                reverseColor="#fff"
                color="rgba(0,0,0,.1)"
                containerStyle={styles.iconContainer}
                onPress={() => goBack(null)}
                name="dots-three-vertical"
              />
            </View>
          </View>
          <View style={styles.playListInfo}>
            <View style={styles.playListSection}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.playListCover}
                onPress={() => {
                  
                }}
              >
                <Image
                  source={{ uri: playlist.coverImgUrl }}
                  style={{ width: 140, height: 140 }}
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
                    {playlist.playCount > 100000
                      ? `${+Math.floor(playlist.playCount / 10000)}万`
                      : parseInt(playlist.playCount, 10)}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.playListDesc}>
                <Text style={styles.playListTitle}>{playlist.name}</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.creatorInfo}
                  onPress={() => {
                  }}
                >
                  <Image
                    source={{ uri: playlist.creator.avatarUrl }}
                    style={styles.avatar}
                    resizeMode="cover"
                    borderRadius={15}
                  />
                  <Text style={styles.creatorName}>
                    {playlist.creator.nickname}
                  </Text>
                  <Icon
                    name="arrow-right"
                    type="simple-line-icon"
                    size={8}
                    color="#f0f0f0"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.operateBar}>
              <TouchableOpacity activeOpacity={0.9} style={styles.operateItem}>
                <Icon
                  name="add-to-queue"
                  size={20}
                  color="white"
                />
                <Text style={styles.operateText}>{playlist.subscribedCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={styles.operateItem}>
                <Icon
                  type="material-community"
                  name="comment-text-outline"
                  size={20}
                  color="white"
                />
                <Text style={styles.operateText}>{playlist.commentCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={styles.operateItem}>
                <Icon
                  type="simple-line-icon"
                  name="share"
                  size={20}
                  color="white"
                />
                <Text style={styles.operateText}>{playlist.shareCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={styles.operateItem}>
                <Icon
                  type="feather"
                  name="download"
                  size={22}
                  color="white"
                />
                <Text style={styles.operateText}>下载</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
