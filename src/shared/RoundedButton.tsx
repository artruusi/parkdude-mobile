import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../assets/colors';

export interface RoundedButtonProps {
    onPress: () => void;
    disabled: boolean;
    buttonText: string;
    buttonStyle: StyleSheet;
    textStyle: StyleSheet;
}

export class RoundedButton extends Component<RoundedButtonProps> {
  constructor(props: RoundedButtonProps) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.button, (this.props.disabled ? styles.disabledButton : {}), this.props.buttonStyle]}
        onPress={this.props.onPress}
        disabled={this.props.diasbled}
        activeOpacity={this.props.disabled ? 1 : 0.7}>
        <Text style={[styles.buttonText, this.props.textStyle]}>{this.props.buttonText}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 327,
    height: 43,
    borderRadius: 21.7,
    backgroundColor: Colors.YELLOW,
  },
  disabledButton: {
    backgroundColor: Colors.DISABLED,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    // fontFamily: 'Roboto',
  }
});
