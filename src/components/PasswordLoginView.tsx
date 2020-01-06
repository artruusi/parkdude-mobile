import React, {Component} from 'react';
import {StyleSheet, View, Image, TextInput, Text, KeyboardAvoidingView} from 'react-native';
import {getAuthState, loginWithPassword} from '../actions/authActions';
import {connect, ConnectedProps} from 'react-redux';
import {LOG_IN, EMAIL, PASSWORD} from '../Constants';
import {NavigationScreenProp} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
import {RoundedButton} from '../shared/RoundedButton';
import {RootReducer} from '../reducers/index';
import {setPasswordLoginError, clearErrorState} from '../actions/errorActions';
import {UserRole} from '../types';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
}

class PasswordLoginView extends Component<Props> {
  state = {
    email: '',
    password: ''
  }

  private passwordInput: TextInput;

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
    clearErrorState();
  }

  onPasswordChange(password: string) {
    this.setState({password});
    clearErrorState();
  }

  back() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.outerContainer} behavior="padding" enabled>
        <ScrollView contentContainerStyle={styles.scrollViewContent} >
          <View style={styles.container}>
            <View style={styles.parkdudeLogoContainer}>
              <Image
                source={require('../../assets/images/parkdude-logo/drawable-hdpi/parkdude.png')}
                style={styles.parkdudeLogo}
              />
            </View>
            <Text style={styles.loginText}>{LOG_IN}</Text>
            <TextInput
              style={styles.inputField}
              placeholder={EMAIL}
              autoCompleteType='email'
              autoFocus={true}
              onChangeText={this.onEmailChange}
              autoCapitalize="none"
              returnKeyType="next"
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={false}
              onSubmitEditing={() => this.passwordInput.focus()}
            />
            <TextInput
              ref={(input) => this.passwordInput = input}
              style={styles.inputField}
              placeholder={PASSWORD}
              autoCompleteType='password'
              secureTextEntry={true}
              enablesReturnKeyAutomatically={true}
              onChangeText={this.onPasswordChange}
            />
            <View style={{flex: 1}}>
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state: RootReducer) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userRole: state.auth.userRole,
  error: state.error.passwordLoginError
});

const mapDispatchToProps = {getAuthState, loginWithPassword, setPasswordLoginError, clearErrorState};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PasswordLoginView);

const styles = StyleSheet.create({
  outerContainer: {
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1
  },
  scrollViewContent: {
    flexGrow: 1
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
  parkdudeLogo: {
    margin: 30,
    flex: 1,
    resizeMode: 'contain'
  },
  parkdudeLogoContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingTop: 30
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
