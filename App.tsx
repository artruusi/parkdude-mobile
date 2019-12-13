import React, { Component } from "react";
import { Provider } from "react-redux";
import AppContainer from './src/navigation';
import store from "./src/store";
import * as Font from 'expo-font';
import { AppLoading } from "expo";

export interface state {
  appIsReady: boolean;
}

export default class App extends Component<{}, state> {
  constructor(props: {}) {
    super(props);
    this.state = {
      appIsReady: false,
    };
  }

  componentWillMount() {
    this.loadAssetsAsync()
  }

  async loadAssetsAsync() {
    try {
      await Font.loadAsync({
        'Exo2': require('./assets/fonts/Exo2-Regular.ttf'),
        'Exo2-bold': require('./assets/fonts/Exo2-SemiBold.ttf'),
      });
    } catch (e) {
      console.log(e.message);
    } finally {
      this.setState({appIsReady: true});
      console.log('ladattu')
    }
  }

  render() {
    if (this.state.appIsReady == true) {
      return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
    } else {
      return (
        <AppLoading/>
      )
    }
  }
}