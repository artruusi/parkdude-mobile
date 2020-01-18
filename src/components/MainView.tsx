import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {NavigationScreenProp, ScrollView} from 'react-navigation';
import {Colors} from '../../assets/colors';
import {Marking, BasicParkingSpotData, CalendarType} from '../types';
import {CALENDAR_TITLE, BOOK_NOW, BACK, SELECT_PARKING_SPOT, ALREADY_BOOKED,
  SPOT, OK, TRY_AGAIN, ERROR} from '../Constants';
import {connect, ConnectedProps} from 'react-redux';
import {postReservation} from '../actions/reservationActions';
import {getParkingSpots} from '../actions/parkingActions';
import {prettierDateOutput} from '../Utils';
import Modal from 'react-native-modal';
import {RoundedButton} from '../shared/RoundedButton';
import {RootReducer} from '../reducers/index';
import ReservationCalendar from './ReservationCalendar';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  userSelectedDates: Record<string, any>;
  reservationModalVisible: boolean;
  errorModalVisible: boolean;
  selectedSpot: BasicParkingSpotData;
  textColorChangeActive: boolean;
}

const randomSpot = {id: 'random', name: 'Any free spot'};

class MainView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userSelectedDates: {},
      reservationModalVisible: false,
      errorModalVisible: false,
      selectedSpot: randomSpot,
      textColorChangeActive: false
    };
    this.toggleReservationModal = this.toggleReservationModal.bind(this);
    this.toggleErrorModal = this.toggleErrorModal.bind(this);
    this.selectParkingSpot = this.selectParkingSpot.bind(this);
    this.reserveParkingSpot = this.reserveParkingSpot.bind(this);
    this.getAvailableParkingSpots = this.getAvailableParkingSpots.bind(this);
    this.blinkSelectedParkingSpotColor = this.blinkSelectedParkingSpotColor.bind(this);
    this.updateUserSelectedDates = this.updateUserSelectedDates.bind(this);
    this.setParkingSpot = this.setParkingSpot.bind(this);
  }

  componentDidUpdate(receivedProps) {
    if (receivedProps.error.postReservationError.message !== '') {
      this.toggleErrorModal();
    }
  }

  getAvailableParkingSpots(dates: string[]) {
    this.props.getParkingSpots(dates);
  }

  setParkingSpot(spot: BasicParkingSpotData) {
    this.setState({selectedSpot: spot});
  }

  updateUserSelectedDates(userSelectedDates: Record<string, any>) {
    // Reset selected spot to 'Any free spot' if more dates are selected after the spot is selected
    this.setState({userSelectedDates});
    if (this.state.selectedSpot.id !== 'random' && Object.keys(userSelectedDates).length > 0) {
      this.setState({
        selectedSpot: randomSpot
      });
      this.blinkSelectedParkingSpotColor();
    }
  }

  blinkSelectedParkingSpotColor() {
    this.setState({textColorChangeActive: true});
    setTimeout(() => this.setState({textColorChangeActive: false}), 1000);
  }

  selectParkingSpot(spot: BasicParkingSpotData) {
    this.setState({selectedSpot: spot});
    this.toggleReservationModal();
  }

  reserveParkingSpot() {
    const dates = Object.keys(this.state.userSelectedDates);
    if (this.state.selectedSpot.id === 'random') {
      const reservation = {
        dates: dates
      };
      this.props.postReservation(reservation);
    } else {
      const reservation = {
        dates: dates,
        parkingSpotId: this.state.selectedSpot.id
      };
      this.props.postReservation(reservation);
    }
  }

  toggleReservationModal() {
    if (!this.state.reservationModalVisible) {
      const dates = Object.keys(this.state.userSelectedDates);
      this.getAvailableParkingSpots(dates);
    }
    this.setState({reservationModalVisible: !this.state.reservationModalVisible});
  }

  toggleErrorModal() {
    this.setState({errorModalVisible: !this.state.errorModalVisible});
  }

  render() {
    const parkingSpots = this.props.parkingSpots.map((spot) => (
      <TouchableOpacity
        key={spot.id}
        style={{...styles.modalButton,
          backgroundColor: Colors.WHITE}}
        onPress={() => this.selectParkingSpot(spot)}>
        <Text style={{fontSize: 18, fontFamily: 'Exo2-bold'}}>{spot.name}</Text>
      </TouchableOpacity>
    ));

    const dropdownButtonColor = Object.keys(this.state.userSelectedDates).length === 0 ? Colors.DISABLED : Colors.WHITE;

    const errorDates = this.props.error.postReservationError.dates.map((date, key) => (
      <Text style={{fontSize: 18, fontFamily: 'Exo2-bold'}} key={key}>- {prettierDateOutput(date)}</Text>
    ));

    return (
      <View style={styles.container}>
        <View style={{...styles.centerContent}}>
          <Text style={styles.title}>{CALENDAR_TITLE}</Text>
          <Text style={styles.error}>{this.props.error.networkError}</Text>
        </View>

        {/* Calendar component */}

        <View style={{height: '60%', marginBottom: 32}}>
          <ReservationCalendar
            navigation={this.props.navigation}
            markingType={Marking.SIMPLE}
            calendarType={CalendarType.RESERVATION}
            updateUserSelectedDates={this.updateUserSelectedDates}
            setParkingSpot={this.setParkingSpot}
          />
        </View>

        {/* Buttons for selecting parking spot and booking reservation */}

        <View style={{height: '25%', flex: 1, flexDirection: 'row'}}>
          <View style={{...styles.centerContent, width: '50%'}}>
            <TouchableOpacity
              style={{...styles.dropdownButton, backgroundColor: dropdownButtonColor}}
              onPress={this.toggleReservationModal}
              disabled={Object.keys(this.state.userSelectedDates).length === 0}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{...styles.centerContent, width: '70%'}}>
                  {
                    this.state.textColorChangeActive ?
                      <Text style={{fontFamily: 'Exo2-bold', fontSize: 16, color: Colors.RED}}>
                        {this.state.selectedSpot.name}
                      </Text> :
                      <Text style={{fontFamily: 'Exo2-bold', fontSize: 16}}>{this.state.selectedSpot.name}</Text>
                  }
                </View>
                <View style={{...styles.centerContent, width: '30%'}}>
                  <Image source={require('../../assets/icons/ic-dropdown/drawable-hdpi/ic_dropdown.png')}/>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{...styles.centerContent, width: '50%'}}>
            <RoundedButton
              onPress={this.reserveParkingSpot}
              disabled={Object.keys(this.state.userSelectedDates).length === 0}
              buttonText={BOOK_NOW}
              buttonStyle={styles.bookButton}
              isLoading={this.props.reserveSpotsLoading}
            />
          </View>
        </View>

        {/* Modal for selecting parkingSpot */}

        <Modal
          isVisible={this.state.reservationModalVisible}
          onBackdropPress={this.toggleReservationModal}
          onBackButtonPress={this.toggleReservationModal}
          style={{padding: 10}}
          animationInTiming={500}
          animationOutTiming={100}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}>
          <View style={styles.modal}>
            <View style={{...styles.centerContent, margin: 30}}>
              <Text style={{fontSize: 25, fontFamily: 'Exo2-bold'}}>{SELECT_PARKING_SPOT}</Text>
            </View>
            <ScrollView directionalLockEnabled={true}>
              {
                this.props.getParkingSpotsLoading ?
                  <ActivityIndicator
                    size='large'
                    color={Colors.BLACK}
                    style={{marginVertical: 120}}
                  /> :
                  parkingSpots
              }
            </ScrollView>
            <View style={styles.centerContent}>
              <RoundedButton
                onPress={this.toggleReservationModal}
                buttonText={BACK}
                buttonStyle={styles.redButton}
              />
            </View>
          </View>
        </Modal>

        {/* Modal for showing error message */}

        <Modal
          isVisible={this.state.errorModalVisible}
          onBackdropPress={this.toggleErrorModal}
          onBackButtonPress={this.toggleErrorModal}
          style={{padding: 10}}
          animationInTiming={500}
          animationOutTiming={100}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}>
          <View style={styles.modal}>
            <View style={{margin: 30}}>
              <Text style={{fontSize: 25, fontFamily: 'Exo2-bold', color: Colors.RED}}>{ERROR}!</Text>
              <Text style={{fontSize: 18, fontFamily: 'Exo2-bold', textDecorationLine: 'underline'}}>
                {SPOT}: {this.state.selectedSpot.name}
              </Text>
              <Text style={{fontSize: 18, fontFamily: 'Exo2-bold'}}>
                {ALREADY_BOOKED}:
              </Text>
              {errorDates}
              <Text style={{fontSize: 18, fontFamily: 'Exo2-bold'}}>{TRY_AGAIN}</Text>
            </View>
            <RoundedButton
              onPress={this.toggleErrorModal}
              buttonText={OK}
              buttonStyle={styles.redButton}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state: RootReducer) => ({
  reservation: state.reservation,
  parkingSpots: state.parkingSpots,
  error: state.error,
  reserveSpotsLoading: state.loading.reserveSpotsLoading,
  getParkingSpotsLoading: state.loading.getParkingSpotsLoading,
  getMonthLoading: state.loading.getMonthLoading
});

const mapDispatchToProps = {postReservation, getParkingSpots};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
    justifyContent: 'center'
  },
  calendar: {
    backgroundColor: Colors.APP_BACKGROUND,
    alignSelf: 'stretch',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: 299,
    height: 48,
    fontSize: 34.8,
    fontFamily: 'Exo2-bold',
    letterSpacing: 0,
    margin: 16
  },
  error: {
    color: Colors.RED,
    fontSize: 20,
    fontFamily: 'Exo2-bold',
  },
  dropdownButton: {
    width: 163.5,
    height: 43,
    borderRadius: 21.7,
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bookButton: {
    width: 163.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redButton: {
    width: 250,
    backgroundColor: Colors.RED,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  modalButton: {
    width: 250,
    height: 43,
    borderRadius: 21.7,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.APP_BACKGROUND,
    borderRadius: 21.7,
    margin: 20
  }
});
