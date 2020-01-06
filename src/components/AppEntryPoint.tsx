import React, {Component} from 'react';
import LoginView from './LoginView';
import {getAuthState, setLogOutState} from '../actions/authActions';
import {connect, ConnectedProps} from 'react-redux';
import LoadingView from './LoadingView';
import {UserRole} from '../types';
import {NavigationScreenProp} from 'react-navigation';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
}

class AppEntryPoint extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    // Clear login state so that componentWillReceiveProps always get called
    this.props.setLogOutState();
    this.props.getAuthState();
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

const mapDispatchToProps = {getAuthState, setLogOutState};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AppEntryPoint);
