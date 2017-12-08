import React from 'react';
import { View, StatusBar } from 'react-native';

export default function StaturBarPlaceHolder({ backgroundColor }) {
  return (
    <View
      style={{
        height: StatusBar.currentHeight,
        backgroundColor
      }}
    />
  );
}

StaturBarPlaceHolder.defaultProps = {
  backgroundColor: '#d23023'
};
