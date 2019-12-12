import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../assets/colors';

export interface ButtonProps {
    onPress: () => void;
    buttonText: string;
    styleButton: StyleSheet;
    styleText: StyleSheet;
}

export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={[styles.button, this.props.styleButton]} onPress={this.props.onPress}>
        <Text style={[styles.buttonText, this.props.styleText]}>{this.props.buttonText}</Text>
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
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    // fontFamily: 'Roboto',
  }
});
