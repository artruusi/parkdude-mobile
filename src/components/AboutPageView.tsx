import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {logOut} from '../actions/authActions';
import {NavigationScreenProp} from 'react-navigation';
import {Colors} from '../../assets/colors';
import {ABOUT_TITLE, PARKDUDE_INFO, PARKDUDE_LICENCE, BACK} from '../Constants';
import {RoundedButton} from '../shared/RoundedButton';


export default class AboutPage extends Component {
  static navigationOptions = {
    drawerLabel: 'About'
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollViewContent}>
          <Text style={styles.title}>{ABOUT_TITLE}</Text>
          <Text style={{...styles.text, marginBottom: 32}}>{PARKDUDE_INFO}</Text>
          <Text style={styles.text}>{PARKDUDE_LICENCE}</Text>
        </ScrollView>
      </SafeAreaView >
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
    fontFamily: 'Exo2-bold',
    fontSize: 34.8,
    lineHeight: 53,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.BLACK,
    marginBottom: 16
  },
  text: {
    fontFamily: 'Exo2',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.BLACK,
    marginBottom: 8
  },
  scrollViewContent: {
    flexGrow: 1,
    marginHorizontal: 16,
  },
});
