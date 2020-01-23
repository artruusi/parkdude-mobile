import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, KeyboardAvoidingView,
  TextInput} from 'react-native';
import {getAuthState, changePassword} from '../actions/authActions';
import {connect, ConnectedProps} from 'react-redux';
import {NavigationScreenProp, ScrollView} from 'react-navigation';
import {RootReducer} from '../reducers/index';
import {CHANGE_PASSWORD_TITLE, CURRENT_PASSWORD, NEW_PASSWORD,
  CHANGE_PASSWORD, CONFIRM_NEW_PASSWORD, LOGOUT, LOGGING_OUT, CANCEL,
  PASSWORD_CHANGED, OK} from '../Constants';
import {Colors} from '../../assets/colors';
import {RoundedButton} from '../shared/RoundedButton';
import {setChangePasswordError, clearErrorState} from '../actions/errorActions';
import {Snackbar} from 'react-native-paper';


type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
}

class ChangePasswordView extends Component<Props> {
  state = {
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
    passwordChanged: false
  }

  private newPasswordInput: TextInput;
  private newPasswordInput2: TextInput;

  constructor(props: Props) {
    super(props);
    this.changePassword = this.changePassword.bind(this);
    this.cancel = this.cancel.bind(this);
    this.onOldPasswordChange = this.onOldPasswordChange.bind(this);
    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onNewPassword2Change = this.onNewPassword2Change.bind(this);
    this.onOkPressed = this.onOkPressed.bind(this);
  }

  static navigationOptions = {
    drawerLabel: 'ChangePassword'
  };

  componentDidMount() {
    this.componentDidUpdate(this.props);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isAuthenticated) {
      this.props.navigation.navigate('Auth');
    }
  }

  async changePassword() {
    if (this.state.newPassword !== this.state.newPassword2) {
      this.props.setChangePasswordError('Passwords must match');
      return;
    }
    const result = await this.props.changePassword(this.state.oldPassword, this.state.newPassword);
    this.setState({passwordChanged: result});
  }

  cancel() {
    this.props.clearErrorState();
    this.props.navigation.navigate('Profile');
  }

  onOldPasswordChange(oldPassword: string) {
    this.setState({oldPassword});
    this.props.clearErrorState();
  }

  onNewPasswordChange(newPassword: string) {
    this.setState({newPassword});
    this.props.clearErrorState();
  }

  onNewPassword2Change(newPassword2: string) {
    this.setState({newPassword2});
    this.props.clearErrorState();
  }

  onOkPressed() {
    this.props.navigation.navigate('Profile');
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.outerContainer} behavior='padding' enabled>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled" >
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.title}>{CHANGE_PASSWORD_TITLE}</Text>
            <Text style={{...styles.title, fontSize: 20.9}}>{CURRENT_PASSWORD}</Text>
            <TextInput
              style={styles.inputField}
              placeholder={CURRENT_PASSWORD}
              autoCompleteType='password'
              secureTextEntry={true}
              onChangeText={this.onOldPasswordChange}
              returnKeyType="next"
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={false}
              onSubmitEditing={() => this.newPasswordInput.focus()}
            />
            <Text style={{...styles.title, fontSize: 20.9}}>{NEW_PASSWORD}</Text>
            <TextInput
              ref={(input) => this.newPasswordInput = input}
              style={styles.inputField}
              placeholder={NEW_PASSWORD}
              autoCompleteType='password'
              secureTextEntry={true}
              onChangeText={this.onNewPasswordChange}
              returnKeyType="next"
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={false}
              onSubmitEditing={() => this.newPasswordInput2.focus()}
            />
            <TextInput
              ref={(input) => this.newPasswordInput2 = input}
              style={styles.inputField}
              placeholder={CONFIRM_NEW_PASSWORD}
              autoCompleteType='password'
              secureTextEntry={true}
              onChangeText={this.onNewPassword2Change}
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={false}
              onSubmitEditing={this.changePassword}
            />
            <Text style={styles.errorText}>{this.props.error}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <RoundedButton
              onPress={this.changePassword}
              buttonText={CHANGE_PASSWORD}
              buttonStyle={styles.yellowButton}
              isLoading={this.props.changePasswordLoading}
              disabled={
                !this.state.oldPassword || !this.state.newPassword || !this.state.newPassword2
              }
            />
            <RoundedButton
              onPress={this.cancel}
              buttonText={CANCEL}
              buttonStyle={{...styles.yellowButton, backgroundColor: Colors.APP_BACKGROUND}}
              disabled={this.props.changePasswordLoading}
            />
          </View>
        </ScrollView>
        <Snackbar
          visible={this.state.passwordChanged}
          onDismiss={() => this.setState({visible: false})}
          style={styles.snackbar}
          action={{
            label: 'Ok',
            onPress: this.onOkPressed,
          }}
        >
          <Text style={{...styles.text, color: Colors.WHITE}}>{PASSWORD_CHANGED}</Text>
        </Snackbar>
      </KeyboardAvoidingView>
    );
  }
}


const mapStateToProps = (state: RootReducer) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error.changePasswordError,
  changePasswordLoading: state.loading.changePasswordLoading
});

const mapDispatchToProps = {setChangePasswordError, changePassword, clearErrorState};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ChangePasswordView);

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
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
    marginBottom: 64,
  },
  scrollViewContent: {
    flexGrow: 1
  },
  title: {
    fontFamily: 'Exo2-bold',
    fontSize: 34.9,
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
  errorText: {
    fontSize: 16,
    fontFamily: 'Exo2',
    color: Colors.RED,
    textAlign: 'center',
    paddingHorizontal: 8
  },
  yellowButton: {
    alignItems: 'center',
    justifyContent: 'center',
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
  snackbar: {
    borderRadius: 21.7,
  }
});
