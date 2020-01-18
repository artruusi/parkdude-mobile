import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, SafeAreaView} from 'react-native';
import {logOut} from '../actions/authActions';
import {connect, ConnectedProps} from 'react-redux';
import {NavigationScreenProp, ScrollView} from 'react-navigation';
import {RootReducer} from '../reducers/index';
import {PROFILE_TITLE, YOUR_EMAIL, CHANGE_PASSWORD, LOGOUT, LOGGING_OUT} from '../Constants';
import {Colors} from '../../assets/colors';
import {RoundedButton} from '../shared/RoundedButton';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
}

class ProfileView extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  static navigationOptions = {
    drawerLabel: 'Profile'
  };

  componentDidMount() {
    this.componentDidUpdate(this.props);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isAuthenticated) {
      this.props.navigation.navigate('Auth');
    }
  }

  logOut() {
    this.props.navigation.navigate('LogOut');
  }

  changePassword() {
    this.props.navigation.navigate('ChangePassword');
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.title}>{PROFILE_TITLE}</Text>
          <Text style={styles.text}>{this.props.name}</Text>
          <Text style={{...styles.title, fontSize: 20.9}}>{YOUR_EMAIL}</Text>
          <Text style={styles.text}>{this.props.email}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <RoundedButton
            onPress={this.changePassword}
            buttonText={CHANGE_PASSWORD}
            buttonStyle={styles.yellowButton}
          />
          <RoundedButton
            onPress={this.logOut}
            buttonText={LOGOUT}
            buttonStyle={{...styles.yellowButton, backgroundColor: Colors.RED}}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootReducer) => ({
  isAuthenticated: state.auth.isAuthenticated,
  name: state.auth.name,
  email: state.auth.email
});

const mapDispatchToProps = {logOut};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ProfileView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '5%',
  },
  title: {
    fontFamily: 'Exo2-bold',
    fontSize: 34.8,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.BLACK,
    margin: 16
  },
  text: {
    width: 240,
    height: 126,
    fontFamily: 'Exo2',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.BLACK
  },
  yellowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%'
  },
});
