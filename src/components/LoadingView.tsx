import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

export const LoadingView = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
