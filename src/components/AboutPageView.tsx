import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {logOut} from '../actions/authActions';
import {NavigationScreenProp} from 'react-navigation';
import {Colors} from '../../assets/colors';
import {ABOUT_TITLE, ABOUT_TEXT1, BACK} from '../Constants';
import {RoundedButton} from '../shared/RoundedButton';


export default class AboutPage extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  static navigationOptions = {
    drawerLabel: 'About'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{ABOUT_TITLE}</Text>
        <Text style={styles.text}>{ABOUT_TEXT1}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
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
});
