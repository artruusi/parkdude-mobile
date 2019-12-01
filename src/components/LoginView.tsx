import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthSession} from 'expo';
import {LOGIN_URL} from 'react-native-dotenv';
import {setCookie} from '../CookieStorage';
import {getAuthState, setSimulateVerified, setSimulateUnVerified} from '../actions/authActions';
import {connect} from 'react-redux';
import {Colors} from '../../assets/colors';
import {NavigationScreenProp} from 'react-navigation';

interface Props {
  getAuthState: () => void;
  setSimulateVerified: () => void;
  setSimulateUnVerified: () => void;
  navigation: NavigationScreenProp<any, any>;
}

class LoginView extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.simulateLoginVerified = this.simulateLoginVerified.bind(this);
    this.simulateLoginUnVerified = this.simulateLoginUnVerified.bind(this);
  }

  async loginGoogle() {
    try {
      // TODO: Get more static url
      const redirectUrl = AuthSession.getRedirectUrl();
      console.log(redirectUrl);

      const result = await AuthSession.startAsync({
        authUrl: LOGIN_URL + `?redirectUrl=${redirectUrl}`
      });

      console.log('Returned from browser', result);

      if (result.type === 'success') {
        const sessionId = result.params.sessionId;
        await setCookie(`sessionId=${sessionId}`);
        this.props.getAuthState();
      }
    } catch (error) {
      // TODO: when will this situation happen?
      console.log(error);
    }
  }

  simulateLoginVerified() {
    this.props.setSimulateVerified();
    this.props.navigation.navigate('App');
  }

  simulateLoginUnVerified() {
    this.props.setSimulateUnVerified();
    this.props.navigation.navigate('WaitForConfirmationView');
  }

  componentWillReceiveProps(receivedProps) {
    if (receivedProps.isAuthenticated) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/images/parkdude-logo/drawable-hdpi/parkdude.png')}/>
        <View style={styles.button}>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginGoogle}
          >
            Login with Google
          </Icon.Button>
        </View>
        {/* <View style={{flexDirection: 'row'}}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={this.simulateLoginVerified}
              style={styles.button}
            >
              <Text>SIMULATE LOGIN (VERIFIED)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={this.simulateLoginUnVerified}
              style={styles.button}
            >
              <Text>SIMULATE LOGIN (UNVERIFIED)</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <TouchableOpacity style={styles.yellowButton}>
          <Text>Login with another email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {getAuthState, setSimulateVerified, setSimulateUnVerified};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#DDD',
    margin: 10
  },
  yellowButton: {
    width: 327,
    height: 43,
    borderRadius: 21.7,
    backgroundColor: Colors.YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  signUpButton: {
    width: 240,
    height: 53,
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 53,
    letterSpacing: 0,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000'
  }
});
