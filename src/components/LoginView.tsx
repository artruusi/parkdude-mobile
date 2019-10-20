import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginView extends Component {
  
  handleLogin() {
    // event handler triggered by Login-button
    // TODO: Add Login functionality
  }
  
  render() {
    return(
      <View style={styles.container}>
        <Icon.Button
          name="google"
          backgroundColor="#DD4B39"
          onPress={this.handleLogin}
        >
          Login with Google
        </Icon.Button>
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