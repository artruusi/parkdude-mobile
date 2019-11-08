import React, {Component} from 'react';
import LoginView from './LoginView';
import {getAuthState} from '../actions/authActions';
import {connect} from 'react-redux';
import LoadingView from './LoadingView';

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
      this.props.navigation.navigate('App');
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
  loading: state.auth.loading,
  hasErrors: state.error.hasErrors,
  error: state.error.error
});

const mapDispatchToProps = {getAuthState};

export default connect(mapStateToProps, mapDispatchToProps)(AppEntryPoint);
