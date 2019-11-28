import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {Calendar} from 'react-native-calendars';
import {Colors} from '../../assets/colors';
import {Marking, CalendarEntry, CalendarDateObject} from '../types';
import {CALENDAR_TITLE} from '../Constants';
import {connect} from 'react-redux';
import {getCalendarSpots} from '../actions/calendarActions';
import {createMarkedDatesObject, getMonthRangeForURL} from '../Utils';

interface Props {
  getCalendarSpots: (string) => void;
  navigation: NavigationScreenProp<any, any>;
  calendarList: CalendarEntry[];
  error: string;
}

interface State {
  userSelectedDates: Record<string, any>;
  markingType: Marking;
}

class MainView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userSelectedDates: {},
      markingType: Marking.SIMPLE // simple/period
    };
    this.toggleSelectedDay = this.toggleSelectedDay.bind(this);
    this.fetchDataForMonth = this.fetchDataForMonth.bind(this);
  }

  static navigationOptions = {
    drawerLabel: 'Parkings'
  };

  componentDidMount() {
    const date = new Date();
    const dateObject = {
      dateString: undefined,
      day: undefined,
      month: date.getMonth()+1,
      timestamp: undefined,
      year: date.getFullYear()

    };
    this.fetchDataForMonth(dateObject);
  }

  fetchDataForMonth(calendarDateObject: CalendarDateObject) {
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
      const newDates = {...this.state.userSelectedDates};
      newDates[day.dateString] = {selected: true, selectedColor: Colors.YELLOW};
      this.setState({
        userSelectedDates: newDates,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: '20%', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.title}>{CALENDAR_TITLE}</Text>
          <Text style={styles.error}>{this.props.error}</Text>
        </View>
        <View style={{height: '80%'}}>
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
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  calendarList: state.calendar.calendar,
  error: state.error.error
});

const mapDispatchToProps = {getCalendarSpots};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    justifyContent: 'center'
  },
  calendar: {
    alignSelf: 'stretch',
  },
  title: {
    width: 299,
    height: 42,
    fontSize: 34.8,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center'
  },
  error: {
    color: Colors.RED,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
