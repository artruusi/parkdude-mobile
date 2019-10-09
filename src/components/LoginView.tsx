import React, {Component} from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default class LoginView extends Component {
  
  handleLogin() {
    // event handler triggered by Login-button
    // TODO: Add Login functionality
  }
  
  render() {
    return(
      <View style={styles.container}>
        <Button title="Login with Google" onPress={this.handleLogin} color="red" />
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