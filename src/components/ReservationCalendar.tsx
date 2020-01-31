import React, {Component} from 'react';
import {Calendar} from 'react-native-calendars';
import {ConnectedProps, connect} from 'react-redux';
import {NavigationScreenProp, NavigationEventSubscription} from 'react-navigation';
import {Marking, CalendarDateObject, CalendarType, BasicParkingSpotData, CalendarEntry} from '../types';
import {RootReducer} from '../reducers';
import {Colors} from '../../assets/colors';
import {createMarkedDatesObject, parkingEventsToCalendarEntries} from '../Utils';
import {getCalendarSpots} from '../actions/calendarActions';
import {Platform} from 'react-native';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
  markingType: Marking;
  calendarType: CalendarType;
  updateUserSelectedDates: (userSelectedDates: Record<string, any>) => void;
  setParkingSpot?: (spot: BasicParkingSpotData) => void;
  calendarData?: CalendarEntry[];
  userSelectedDates: Record<string, any>;
  parkingSpotId?: string;
}

interface CalendarState {
  calendarData: CalendarEntry[];
  currentMonth: number;
  currentYear: number;
  maxDate: Date;
}

class ReservationCalendar extends Component<Props, CalendarState> {
  constructor(props: Props) {
    super(props);
    const currentDate = new Date();
    const initMaxDate = new Date();
    const maxDate = new Date(initMaxDate.setMonth(initMaxDate.getMonth()+11));
    // Adding (full) months to dates have different outcomes based on which is
    // the day parameter of the Date object. The day is set to middle of the
    // month to eliminate that. The date does not matter because we are only
    // interested about the month.
    maxDate.setDate(15);
    this.state = {
      calendarData: [],
      currentMonth: currentDate.getMonth()+1,
      currentYear: currentDate.getFullYear(),
      maxDate: maxDate
    };
    this.fetchDataForMonth = this.fetchDataForMonth.bind(this);
    this.toggleSelectedDay = this.toggleSelectedDay.bind(this);
    this.monthCanBeAdded = this.monthCanBeAdded.bind(this);
    this.monthCanBeSubstracted = this.monthCanBeSubstracted.bind(this);
  }

  private focusListener: NavigationEventSubscription;

  componentDidMount() {
    if (this.props.calendarType === CalendarType.RESERVATION) {
      const dateObject = {
        dateString: undefined,
        day: undefined,
        month: this.state.currentMonth,
        timestamp: undefined,
        year: this.state.currentYear
      };
      this.fetchDataForMonth(dateObject);
      this.focusListener = this.props.navigation.addListener('willFocus', () => {
        this.fetchDataForMonth({
          dateString: undefined,
          day: undefined,
          month: this.state.currentMonth,
          timestamp: undefined,
          year: this.state.currentYear
        });
      });
    }
    if (this.props.calendarType === CalendarType.RELEASE) {
      this.setState({calendarData: this.props.calendarData});
    }
  }

  componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener.remove();
    }
  }

  componentDidUpdate(prevProps: Props) {
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
        const releasesBySpot = this.props.myReservations.releases.filter((r) =>
          r.parkingSpot.id == this.props.parkingSpotId);
        this.setState({calendarData: parkingEventsToCalendarEntries(releasesBySpot)});
      }
    }
  }

  monthCanBeAdded() {
    // Calendar range is set on (current month + 11), meaning that every month is
    // represented only once for user
    if (this.state.currentMonth === this.state.maxDate.getMonth()+1) {
      return false;
    }
    return true;
  }

  monthCanBeSubstracted() {
    const currentDate = new Date();
    // Calendar range is set in a way that user can't navigate to the same month next year.
    // So the month can't be same in other situations than when calendar state is on the
    // current month.
    if (this.state.currentMonth === currentDate.getMonth()+1) {
      return false;
    }
    return true;
  }

  fetchDataForMonth(calendarDateObject: CalendarDateObject) {
    const {year, month} = calendarDateObject;
    if (this.props.calendarType === CalendarType.RESERVATION) {
      this.props.getCalendarSpots(year, month-1);
    }
    this.setState({currentMonth: month, currentYear: year});
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

  isLoading() {
    if (this.props.calendarType === CalendarType.RESERVATION) {
      return this.props.getMonthLoading;
    }
    // Releases are preloaded and not fetched by month, so they don't need to be checked
    return false;
  }

  render() {
    // Marked dates must be empty for loading indicator to appear
    const markedDates = this.isLoading() ? {} : createMarkedDatesObject(
      this.state.calendarData,
      this.props.userSelectedDates,
      this.props.calendarType
    );
    return (
      <Calendar
        markingType={this.props.markingType}
        displayLoadingIndicator={this.isLoading()}
        onDayPress={(day) => {
          this.toggleSelectedDay(day);
        }}
        // Date in current month is required for loading indicator to show
        // https://github.com/wix/react-native-calendars/issues/460
        current={new Date(this.state.currentYear, this.state.currentMonth-1, 1)}
        minDate={new Date()}
        markedDates={markedDates}
        firstDay={1}
        hideExtraDays={true}
        onMonthChange={(calendarDateObject) => {
          this.fetchDataForMonth(calendarDateObject);
        }}
        onPressArrowLeft={
          (substractMonth) => this.monthCanBeSubstracted() ? substractMonth() : undefined
        }
        onPressArrowRight={
          (addMonth) => this.monthCanBeAdded() ? addMonth() : undefined
        }
        theme={{
          'textDayFontFamily': 'Exo2-bold',
          'textMonthFontFamily': 'Exo2-bold',
          'textDayHeaderFontFamily': 'Exo2-bold',
          'selectedDayTextColor': 'black',
          'stylesheet.day.basic': {
            base: {
              // Original: 32
              width: 34,
              height: 34,
              alignItems: 'center',
              justifyContent: 'center',
              // paddingBottom needed to counter text's default topMargin for centering
              // (https://github.com/wix/react-native-calendars/blob/master/src/calendar/day/basic/style.js#L15)
              paddingBottom: Platform.OS === 'android' ? 4 : 6
            },
            selected: {
              borderRadius: 17
            },
          },
          'stylesheet.calendar.main': {
            week: {
              // If base size is increased, these may need to be lowered
              marginTop: 6,
              marginBottom: 6,
              flexDirection: 'row',
              justifyContent: 'space-around'
            }
          }
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
