import React from 'react';
import { WebView, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function WebViewComponent(props) {
  const { url } = props.navigation.state.params;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} javaScriptEnabled />
    </View>
  );
}
