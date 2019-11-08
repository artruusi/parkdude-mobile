import React, {Component} from 'react';
import LoginView from './LoginView';
import {getAuthState} from '../actions/authActions';
import {connect} from 'react-redux';
import LoadingView from './LoadingView';
import {UserRole} from '../types';

interface DispatchProps {
  navigation: any;
  getAuthState: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  hasErrors: boolean;
  error: string;
}

type Props = DispatchProps;

class AppEntryPoint extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAuthState();
  }

  componentWillReceiveProps(receivedProps) {
    if (receivedProps.isAuthenticated) {
      if (receivedProps.userRole == UserRole.UNVERIFIED) {
        this.props.navigation.navigate('WaitForConfirmationView');
      }
      if (receivedProps.userRole == UserRole.VERIFIED) {
        this.props.navigation.navigate('App');
      }
    }
  }

  render() {
    if (!this.props.isAuthenticated && !this.props.loading && !this.props.hasErrors) {
      return (
        <LoginView navigation={this.props.navigation}/>
      );
    } else {
      return (
        <LoadingView error={this.props.error}/>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userRole: state.auth.userRole,
  loading: state.auth.loading,
  hasErrors: state.error.hasErrors,
  error: state.error.error
});

const mapDispatchToProps = {getAuthState};

export default connect(mapStateToProps, mapDispatchToProps)(AppEntryPoint);
