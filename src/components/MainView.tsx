import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getCalendarSpots} from '../actions/parkingActions';
import {NavigationScreenProp} from 'react-navigation';
import {Calendar} from 'react-native-calendars';
import {Colors} from '../../assets/colors';
import {Marking, MonthSelector} from '../types';
import {CALENDAR_TITLE} from '../Constants';
import { createMarkedDatesObject } from '../Utils';

interface Props {
  getCalendarSpots: (string) => void;
  navigation: NavigationScreenProp<any, any>;
  calendarList: any;
  error: any;
}

interface State {
  selectedDate: string;
  markingType: Marking;
}

class MainView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedDate: '',
      markingType: Marking.SIMPLE // simple/period
    };
    this.toggleSelectedDay = this.toggleSelectedDay.bind(this);
  }

  static navigationOptions = {
    drawerLabel: 'MainView' // TODO change this. Home? Reservations?
  };

  componentDidMount() {
    this.fetchDataForMonth(MonthSelector.CURRENT);
  }

  fetchDataForMonth(monthSelector: MonthSelector) {
    if (monthSelector === MonthSelector.CURRENT) {
      const templateUrlParams = '?startDate=2019-11-01&endDate=2019-11-30';
      this.props.getCalendarSpots(templateUrlParams);
    }
    if (monthSelector === MonthSelector.PREVIOUS) {
      // get date range by month
    }
    if (monthSelector === MonthSelector.NEXT) {
      // get date range by month
    }
  }

  toggleSelectedDay(day) {
    if (this.state.selectedDate === day.dateString) {
      this.setState({selectedDate: ''});
    } else {
      this.setState({selectedDate: day.dateString});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{CALENDAR_TITLE}</Text>
        <Text>{this.props.error}</Text>
        <Calendar
          markingType={this.state.markingType}
          onDayPress={(day) => {
            this.toggleSelectedDay(day);
          }}
          minDate={new Date().toISOString().slice(0, 10)}
          markedDates={
            Object.assign(
              {[this.state.selectedDate]: {selected: true, selectedColor: Colors.YELLOW}},
              createMarkedDatesObject(this.props.calendarList)
            )
          }
          firstDay={1}
          hideExtraDays={true}
          onPressArrowLeft={(substractMonth) => {
            this.fetchDataForMonth(MonthSelector.PREVIOUS), substractMonth();
          }}
          onPressArrowRight={(addMonth) => {
            this.fetchDataForMonth(MonthSelector.NEXT), addMonth();
          }}
          style={styles.calendar}
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
    textAlign: 'center',
  }
});
