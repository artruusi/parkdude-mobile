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
import {Colors} from '../../assets/colors';

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

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      if ([UserRole.ADMIN, UserRole.VERIFIED].includes(this.props.userRole)) {
        this.props.navigation.navigate('App');
      }
      if (this.props.userRole === UserRole.UNVERIFIED) {
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
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled" >
          <View style={styles.container}>
            <View style={styles.parkdudeLogoContainer}>
              <Image
                source={require('../../assets/images/parkdude-logo/drawable-hdpi/parkdude.png')}
                style={styles.parkdudeLogo}
              />
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.loginText}>{LOG_IN}</Text>
              <TextInput
                style={styles.inputField}
                placeholder={EMAIL}
                autoCompleteType='email'
                keyboardType="email-address"
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
                onSubmitEditing={this.loginWithPassword}
              />
              <View>
                <Text style={styles.errorText}>{this.props.error}</Text>
              </View>
              <View style={styles.horizontalContainer}>
                <RoundedButton
                  onPress={this.back}
                  buttonText={'Back'}
                  buttonStyle={styles.yellowButton}
                  disabled={this.props.loginLoading}
                />
                <RoundedButton
                  onPress={this.loginWithPassword}
                  buttonText={LOG_IN}
                  buttonStyle={styles.yellowButton}
                  disabled={!this.state.email || !this.state.password}
                  isLoading={this.props.loginLoading}
                />
              </View>
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
  error: state.error.passwordLoginError,
  loginLoading: state.loading.passwordLoginLoading
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
  formContainer: {
    flex: 1,
    alignItems: 'center'
  },
  scrollViewContent: {
    flexGrow: 1
  },
  horizontalContainer: {
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
    justifyContent: 'center',
    paddingTop: 50
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
    color: Colors.RED
  },
  yellowButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    marginBottom: 16
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
