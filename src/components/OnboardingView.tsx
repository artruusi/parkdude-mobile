import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {WELCOME_TITLE, WELCOME_TEXT1, WELCOME_TEXT2, WELCOME_TEXT3} from '../Constants';
import {Colors} from '../../assets/colors';
import {NavigationScreenProp} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class OnboardingView extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.continue = this.continue.bind(this);
  }

  continue() {
    this.props.navigation.navigate('AppEntryPoint');
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{WELCOME_TITLE}</Text>
        </View>
        <View>
          <Text style={styles.text}>{WELCOME_TEXT1}</Text>
          <Text style={styles.text}>{WELCOME_TEXT2}</Text>
          <Text style={styles.text}>{WELCOME_TEXT3}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.continue}>
          <Text>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: 203,
    height: 84,
    // fontFamily: 'Exo2',
    fontSize: 34.8,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.BLACK
  },
  text: {
    // width: 384,
    // height: 267,
    // fontFamily: 'Exo2',
    fontSize: 17.4,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.BLACK,
    margin: 20
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
