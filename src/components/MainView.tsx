import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {Calendar} from 'react-native-calendars';
import {Colors} from '../../assets/colors';
import {Marking, MonthSelector} from '../types';
import {CALENDAR_TITLE} from '../Constants';
import {connect} from 'react-redux';
import {getCalendarSpots} from '../actions/calendarActions';
import {createMarkedDatesObject} from '../Utils';

interface Props {
  getCalendarSpots: (string) => void;
  navigation: NavigationScreenProp<any, any>;
  calendarList: any;
  error: any;
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
    // remove this
    this.templateMonthDateRangeFunction = this.templateMonthDateRangeFunction.bind(this);
  }

  static navigationOptions = {
    drawerLabel: 'MainView' // TODO change this. Home? Reservations?
  };

  componentDidMount() {
    const date = new Date();
    const dateObject = {year: date.getFullYear(), month: date.getMonth()+1};
    this.fetchDataForMonth(dateObject);
  }

  fetchDataForMonth(calendarDateObject: any) {
    const year = calendarDateObject.year;
    const month = calendarDateObject.month-1;

    console.log('YEAR: ' + year + ', MONTH: ' + month);

    const urlQuery = this.templateMonthDateRangeFunction(year, month);
    this.props.getCalendarSpots(urlQuery);
  }

  templateMonthDateRangeFunction(year: number, month: number) {
    return '?startDate=2019-11-01&endDate=2019-11-30';
  }

  toggleSelectedDay(day: any) {
    if (day.dateString in this.state.userSelectedDates) {
      const newDates = this.state.userSelectedDates;
      delete newDates[day.dateString];
      this.setState({
        userSelectedDates: newDates,
      });
    } else {
      const newDates = this.state.userSelectedDates;
      newDates[day.dateString] = {selected: true, selectedColor: Colors.YELLOW};
      this.setState({
        userSelectedDates: newDates,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{CALENDAR_TITLE}</Text>
        <Text style={styles.error}>{this.props.error}</Text>
        <Calendar
          markingType={this.state.markingType}
          onDayPress={(day) => {
            this.toggleSelectedDay(day);
          }}
          minDate={new Date().toISOString().slice(0, 10)}
          markedDates={
            createMarkedDatesObject(this.props.calendarList, this.state.userSelectedDates)
          }
          firstDay={1}
          hideExtraDays={true}
          onMonthChange={(calendarDateObject) => {
            this.fetchDataForMonth(calendarDateObject);
          }}
          /* onPressArrowLeft={(substractMonth) => {
            this.fetchDataForMonth(MonthSelector.PREVIOUS), substractMonth();
          }}
          onPressArrowRight={(addMonth) => {
            this.fetchDataForMonth(MonthSelector.NEXT), addMonth();
          }}*/
          style={styles.calendar}
          theme={{
            textDayFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textMonthFontWeight: 'bold',
          }}
        />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutButton: {
    margin: 10,
    padding: 10,
    backgroundColor: '#DDD'
  },
  calendar: {
    alignSelf: 'stretch',
  },
  title: {
    width: 299,
    height: 42,
    // fontFamily: "Exo2",
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
