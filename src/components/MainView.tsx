import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {Calendar} from 'react-native-calendars';
import {Colors} from '../../assets/colors';
import {Marking} from '../types';
import {CALENDAR_TITLE} from '../Constants';

interface Props {
  logout: () => void;
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  selectedDate: string;
  markingType: Marking;
}

export default class MainView extends Component<Props, State> {
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
        <Calendar
          markingType={this.state.markingType}
          onDayPress={(day) => {
            this.toggleSelectedDay(day);
          }}
          minDate={new Date().toISOString().slice(0, 10)}
          markedDates={{
            [this.state.selectedDate]: {selected: true, selectedColor: Colors.YELLOW}
          }}
          firstDay={1}
          style={styles.calendar}/>
      </View>
    );
  }
}

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
