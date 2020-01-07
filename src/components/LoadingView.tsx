import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, View, Text} from 'react-native';
import {RoundedButton} from '../shared/RoundedButton';
import {clearErrorState} from '../actions/errorActions';
import {connect, ConnectedProps} from 'react-redux';
import {getAuthState} from '../actions/authActions';
import {REFRESH} from '../Constants';

type Props = ConnectedProps<typeof connector> & {
  error: string;
}

export class LoadingView extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }

  renderLoading() {
    return (
      <View style={styles.container}>
        <Text>{this.props.error}</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  renderError() {
    // Note: Currently errors are always network errors
    return (
      <View style={styles.container}>
        <Text>{this.props.error}</Text>
        <RoundedButton
          onPress={this.refresh}
          buttonText={REFRESH}
          buttonStyle={styles.button}
        />
      </View>
    );
  }

  refresh() {
    this.props.clearErrorState();
    this.props.getAuthState();
  }

  render() {
    if (this.props.error) {
      return this.renderError();
    }
    return this.renderLoading();
  }
}

const mapDispatchToProps = {getAuthState, clearErrorState};

const connector = connect(null, mapDispatchToProps);

export default connector(LoadingView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16
  }
});
