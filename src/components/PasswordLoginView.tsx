import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, KeyboardAvoidingView} from 'react-native';
import {getAuthState, loginWithPassword} from '../actions/authActions';
import {connect, ConnectedProps} from 'react-redux';
import {LOG_IN, EMAIL, PASSWORD} from '../Constants';
import {NavigationScreenProp} from 'react-navigation';
import {TextInput} from 'react-native-gesture-handler';
import {RoundedButton} from '../shared/RoundedButton';
import {RootReducer} from '../reducers/index';
import {setPasswordLoginError} from '../actions/errorActions';
import {UserRole} from '../types';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
}

class PasswordLoginView extends Component<Props> {
  state = {
    email: '',
    password: ''
  }

  constructor(props: Props) {
    super(props);
    this.loginWithPassword = this.loginWithPassword.bind(this);
    this.back = this.back.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  loginWithPassword() {
    this.props.loginWithPassword(this.state.email, this.state.password);
  }

  componentWillReceiveProps(receivedProps: Props) {
    if (receivedProps.isAuthenticated) {
      if ([UserRole.ADMIN, UserRole.VERIFIED].includes(receivedProps.userRole)) {
        this.props.navigation.navigate('App');
      }
      if (receivedProps.userRole === UserRole.UNVERIFIED) {
        this.props.navigation.navigate('WaitForConfirmationView');
      }
    }
  }

  onEmailChange(email: string) {
    this.setState({email});
  }

  onPasswordChange(password: string) {
    this.setState({password});
  }

  back() {
    this.props.navigation.navigate('Login');
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
        <KeyboardAvoidingView style={styles.buttonContainer} behavior="padding" enabled>
          <Text style={styles.loginText}>{LOG_IN}</Text>
          <TextInput
            style={styles.inputField}
            placeholder={EMAIL}
            autoCompleteType='email'
            autoFocus={true}
            onChangeText={this.onEmailChange}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputField}
            placeholder={PASSWORD}
            autoCompleteType='password'
            secureTextEntry={true}
            onChangeText={this.onPasswordChange}
          />
          <View>
            <Text style={styles.errorText}>{this.props.error}</Text>
          </View>
          <View style={styles.horizontalContainer}>
            <RoundedButton
              onPress={this.back}
              buttonText={'Back'}
              buttonStyle={styles.yellowButton}
            />
            <RoundedButton
              onPress={this.loginWithPassword}
              buttonText={LOG_IN}
              buttonStyle={styles.yellowButton}
              disabled={!this.state.email || !this.state.password}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = (state: RootReducer) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userRole: state.auth.userRole,
  error: state.error.passwordLoginError
});

const mapDispatchToProps = {getAuthState, loginWithPassword, setPasswordLoginError};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PasswordLoginView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '5%',
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  parkdudeLogoContainer: {
    flexDirection: 'row',
  },
  parkdudeLogo: {
    margin: 30,
    flex: 1,
    resizeMode: 'contain'
  },
  loginText: {
    fontSize: 20,
    fontFamily: 'Exo2-bold',
    marginTop: '5%',
    marginBottom: '5%'
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Exo2',
    marginTop: '1%',
    marginBottom: '1%',
    color: 'red'
  },
  yellowButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
    marginBottom: '3%'
  },
  inputField: {
    margin: '2%',
    width: 250,
    height: 43,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
});
