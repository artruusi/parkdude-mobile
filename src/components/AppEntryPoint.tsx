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
    this.props.getAuthState();
    this.componentDidUpdate(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated) {
      if (this.props.userRole === UserRole.UNVERIFIED) {
        this.props.navigation.navigate('WaitForConfirmationView');
      }
      if (this.props.userRole === UserRole.VERIFIED || this.props.userRole === UserRole.ADMIN) {
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
