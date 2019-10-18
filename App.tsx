import React, {Component} from 'react';
import { NativeRouter, Route, Redirect, Switch } from 'react-router-native';
import { Linking } from 'react-native';
import LoginView from './src/components/LoginView';
import MainView from './src/components/MainView';
import MyReservationsView from './src/components/MyReservationsView';
import PrivateRoute from './src/PrivateRoute';

interface MainState {
  user: string,
  error: Object,
  isAuthenticated: boolean
}

export default class App extends Component<{}, MainState> {
  
  constructor(props: {}) {
    super(props);
    this.state = {
      user: "",
      error: {},
      isAuthenticated: false
		}
		this.checkIfAuthenticated = this.checkIfAuthenticated.bind(this);
    this.updateAuthState = this.updateAuthState.bind(this);
    this.loginSuccessRedirect = this.loginSuccessRedirect.bind(this);
    this.loginFailureRedirect = this.loginFailureRedirect.bind(this);
	}
	

	checkIfAuthenticated() {
    console.log("checking auth status from backend..");

    // if authenticated 
    // this.updateAuthState();
	}
	

  updateAuthState() {
    this.setState({
      user: "TestUser",
      error: {},
      isAuthenticated: true
    });
    console.log(this.state);
  }


  componentDidMount() {
		Linking.addEventListener('/login/success', this.loginSuccessRedirect);
    Linking.addEventListener('/login/failure', this.loginFailureRedirect);
    this.checkIfAuthenticated();
	}
	

	loginSuccessRedirect() {
    this.updateAuthState();
    return(
      <Redirect to='/main' />
    );
  }


  loginFailureRedirect() {
    return(
      <Redirect to='/login' />
    );
  }


  render() {
    return (
      <NativeRouter>
        <Redirect exact from="/" to="/main" />
				<Switch>
					<Route path="/login" component={LoginView} />
					<PrivateRoute path="/main" isAuthenticated={this.state.isAuthenticated}>
						<MainView />
					</PrivateRoute>
					<PrivateRoute path="/my_reservations" isAuthenticated={this.state.isAuthenticated}>
						<MyReservationsView />
					</PrivateRoute>
				</Switch>
      </NativeRouter>
    );
  }
}
