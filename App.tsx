import React, { Component } from "react";
import { NativeRouter, Route, Redirect, Switch } from "react-router-native";
import LoginView from "./src/components/LoginView";
import MainView from "./src/components/MainView";
import MyReservationsView from "./src/components/MyReservationsView";
import LoadingView from "./src/components/LoadingView";
import PrivateRoute from "./src/PrivateRoute";

import { LOGOUT_URL, LOGIN_STATE_URL } from "react-native-dotenv";
import { UserRole } from "./src/Enums";
import { apiFetch } from "./src/Utils";
import { setCookie } from "./src/CookieStorage";
import { CONNECTION_ERROR } from "./src/Constants";

interface MainState {
  user: string;
  error?: string;
  isAuthenticated: boolean;
  userRole?: UserRole;
  loading: boolean;
}

export default class App extends Component<{}, MainState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      user: "",
      error: "",
      isAuthenticated: false,
      loading: true
    };
    this.updateAuthState = this.updateAuthState.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
    this.logout = this.logout.bind(this);
  }

  async updateAuthState() {
    console.log("checking auth status from backend..");
    try {
      this.setState({ loading: true });
      const authResponse = await apiFetch(LOGIN_STATE_URL);
      const { name, isAuthenticated, userRole } = await authResponse.json();
      this.setState({
        user: name,
        isAuthenticated,
        userRole,
        loading: false
      });
    } catch (err) {
      this.setState({
        error: CONNECTION_ERROR
      });
      console.log(err);
    }
  }

  async componentDidMount() {
    await this.updateAuthState();
  }

  async loginSuccess(sessionId: string) {
    await setCookie(`sessionId=${sessionId}`);
    await this.updateAuthState();
  }

  async logout() {
    await fetch(LOGOUT_URL, { credentials: "include" });
    this.setState({
      isAuthenticated: false,
      user: "",
      userRole: undefined
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingView error={this.state.error}/>
      );
    }

    return (
      <NativeRouter>
        <Redirect exact from="/" to="/main" />
        <Switch>
          <Route
            path="/login"
            render={props =>
              this.state.isAuthenticated ? (
                <Redirect to="/main" />
              ) : (
                <LoginView {...props} loginCallback={this.loginSuccess} />
              )
            }
          />
          <PrivateRoute
            path="/main"
            isAuthenticated={this.state.isAuthenticated}
            render={props => <MainView {...props} logout={this.logout} />}
          />
          <PrivateRoute
            path="/my_reservations"
            isAuthenticated={this.state.isAuthenticated}
            render={props => <MyReservationsView {...props} />}
          />
        </Switch>
      </NativeRouter>
    );
  }
}
