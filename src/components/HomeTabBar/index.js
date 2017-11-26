import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet
  // Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const ROUTE_NAME_MAP = {
  Recommend: '个性推荐',
  PlayList: '歌单',
  Dj: '主播电台',
  RankList: '排行榜',
};

export default function HomeTabBar(props) {
  const { navigation } = props;
  const { routes, index } = navigation.state;
  return (
    <View style={styles.tabContainer}>
      {
        routes.map((route, idx) => {
          const isActive = index === idx;
          return (
            <TouchableNativeFeedback
              onPress={() => {
                navigation.navigate(route.routeName);
              }}

              key={route.routeName}
            >
              <View
                style={{
                  flex: 1,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: '#d23023',
                  borderBottomWidth: isActive ? 2 : 0
                }}
              >
                <Text style={{
                  color: isActive ? '#d23023' : '#333',
                }}
                >{ROUTE_NAME_MAP[route.routeName]}
                </Text>
              </View>
            </TouchableNativeFeedback>
          );
        })
      }
    </View>
  );
}
