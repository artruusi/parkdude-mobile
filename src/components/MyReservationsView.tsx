import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class MyReservationsView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>My reservations</Text>
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
