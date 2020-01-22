import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {UserRole} from '../types';
import {
  WAITING_CONFIRMATION_TITLE,
  WAITING_CONFIRMATION_TEXT1,
  WAITING_CONFIRMATION_TEXT2,
  REFRESH, LOGOUT
} from '../Constants';
import {Colors} from '../../assets/colors';
import {NavigationScreenProp} from 'react-navigation';
import {RoundedButton} from '../shared/RoundedButton';
import {getAuthState, logOut} from '../actions/authActions';
import {RootReducer} from '../reducers/index';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
}

class WaitForConfirmationView extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentWillReceiveProps(receivedProps) {
    if (receivedProps.isAuthenticated &&
      (receivedProps.userRole === UserRole.VERIFIED || receivedProps.userRole === UserRole.ADMIN)) {
      this.props.navigation.navigate('App');
    } else if (receivedProps.isAuthenticated === false) {
      this.props.navigation.navigate('OnboardingView');
    }
  }

  refresh() {
    this.props.getAuthState();
  }

  logOut() {
    this.props.logOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.parkdudeLogoContainer]}>
          <Image
            style={styles.parkdudeLogo}
            source={require('../../assets/images/parkdude-logo/drawable-hdpi/parkdude.png')}
          />
        </View>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>{WAITING_CONFIRMATION_TITLE}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{WAITING_CONFIRMATION_TEXT1}</Text>
          </View>
          <RoundedButton
            onPress={this.refresh}
            buttonText={REFRESH}
            buttonStyle={styles.button}
            isLoading={this.props.authLoading}
          />
          <RoundedButton
            onPress={this.logOut}
            buttonText={LOGOUT}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootReducer) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userRole: state.auth.userRole,
  authLoading: state.loading.authLoading
});

const mapDispatchToProps = {getAuthState, logOut};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(WaitForConfirmationView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: 240,
    height: 48,
    fontFamily: 'Exo2-bold',
    fontSize: 20,
    lineHeight: 53,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.BLACK
  },
  parkdudeLogoContainer: {
    flexDirection: 'row',
    paddingTop: 48
  },
  parkdudeLogo: {
    margin: 30,
    flex: 1,
    resizeMode: 'contain'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 40
  },
  textContainer: {
    marginTop: 24,
    marginBottom: 40
  },
  text: {
    width: 240,
    // height: 126,
    fontFamily: 'Exo2',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.BLACK,
    margin: 9
  },
  button: {
    width: 327,
    height: 43,
    borderRadius: 21.7,
    backgroundColor: Colors.YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  }
});
