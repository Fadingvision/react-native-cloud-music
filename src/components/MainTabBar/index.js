import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
  // Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderTopWidth: 2
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48
  }
});

const theme = {};

export default class MainTabBar extends Component {
  componentDidMount() {}

  renderRoutes() {
    const { navigation } = this.props;
    const titles = ['News', 'Lịch', 'Feed', 'Quiz', 'Profile'];
    const { routes, index } = navigation.state;
    return routes.map((route, idx) => {
      const color = index === idx ? theme.primaryColor : theme.inactiveColor;
      const isActive = index === idx;
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(route.routeName);
          }}
          style={[
            styles.tab,
            {
              backgroundColor: isActive ? theme.lightBackground : '#fff'
            }
          ]}
          key={route.routeName}
        >
          <Text style={{ color, fontSize: 12 }}>{titles[idx]}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={styles.tabContainer}>
        <Text>123</Text>
      </View>
    );
  }
}
