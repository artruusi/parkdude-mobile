import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class MainView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <Text>Parkdude mobile client is running succesfully!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
