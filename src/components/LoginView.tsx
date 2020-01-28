import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthSession} from 'expo';
import {HOST, LOGIN_URL} from 'react-native-dotenv';
import {setCookie} from '../CookieStorage';
import {getAuthState} from '../actions/authActions';
import {connect, ConnectedProps} from 'react-redux';
import {GOOGLE_LOGIN, EMAIL_LOGIN, SIGNUP, OR} from '../Constants';
import {Colors} from '../../assets/colors';
import {NavigationScreenProp} from 'react-navigation';
import {RoundedButton} from '../shared/RoundedButton';
import {UserRole} from '../types';
import {RootReducer} from '../reducers/index';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
}

class LoginView extends Component<Props> {
  state = {
    loginError: ''
  };

  constructor(props: Props) {
    super(props);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.emailLogin = this.emailLogin.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async loginGoogle() {
    try {
      this.setState({loginError: ''});
      // TODO: Get more static url
      const redirectUrl = AuthSession.getRedirectUrl();

      const result = await AuthSession.startAsync({
        authUrl: HOST + LOGIN_URL + `?redirectUrl=${redirectUrl}`
      });

      console.log('Returned from browser', result);

      if (result.type === 'success') {
        if (result.params.error) {
          this.setState({loginError: result.params.error});
          return;
        }
        const sessionId = result.params.sessionId;
        await setCookie(`sessionId=${sessionId}`);
        this.props.getAuthState();
      } else if (result.type === 'error') {
        this.setState({loginError: 'Unknown login error. Try again.'});
      }
    } catch (error) {
      // Should not happen...
      console.log(error);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.isAuthenticated) {
      if ([UserRole.ADMIN, UserRole.VERIFIED].includes(this.props.userRole)) {
        this.props.navigation.navigate('App');
      }
      if (this.props.userRole === UserRole.UNVERIFIED) {
        this.props.navigation.navigate('WaitForConfirmationView');
      }
    }
  }

  emailLogin() {
    this.props.navigation.navigate('PasswordLoginView');
  }

  signUp() {
    this.props.navigation.navigate('SignUpView');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.container, styles.parkdudeLogoContainer]}>
          <Image
            source={require('../../assets/images/parkdude-logo/drawable-hdpi/parkdude.png')}
            style={styles.parkdudeLogo}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.errorText}>{this.state.loginError}</Text>
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
          />
          <RoundedButton
            onPress={this.signUp}
            buttonText={SIGNUP}
            buttonStyle={styles.signUpButton}
            isTertiary={true}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootReducer) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userRole: state.auth.userRole
});

const mapDispatchToProps = {getAuthState};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LoginView);

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
    margin: 30,
    flex: 1,
    resizeMode: 'contain'
  },
  parkdudeLogoContainer: {
    flexDirection: 'row',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Exo2',
    color: Colors.RED,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16
  },
  googleButton: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  googleText: {
    color: Colors.WHITE,
    fontFamily: 'Exo2-bold',
  },
  orText: {
    fontFamily: 'Exo2-bold',
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
});
