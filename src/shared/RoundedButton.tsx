import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, StyleProp, ActivityIndicator} from 'react-native';
import {Colors} from '../../assets/colors';

export interface RoundedButtonProps {
    onPress: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    buttonText: string;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    isTertiary?: boolean;
}

export class RoundedButton extends Component<RoundedButtonProps> {
  constructor(props: RoundedButtonProps) {
    super(props);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <TouchableOpacity
          style={[
            styles.button,
            this.props.isTertiary === true ? {} : styles.shadow,
            this.props.buttonStyle
          ]}
          disabled={true}>
          <ActivityIndicator size="small" color={Colors.BLACK} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={[
          styles.button,
          // Tertiary buttons don't have shadows
          this.props.isTertiary === true ? {} : styles.shadow,
          (this.props.disabled ? styles.disabledButton : {}),
          this.props.buttonStyle
        ]}
        disabled={this.props.disabled}
        onPress={this.props.onPress}
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
  shadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: Colors.DISABLED,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Exo2-bold',
  }
});
