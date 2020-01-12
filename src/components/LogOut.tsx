import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {logOut} from '../actions/authActions';
import {connect, ConnectedProps} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import {RootReducer} from '../reducers/index';
import {LOGGING_OUT} from '../Constants';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
}

class LogOut extends Component<Props> {
  static navigationOptions = {
    drawerLabel: 'Log out'
  };

  componentDidMount() {
    this.componentDidUpdate(this.props);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isAuthenticated) {
      this.props.navigation.navigate('Auth');
    } else {
      // Log out will cause isAuthenticated to turn false, which will trigger naviation to Auth
      this.props.logOut();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{LOGGING_OUT}</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

const mapStateToProps = (state: RootReducer) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {logOut};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LogOut);

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
