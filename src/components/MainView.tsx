import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {NavigationScreenProp, ScrollView} from 'react-navigation';
import {Calendar} from 'react-native-calendars';
import {Colors} from '../../assets/colors';
import {Marking, CalendarDateObject, BasicParkingSpotData} from '../types';
import {CALENDAR_TITLE, BOOK_NOW, BACK, SELECT_PARKING_SPOT, ALREADY_BOOKED,
  SPOT, OK, TRY_AGAIN, ERROR} from '../Constants';
import {connect, ConnectedProps} from 'react-redux';
import {getCalendarSpots} from '../actions/calendarActions';
import {postReservation} from '../actions/reservationActions';
import {getParkingSpots} from '../actions/parkingActions';
import {createMarkedDatesObject, getMonthRangeForURL, prettierDateOutput} from '../Utils';
import Modal from 'react-native-modal';
import {RoundedButton} from '../shared/RoundedButton';
import {RootReducer} from '../reducers/index';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  userSelectedDates: Record<string, any>;
  markingType: Marking;
  reservationModalVisible: boolean;
  errorModalVisible: boolean;
  selectedSpot: BasicParkingSpotData;
  currentMonth: number;
  currentYear: number;
}

class MainView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userSelectedDates: {},
      markingType: Marking.SIMPLE, // simple/period
      reservationModalVisible: false,
      errorModalVisible: false,
      selectedSpot: {id: 'random', name: 'Any free spot'},
      currentMonth: 0,
      currentYear: 0
    };
    this.toggleSelectedDay = this.toggleSelectedDay.bind(this);
    this.fetchDataForMonth = this.fetchDataForMonth.bind(this);
    this.toggleReservationModal = this.toggleReservationModal.bind(this);
    this.toggleErrorModal = this.toggleErrorModal.bind(this);
    this.selectParkingSpot = this.selectParkingSpot.bind(this);
    this.reserveParkingSpot = this.reserveParkingSpot.bind(this);
    this.getAvailableParkingSpots = this.getAvailableParkingSpots.bind(this);
  }

  componentDidMount() {
    this.getAvailableParkingSpots();
    const date = new Date();
    this.setState({currentMonth: date.getMonth()+1, currentYear: date.getFullYear()}, () => {
      const dateObject = {
        dateString: undefined,
        day: undefined,
        month: this.state.currentMonth,
        timestamp: undefined,
        year: this.state.currentYear
      };
      this.fetchDataForMonth(dateObject);
      this.props.navigation.addListener('willFocus', () => {
        this.fetchDataForMonth({
          dateString: undefined,
          day: undefined,
          month: this.state.currentMonth,
          timestamp: undefined,
          year: this.state.currentYear
        });
      });
    });
  }

  componentDidUpdate(receivedProps) {
    if (receivedProps.error.postReservationError.message !== '') {
      this.toggleErrorModal();
    }
    if (receivedProps.reservation.reservations !== this.props.reservation.reservations) {
      console.log('new succesful reservation, triggering calendar render');
      const dateObject = {
        dateString: undefined,
        day: undefined,
        month: this.state.currentMonth,
        timestamp: undefined,
        year: this.state.currentYear
      };
      this.fetchDataForMonth(dateObject);
      this.setState({userSelectedDates: {}});
    }
  }

  getAvailableParkingSpots() {
    this.props.getParkingSpots();
  }

  fetchDataForMonth(calendarDateObject: CalendarDateObject) {
    this.setState({currentMonth: calendarDateObject.month, currentYear: calendarDateObject.year});
    const year = calendarDateObject.year;
    const month = calendarDateObject.month-1;
    const urlQuery = getMonthRangeForURL(year, month);
    this.props.getCalendarSpots(urlQuery);
  }

  toggleSelectedDay(day: CalendarDateObject) {
    if (day.dateString in this.state.userSelectedDates) {
      const newDates = {...this.state.userSelectedDates};
      delete newDates[day.dateString];
      this.setState({
        userSelectedDates: newDates,
      });
    } else {
      const userReservedDates = this.props.calendarList.filter((entry) =>
        entry.date === day.dateString);
      // array length is zero when data has not been loaded yet
      if (userReservedDates.length > 0) {
        // user cannot click on date which already contains reservation for user
        if (userReservedDates[0].spacesReservedByUser.length === 0) {
          const newDates = {...this.state.userSelectedDates};
          newDates[day.dateString] = {selected: true, selectedColor: Colors.YELLOW};
          this.setState({
            userSelectedDates: newDates,
          });
        }
      }
    }
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

    const bookButtonColor = Object.keys(this.state.userSelectedDates).length === 0 ? Colors.DISABLED : Colors.YELLOW;
    const dropdownButtonColor = Object.keys(this.state.userSelectedDates).length === 0 ? Colors.DISABLED : Colors.WHITE;

    const errorDates = this.props.error.postReservationError.dates.map((date, key) => (
      <Text style={{fontSize: 18, fontFamily: 'Exo2-bold'}} key={key}>- {prettierDateOutput(date)}</Text>
    ));

    return (
      <View style={styles.container}>
        <View style={{...styles.centerContent, height: '15%'}}>
          <Text style={styles.title}>{CALENDAR_TITLE}</Text>
          <Text style={styles.error}>{this.props.error.networkError}</Text>
        </View>

        {/* Calendar component */}

        <View style={{height: '60%', marginBottom: 30}}>
          <Calendar
            markingType={this.state.markingType}
            onDayPress={(day) => {
              this.toggleSelectedDay(day);
            }}
            minDate={new Date()}
            markedDates={
              createMarkedDatesObject(this.props.calendarList, this.state.userSelectedDates)
            }
            firstDay={1}
            hideExtraDays={true}
            onMonthChange={(calendarDateObject) => {
              this.fetchDataForMonth(calendarDateObject);
            }}
            style={styles.calendar}
            theme={{
              textDayFontWeight: 'bold',
              textDayHeaderFontWeight: 'bold',
              textMonthFontWeight: 'bold',
              selectedDayTextColor: 'black'
            }}
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
                  <Text style={{fontFamily: 'Exo2-bold', fontSize: 16}}>{this.state.selectedSpot.name}</Text>
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
          animationInTiming={500}
          animationOutTiming={100}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}>
          <View style={styles.modal}>
            <View style={{...styles.centerContent, margin: 30}}>
              <Text style={{fontSize: 25, fontFamily: 'Exo2-bold'}}>{SELECT_PARKING_SPOT}</Text>
            </View>
            <ScrollView directionalLockEnabled={true}>
              {parkingSpots}
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
  calendarList: state.calendar.calendar,
  reservation: state.reservation,
  parkingSpots: state.parkingSpots,
  error: state.error,
  reserveSpotsLoading: state.loading.reserveSpotsLoading
});

const mapDispatchToProps = {getCalendarSpots, postReservation, getParkingSpots};

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
    height: 42,
    fontSize: 34.8,
    fontFamily: 'Exo2-bold',
    letterSpacing: 0,
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
    shadowColor: '#000',
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
    shadowColor: '#000',
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
