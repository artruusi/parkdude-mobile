import React, {Component} from 'react';
import {Calendar} from 'react-native-calendars';
import {ConnectedProps, connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import {Marking, CalendarDateObject, CalendarType, BasicParkingSpotData, CalendarEntry} from '../types';
import {RootReducer} from '../reducers';
import {Colors} from '../../assets/colors';
import {createMarkedDatesObject, parkingEventsToCalendarEntries} from '../Utils';
import {getCalendarSpots} from '../actions/calendarActions';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
  markingType: Marking;
  calendarType: CalendarType;
  updateUserSelectedDates: (userSelectedDates: Record<string, any>) => void;
  setParkingSpot?: (spot: BasicParkingSpotData) => void;
  calendarData?: CalendarEntry[];
  userSelectedDates: Record<string, any>;
}

interface CalendarState {
  calendarData: CalendarEntry[];
  currentMonth: number;
  currentYear: number;
}

class ReservationCalendar extends Component<Props, CalendarState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      calendarData: [],
      currentMonth: 0,
      currentYear: 0
    };
    this.fetchDataForMonth = this.fetchDataForMonth.bind(this);
    this.toggleSelectedDay = this.toggleSelectedDay.bind(this);
  }

  componentDidMount() {
    const date = new Date();
    this.setState({currentMonth: date.getMonth()+1, currentYear: date.getFullYear()}, () => {
      if (this.props.calendarType === CalendarType.RESERVATION) {
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
      }
    });
    if (this.props.calendarType === CalendarType.RELEASE) {
      this.setState({calendarData: this.props.calendarData});
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.auth.isAuthenticated) {
      this.props.navigation.navigate('Auth');
    }
    if (prevProps.reservation.reservations !== this.props.reservation.reservations) {
      console.log('new succesful reservation, triggering calendar render');
      const dateObject = {
        dateString: undefined,
        day: undefined,
        month: this.state.currentMonth,
        timestamp: undefined,
        year: this.state.currentYear
      };
      this.fetchDataForMonth(dateObject);
      this.props.setParkingSpot({id: 'random', name: 'Any free spot'});
    }
    if (prevProps.calendarList !== this.props.calendarList) {
      this.setState({calendarData: this.props.calendarList});
    }
    if (this.props.calendarData !== undefined) {
      if (prevProps.myReservations.releases !== this.props.myReservations.releases) {
        console.log('new succesful release, triggering calendar render');
        this.setState({calendarData: parkingEventsToCalendarEntries(this.props.myReservations.releases)});
      }
    }
  }

  fetchDataForMonth(calendarDateObject: CalendarDateObject) {
    if (this.props.calendarType === CalendarType.RESERVATION) {
      this.setState({currentMonth: calendarDateObject.month, currentYear: calendarDateObject.year});
      const year = calendarDateObject.year;
      const month = calendarDateObject.month-1;
      this.props.getCalendarSpots(year, month);
    }
  }

  toggleSelectedDay(day: CalendarDateObject) {
    if (day.dateString in this.props.userSelectedDates) {
      const newDates = {...this.props.userSelectedDates};
      delete newDates[day.dateString];
      this.props.updateUserSelectedDates(newDates);
    } else {
      if (this.props.calendarType === CalendarType.RESERVATION) {
        const userReservedDates = this.props.calendarList.filter((entry) =>
          entry.date === day.dateString);
        // Checking if data is still loading.
        // User cannot click on date which already contains reservation for user
        if (!this.props.getMonthLoading && userReservedDates[0] !== undefined &&
          userReservedDates[0].spacesReservedByUser.length === 0 &&
          userReservedDates[0].availableSpaces !== 0) {
          const newDates = {...this.props.userSelectedDates};
          newDates[day.dateString] = {selected: true, selectedColor: Colors.YELLOW};
          this.props.updateUserSelectedDates(newDates);
        }
      }
      if (this.props.calendarType === CalendarType.RELEASE) {
        const userReleasedDates = this.state.calendarData.filter((entry) =>
          entry.date == day.dateString
        );
        // user cannot click on date which already contains release for user
        if (userReleasedDates.length === 0) {
          const newDates = {...this.props.userSelectedDates};
          newDates[day.dateString] = {selected: true, selectedColor: Colors.YELLOW};
          this.props.updateUserSelectedDates(newDates);
        }
      }
    }
  }

  render() {
    return (
      <Calendar
        markingType={this.props.markingType}
        onDayPress={(day) => {
          this.toggleSelectedDay(day);
        }}
        minDate={new Date()}
        markedDates={
          createMarkedDatesObject(this.state.calendarData, this.props.userSelectedDates, this.props.calendarType)
        }
        firstDay={1}
        hideExtraDays={true}
        onMonthChange={(calendarDateObject) => {
          this.fetchDataForMonth(calendarDateObject);
        }}
        theme={{
          textDayFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          selectedDayTextColor: 'black'
        }}
      />
    );
  }
}

const mapStateToProps = (state: RootReducer) => ({
  auth: state.auth,
  calendarList: state.calendar.calendar,
  reservation: state.reservation,
  myReservations: state.myReservations,
  error: state.error,
  reserveSpotsLoading: state.loading.reserveSpotsLoading,
  getMonthLoading: state.loading.getMonthLoading
});

const mapDispatchToProps = {getCalendarSpots};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ReservationCalendar);
