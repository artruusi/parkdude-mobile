import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {UserRole} from '../types';
import {WAITING_CONFIRMATION_TITLE, WAITING_CONFIRMATION_TEXT1, WAITING_CONFIRMATION_TEXT2} from '../Constants';
import {Colors} from '../../assets/colors';

interface Props {
  navigation: any;
}

class WaitForConfirmationView extends Component<Props> {
  componentWillReceiveProps(receivedProps) {
    if (receivedProps.isAuthenticated && receivedProps.userRole == UserRole.VERIFIED) {
      this.props.navigation.navigate('App');
    }
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
        <TouchableOpacity style={styles.button} onPress={null}>
          <Text>OK</Text>
        </TouchableOpacity>
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
    // fontFamily: 'Exo2',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 53,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.BLACK
  },
  text: {
    width: 240,
    height: 126,
    // fontFamily: 'Exo2',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
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
