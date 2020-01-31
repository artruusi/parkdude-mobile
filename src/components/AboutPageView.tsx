import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {logOut} from '../actions/authActions';
import {NavigationScreenProp} from 'react-navigation';
import {Colors} from '../../assets/colors';
import {ABOUT_TITLE, PARKDUDE_VERSION, PARKDUDE_INFO, USED_LIBRARIES,
  PARKDUDE_LICENCE, BACK} from '../Constants';
import {RoundedButton} from '../shared/RoundedButton';
import packageJson from '../../package.json';
import appJson from '../../app.json';


export default class AboutPage extends Component {
  static navigationOptions = {
    drawerLabel: 'About'
  };
  state = {
    depString: '',
  }
  constructor() {
    super();
    this.stringifyDependencies = this.stringifyDependencies.bind(this);
  }

  stringifyDependencies() {
    let dependencies = '';

    const depObject = packageJson.dependencies;
    Object.keys(depObject).forEach((key, index) => {
      dependencies +=(key + ': ' + depObject[key] + '\n');
    });
    this.setState({depString: dependencies});
  }

  componentWillMount() {
    this.stringifyDependencies();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollViewContent}>
          <Text style={styles.title}>{ABOUT_TITLE}</Text>
          <Text style={{...styles.text, fontFamily: 'Exo2-bold'}}>
            {PARKDUDE_VERSION} {appJson.expo.version}
          </Text>
          <Text style={{...styles.text}}>{PARKDUDE_INFO}</Text>
          <Text style={{...styles.text, fontFamily: 'Exo2-bold'}}>{USED_LIBRARIES}</Text>
          <Text style={{...styles.text}}>{this.state.depString}</Text>
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
    marginBottom: 16,
    marginHorizontal: 8
  },
  text: {
    fontFamily: 'Exo2',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.BLACK,
    marginBottom: 32,
    marginHorizontal: 8
  },
  scrollViewContent: {
    flexGrow: 1,
    marginHorizontal: 8,
  },
});
