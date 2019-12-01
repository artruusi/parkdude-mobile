import React, {Component} from 'react';
import LoginView from './LoginView';
import {getAuthState, setSimulatedAuthState} from '../actions/authActions';
import {connect} from 'react-redux';
import LoadingView from './LoadingView';
import {UserRole} from '../types';
import {NavigationScreenProp} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  getAuthState: () => void;
  setSimulatedAuthState: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  hasErrors: boolean;
  networkError: string;
}

class AppEntryPoint extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    // TO ENABLE SIMULATION OF AUTHENTICATION FLOW:
    // // CHANGE PLACE OF COMMENTS ON FOLLOWING CODE LINES

    this.props.getAuthState();
    // this.props.setSimulatedAuthState();
  }

  componentWillReceiveProps(receivedProps) {
    if (receivedProps.isAuthenticated) {
      if (receivedProps.userRole === UserRole.UNVERIFIED) {
        this.props.navigation.navigate('WaitForConfirmationView');
      }
      if (receivedProps.userRole === UserRole.VERIFIED || receivedProps.userRole === UserRole.ADMIN) {
        this.props.navigation.navigate('App');
      }
    }
  }

  render() {
    if (!this.props.isAuthenticated && !this.props.loading && this.props.networkError === '') {
      return (
        <LoginView navigation={this.props.navigation}/>
      );
    } else {
      return (
        <LoadingView error={this.props.networkError}/>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userRole: state.auth.userRole,
  loading: state.auth.loading,
  networkError: state.error.networkError
});

const mapDispatchToProps = {getAuthState, setSimulatedAuthState};

export default connect(mapStateToProps, mapDispatchToProps)(AppEntryPoint);
