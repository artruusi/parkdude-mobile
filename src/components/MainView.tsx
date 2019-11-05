import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface Props {
  logout: () => void;
  navigation: any;
}

export default class MainView extends Component<Props> {
  static navigationOptions = {
    drawerLabel: 'MainView' // TODO change this. Home? Reservations?
  };

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
    justifyContent: 'center'
  },
  logoutButton: {
    margin: 10,
    padding: 10,
    backgroundColor: '#DDD'
  }
});
