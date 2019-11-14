import React, {Component} from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import MainView from '../components/MainView';
import LogOut from '../components/LogOut';
import MyReservationsView from '../components/MyParkingsView';
import {createStackNavigator} from 'react-navigation-stack';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';


const TabNavigator = createBottomTabNavigator(
  {
    MainView: {
      screen: MainView,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Park',
        tabBarIcon: (
          <Image style={styles.icon} source={require('../../assets/icons/ic-parking/drawable-hdpi/ic_parking.png')}/>
        )
      })
    },
    MyReservationsView: {
      screen: MyReservationsView,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Parkings',
        tabBarIcon: (
          <Image style={styles.icon} source={require('../../assets/icons/ic-bookings/drawable-hdpi/ic_bookings.png')}/>
        )
      })
    }
  },
  // configs
  {
    tabBarOptions: {
      style: {height: 90}
    }
  }
);


const DrawerNavigation = createDrawerNavigator(
  {
    MainView: {screen: TabNavigator},
    LogOut: {screen: LogOut}
  },
  {
    initialRouteName: 'MainView'
  }
);


const AppNavigation = createStackNavigator(
  {
    DrawerStack: {
      screen: DrawerNavigation,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Parkdude',
        headerLeft: (
          <TouchableOpacity style={styles.icon} onPress={() => navigation.toggleDrawer()}>
            <Image source={require('../../assets/icons/ic-profile/drawable-hdpi/ic_profile.png')}/>
          </TouchableOpacity>
        )
      })
    }
  },
  {
    initialRouteName: 'DrawerStack',
  }
);

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10
  }
});

export default AppNavigation;
