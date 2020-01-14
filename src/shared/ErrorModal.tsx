import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {View, Text, StyleSheet} from 'react-native';
import {RoundedButton} from './RoundedButton';
import {Colors} from '../../assets/colors';
import {TRY_AGAIN, OK} from '../Constants';

export interface ErrorModalProps {
  toggleErrorModal: () => void;
  isVisible: boolean;
  errorText: string;
}

export class ErrorModal extends Component<ErrorModalProps> {
  constructor(props: ErrorModalProps) {
    super(props);
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.toggleErrorModal}
        animationInTiming={500}
        animationOutTiming={100}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}>
        <View style={styles.modal}>
          <View style={{margin: 30}}>
            <Text style={{fontSize: 25, fontFamily: 'Exo2-bold', color: Colors.RED}}>{this.props.errorText}!</Text>
            <Text style={{fontSize: 18, fontFamily: 'Exo2-bold'}}>
              {TRY_AGAIN}
            </Text>
          </View>
          <RoundedButton
            onPress={this.props.toggleErrorModal}
            buttonText={OK}
            buttonStyle={{...styles.modalButton, backgroundColor: Colors.RED}}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalButton: {
    width: 250,
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.APP_BACKGROUND,
    borderRadius: 21.7,
    margin: 20
  }
});
