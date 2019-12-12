import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {logOut} from '../actions/authActions';
import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';

interface Props {
  logOut: () => void;
  navigation: NavigationScreenProp<any, any>;
}

class LogOut extends Component<Props> {
  static navigationOptions = {
    drawerLabel: 'Log out'
  };

  componentWillReceiveProps(receivedProps) {
    if (!receivedProps.isAuthenticated) {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.logOut}
          style={styles.logoutButton}
        >
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {logOut};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);

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
