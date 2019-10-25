import React, {Component} from "react";
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";

interface LoadingProps {
  error: string
}

export default class LoadingView extends Component<LoadingProps, {}> {
  constructor(props: LoadingProps) {
    super(props);
  }

  render()  {
    return(
      <View style={styles.container}>
        <Text>{this.props.error}</Text>
        <ActivityIndicator size="large" color="#0000ff" />
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
  }
});
