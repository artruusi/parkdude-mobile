import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {UserRole} from '../types';
import {WAITING_CONFIRMATION_TITLE,
  WAITING_CONFIRMATION_TEXT1,
  WAITING_CONFIRMATION_TEXT2,
  RESTART} from '../Constants';
import {Colors} from '../../assets/colors';
import {NavigationScreenProp} from 'react-navigation';
import {RoundedButton} from '../shared/RoundedButton';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

class WaitForConfirmationView extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.restart = this.restart.bind(this);
  }

  componentWillReceiveProps(receivedProps) {
    if (receivedProps.isAuthenticated &&
      (receivedProps.userRole === UserRole.VERIFIED || receivedProps.userRole === UserRole.ADMIN)) {
      this.props.navigation.navigate('App');
    }
  }

  restart() {
    this.props.navigation.navigate('OnboardingView');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/images/parkdude-logo/drawable-hdpi/parkdude.png')}/>
        <View>
          <Text style={styles.title}>{WAITING_CONFIRMATION_TITLE}</Text>
        </View>
        <View>
          <Text style={styles.text}>{WAITING_CONFIRMATION_TEXT1}</Text>
          <Text style={styles.text}>{WAITING_CONFIRMATION_TEXT2}</Text>
        </View>
        <RoundedButton
          onPress={this.restart}
          buttonText={RESTART}
          buttonStyle={styles.button}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userRole: state.auth.userRole
});

export default connect(mapStateToProps)(WaitForConfirmationView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: 240,
    height: 53,
    fontFamily: 'Exo2-bold',
    fontSize: 20,
    lineHeight: 53,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.BLACK
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
  button: {
    width: 327,
    height: 43,
    borderRadius: 21.7,
    backgroundColor: Colors.YELLOW,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
