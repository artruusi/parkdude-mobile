import React, {Component} from 'react';
import { NativeRouter, Route, Redirect, Switch } from 'react-router-native';
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
    this.checkIfAuthenticated();
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
