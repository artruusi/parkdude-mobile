import React, {Component} from 'react';
import { NativeRouter, Route, Redirect } from 'react-router-native';
import LoginView from './src/components/LoginView';
import MainView from './src/components/MainView';
import MyReservationsView from './src/components/MyReservationsView';
import MakeReservationView from './src/components/MakeReservationView';
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

  render() {
    return (
      <NativeRouter>
        <Redirect exact from="/" to="/main" />
        <Route path="/login" component={LoginView} />
        <PrivateRoute path="/main" component={MainView} />
        <PrivateRoute path="/my_reservations" component={MyReservationsView} />
        <PrivateRoute path="/make_reservation" component={MakeReservationView} />
      </NativeRouter>
    );
  }
}
