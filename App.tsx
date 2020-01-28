import React, {Component} from 'react';
import {Provider, connect, ConnectedProps} from 'react-redux';
import AppContainer from './src/navigation';
import store from './src/store';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {RootReducer} from './src/reducers/index';
import {getCookie} from './src/CookieStorage';
import {setHasCookies} from './src/actions/cookieActions';

export interface State {
  appIsReady: boolean;
}

type Props = ConnectedProps<typeof connector>;

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      appIsReady: false,
    };
  }

  componentWillMount() {
    this.loadAssetsAsync();
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
      const cookie = await getCookie();
      if (cookie != null) {
        this.props.setHasCookies(true);
      } else {
        this.props.setHasCookies(false);
      }
      this.setState({appIsReady: true});
    }
  }

  render() {
    if (this.state.appIsReady == true) {
      return (
        <AppContainer />
      );
    } else {
      return (
        <AppLoading/>
      );
    }
  }
}


const mapStateToProps = (state: RootReducer) => ({
});

const mapDispatchToProps = {setHasCookies};

const connector = connect(mapStateToProps, mapDispatchToProps);

const ConnectedApp = connector(App);

const AppWithStore = () => (
  <Provider store={store}>
    <ConnectedApp/>
  </Provider>
);

export default AppWithStore;
