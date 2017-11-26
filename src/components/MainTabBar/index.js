import React, { Component } from 'react';
import {
  View,
  TouchableNativeFeedback,
  StyleSheet
  // Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#d23023',
    borderTopWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabView: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 40,
    paddingRight: 40,
  },
  iconButton: {
    marginRight: 50
  }
});

const ICON_MAP = {
  MyMusic: {
    iconName: 'music',
    iconType: 'feather'
  },
  News: {
    iconName: 'users',
    iconType: 'feather'
  },
  Home: {
    iconName: 'album',
    iconType: 'material-community'
  },
  Menu: {
    iconName: 'menu',
    iconType: ''
  },
  Search: {
    iconName: 'search',
    iconType: 'feather'
  }
}

const IconContainerStyle = {
  backgroundColor: 'transparent',
  width: 50,
  height: 50,
  borderRadius: 25
};

export default class MainTabBar extends Component {
  componentDidMount() {}

  render() {
    const { navigation } = this.props;
    const { routes, index } = navigation.state;
    return (
      <View style={styles.tabContainer}>

        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('DrawerOpen');
          }}
          style={styles.iconButton}
        >
          <Icon
            name={ICON_MAP.Menu.iconName}
            type={ICON_MAP.Menu.iconType}
            reverse
            reverseColor="#fff"
            containerStyle={IconContainerStyle}
            size={25}
          />
        </TouchableNativeFeedback>
        <View style={styles.tabView}>
          {
            routes.map((route, idx) => {
              const isActive = index === idx;
              return (
                <TouchableNativeFeedback
                  onPress={() => {
                    navigation.navigate(route.routeName);
                  }}
                  style={styles.iconButton}
                  key={route.routeName}
                >
                  <Icon
                    name={ICON_MAP[route.routeName].iconName}
                    type={ICON_MAP[route.routeName].iconType}
                    reverse
                    reverseColor={isActive ? '#fff' : '#C0C0C0'}
                    containerStyle={IconContainerStyle}
                    size={25}
                  />
                </TouchableNativeFeedback>
              );
            })
          }
        </View>

        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Search');
          }}
          style={styles.iconButton}
        >
          <Icon
            name={ICON_MAP.Search.iconName}
            type={ICON_MAP.Search.iconType}
            reverse
            reverseColor="#fff"
            containerStyle={IconContainerStyle}
            size={25}
          />
        </TouchableNativeFeedback>
      </View>
    );
  }
}
