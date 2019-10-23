import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface Props {
  logout: () => void;
}

export default class MainView extends Component<Props> {
  render() {
    // TODO: Find better place for logout button
    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <Text>Parkdude mobile client is running succesfully!</Text>
        <TouchableOpacity
          onPress={this.props.logout}
          style={styles.logoutButton}
        >
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  logoutButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "#DDD"
  }
});
