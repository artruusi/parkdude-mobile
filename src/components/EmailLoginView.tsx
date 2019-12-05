import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthSession} from 'expo';
import {LOGIN_URL} from 'react-native-dotenv';
import {setCookie} from '../CookieStorage';
import {getAuthState, setSimulateVerified, setSimulateUnVerified} from '../actions/authActions';
import {connect} from 'react-redux';
import {LOG_IN, EMAIL, PASSWORD} from '../Constants';
import {Colors} from '../../assets/colors';
import {NavigationScreenProp} from 'react-navigation';
import {TextInput} from 'react-native-gesture-handler';

interface Props {
  getAuthState: () => void;
  navigation: NavigationScreenProp<any, any>;
}

class EmailLoginView extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.loginEmail = this.loginEmail.bind(this);
    this.back = this.back.bind(this);
  }

  async loginEmail() {
    try {
      // TODO
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

  handleEmail(email: string) {
    console.log(email);
  }

  handlePassword(password: string) {
    console.log(password);
  }

  back() {
    this.props.navigation.navigate('Login');
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
        <KeyboardAvoidingView style={styles.buttonContainer} behavior="padding" enabled>
          <Text style={styles.loginText}>{LOG_IN}</Text>
          <TextInput
            style={styles.inputField}
            placeholder={EMAIL}
            autoCompleteType='email'
            autoFocus={true}
            onChangeText={(email) => this.handleEmail({email})}
          />
          <TextInput
            style={styles.inputField}
            placeholder={PASSWORD}
            autoCompleteType='password'
            secureTextEntry={true}
            onChangeText={(password) => this.handlePassword({password})}
          />
          <View style={styles.horizontalContainer}>
            <TouchableOpacity style={styles.yellowButton} onPress={this.back}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.yellowButton}>
              <Text style={styles.buttonText}>{LOG_IN}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {getAuthState, setSimulateVerified, setSimulateUnVerified};

export default connect(mapStateToProps, mapDispatchToProps)(EmailLoginView);

const styles = StyleSheet.create({
  container: {
    flex: 3,
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
  parkdudeLogo: {
    // marginTop: "20%"
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: '5%',
    marginBottom: '5%'
  },
  yellowButton: {
    flex: 1,
    // width: 150,
    height: 43,
    borderRadius: 21.7,
    backgroundColor: Colors.YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
    marginBottom: '3%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  inputField: {
    margin: '2%',
    width: 250,
    height: 43,
    textAlign: 'center'
  },
});
