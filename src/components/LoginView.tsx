import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthSession} from 'expo';
import {LOGIN_URL} from 'react-native-dotenv';
import {setCookie} from '../CookieStorage';
import {getAuthState} from '../actions/authActions';
import {connect} from 'react-redux';
import {GOOGLE_LOGIN, EMAIL_LOGIN, SIGNUP, OR} from '../Constants';
import {Colors} from '../../assets/colors';
import {NavigationScreenProp} from 'react-navigation';
import {RoundedButton} from '../shared/RoundedButton';

interface Props {
  getAuthState: () => void;
  navigation: NavigationScreenProp<any, any>;
}

class LoginView extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.emailLogin = this.emailLogin.bind(this);
    this.singUp = this.singUp.bind(this);
  }

  async loginGoogle() {
    try {
      // TODO: Get more static url
      const redirectUrl = AuthSession.getRedirectUrl();
      console.log(redirectUrl);
      console.log(LOGIN_URL);

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

  componentWillReceiveProps(receivedProps) {
    if (receivedProps.isAuthenticated) {
      this.props.navigation.navigate('App');
    }
  }

  emailLogin() {
    this.props.navigation.navigate('PasswordLoginView');
  }

  singUp() {
    console.log('SignUp pressed');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/parkdude-logo/drawable-hdpi/parkdude.png')}
            style={styles.parkdudeLogo}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.googleButton}>
            <Icon.Button
              name="google"
              backgroundColor="#DD4B39"
              onPress={this.loginGoogle}
              style={styles.googleButton}
              size={25}
            >
              <Text style={styles.googleText}>{GOOGLE_LOGIN}</Text>
            </Icon.Button>
          </View>
          <Text style={styles.orText}>{OR}</Text>
          <RoundedButton
            onPress={this.emailLogin}
            buttonText={EMAIL_LOGIN}
            buttonStyle={styles.yellowButton}
            textStyle={styles.buttonText}
          />
          <RoundedButton
            onPress={this.signUp}
            buttonText={SIGNUP}
            buttonStyle={styles.signUpButton}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {getAuthState};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '5%',
  },
  parkdudeLogo: {
    // marginTop: "20%"
  },
  googleButton: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  googleText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    // fontFamily: 'Roboto',
  },
  orText: {
    fontWeight: 'bold',
    // fontFamily: 'Roboto',
    opacity: 0.2,
    marginTop: '5%',
    marginBottom: '5%'
  },
  yellowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%'
  },
  signUpButton: {
    width: 240,
    height: 53,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: Colors.APP_BACKGROUND,
  },
  buttonText: {
    // fontFamily: 'Roboto',
  }
});
