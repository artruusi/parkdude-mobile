import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getCalendarSpots} from '../actions/parkingActions';
import {NavigationScreenProp} from 'react-navigation';
import {Calendar} from 'react-native-calendars';
import { ParkingSpotEvent } from '../types';

interface Props {
  getCalendarSpots: () => void;
  logout: () => void;
  navigation: NavigationScreenProp<any, any>;
  calendarList: any;
  ownedSpots: any;
}

class MainView extends Component<Props> {
  static navigationOptions = {
    drawerLabel: 'MainView' // TODO change this. Home? Reservations?
  };

  componentDidMount() {
    this.props.getCalendarSpots();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <Text>Parkdude mobile client is running succesfully!</Text>
        <Calendar/>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  calendarList: state.parking.calendar,
  ownedSpots: state.parking.ownedSpots
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
  }
});
