import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthSession} from 'expo';
import {LOGIN_URL} from 'react-native-dotenv';
import {setCookie} from '../CookieStorage';
import {getAuthState} from '../actions/authActions';
import {connect} from 'react-redux';

interface Props {
  getAuthState: () => void;
  navigation: any;
}

class LoginView extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.loginGoogle = this.loginGoogle.bind(this);
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

  componentWillReceiveProps(receivedProps) {
    if (receivedProps.isAuthenticated) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon.Button
          name="google"
          backgroundColor="#DD4B39"
          onPress={this.loginGoogle}
        >
          Login with Google
        </Icon.Button>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
