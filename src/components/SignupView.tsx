import React, {Component} from 'react';
import {StyleSheet, View, Image, TextInput, Text, KeyboardAvoidingView} from 'react-native';
import {getAuthState, signup} from '../actions/authActions';
import {connect, ConnectedProps} from 'react-redux';
import {EMAIL, PASSWORD, SIGNUP, CONFIRM_PASSWORD, NAME, BACK} from '../Constants';
import {NavigationScreenProp} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
import {RoundedButton} from '../shared/RoundedButton';
import {RootReducer} from '../reducers/index';
import {setSignupError, clearErrorState} from '../actions/errorActions';
import {UserRole} from '../types';
import {Colors} from '../../assets/colors';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
};

class SignupView extends Component<Props> {
  state = {
    email: '',
    name: '',
    password: '',
    password2: ''
  }

  private nameInput: TextInput;
  private passwordInput: TextInput;
  private password2Input: TextInput;

  constructor(props: Props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.back = this.back.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPassword2Change = this.onPassword2Change.bind(this);
  }

  signUp() {
    if (this.state.password !== this.state.password2) {
      this.props.setSignupError('Passwords must match.');
      return;
    }
    this.props.signup(this.state.email, this.state.name, this.state.password);
  }

  componentDidMount() {
    this.componentDidUpdate(this.props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated) {
      if (prevProps.userRole === UserRole.UNVERIFIED) {
        this.props.navigation.navigate('WaitForConfirmationView');
      }
      if (prevProps.userRole === UserRole.VERIFIED || prevProps.userRole === UserRole.ADMIN) {
        this.props.navigation.navigate('App');
      }
    }
  }

  onEmailChange(email: string) {
    this.setState({email});
    clearErrorState();
  }

  onNameChange(name: string) {
    this.setState({name});
    clearErrorState();
  }

  onPasswordChange(password: string) {
    this.setState({password});
    clearErrorState();
  }

  onPassword2Change(password2: string) {
    this.setState({password2});
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
            <View style={[styles.parkdudeLogoContainer]}>
              <Image
                source={require('../../assets/images/parkdude-logo/drawable-hdpi/parkdude.png')}
                style={styles.parkdudeLogo}
              />
            </View>
            <Text style={styles.signupText}>{SIGNUP}</Text>
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
              onSubmitEditing={() => this.nameInput.focus()}
            />
            <TextInput
              ref={(input) => this.nameInput = input}
              style={styles.inputField}
              placeholder={NAME}
              onChangeText={this.onNameChange}
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
              onChangeText={this.onPasswordChange}
              returnKeyType="next"
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={false}
              onSubmitEditing={() => this.password2Input.focus()}
            />
            <TextInput
              ref={(input) => this.password2Input = input}
              style={styles.inputField}
              placeholder={CONFIRM_PASSWORD}
              autoCompleteType='password'
              secureTextEntry={true}
              onChangeText={this.onPassword2Change}
              enablesReturnKeyAutomatically={true}
            />
            <View style={{flex: 1}}>
              <Text style={styles.errorText}>{this.props.error}</Text>
            </View>
            <View style={styles.horizontalContainer}>
              <RoundedButton
                onPress={this.back}
                buttonText={BACK}
                buttonStyle={styles.yellowButton}
              />
              <RoundedButton
                onPress={this.signUp}
                buttonText={SIGNUP}
                buttonStyle={styles.yellowButton}
                isLoading={this.props.signupLoading}
                disabled={
                  !this.state.email || !this.state.name || !this.state.password || !this.state.password2
                }
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
  error: state.error.signupError,
  signupLoading: state.loading.signUpLoading
});

const mapDispatchToProps = {getAuthState, signup, setSignupError, clearErrorState};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SignupView);

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
  signupFormContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  outerFormContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '5%'
  },
  horizontalContainer: {
    flex: 3,
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
  signupText: {
    fontSize: 20,
    fontFamily: 'Exo2-bold',
    marginBottom: '2%'
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
