/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import MainView from '../components/MainView';
import LogOut from '../components/LogOut';
import AboutPage from '../components/AboutPageView';
import MyReservationsView from '../components/MyParkingsView';
import ProfileView from '../components/ProfileView';
import {createStackNavigator} from 'react-navigation-stack';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';


const TabNavigator = createBottomTabNavigator(
  {
    MainView: {
      screen: MainView,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Park',
        tabBarIcon: (props) => (
          <Image style={[
            styles.icon,
            props.focused ? {} : styles.unfocusedIcon,
            {width: 40, height: 40, resizeMode: 'contain'}
          ]}
          source={require('../../assets/icons/ic-parking/drawable-hdpi/ic_parking.png')}/>
        )
      })
    },
    MyReservationsView: {
      screen: MyReservationsView,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Parkings',
        tabBarIcon: (props) => (
          <Image style={[
            styles.icon,
            props.focused ? {} : styles.unfocusedIcon,
            {width: 40, height: 40, resizeMode: 'contain'}
          ]}
          source={require('../../assets/icons/ic-bookings/drawable-hdpi/ic_bookings.png')}/>
        )
      })
    }
  },
  // configs
  {
    tabBarOptions: {
      style: {height: 88},
      labelStyle: {
        fontFamily: 'Exo2-bold',
        fontSize: 14,
        marginBottom: 8
      },
      activeTintColor: 'black'
    }
  }
);


const DrawerNavigation = createDrawerNavigator(
  {
    Parkings: {screen: TabNavigator},
    Profile: {screen: ProfileView},
    About: {screen: AboutPage},
    LogOut: {screen: LogOut}
  },
  {
    initialRouteName: 'Parkings',
    contentOptions: {
      activeTintColor: 'black',
      labelStyle: {
        fontFamily: 'Exo2-bold',
        fontSize: 14,
      }
    }
  }
);


const AppNavigation = createStackNavigator(
  {
    DrawerStack: {
      screen: DrawerNavigation,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Parkdude',
        headerTitleStyle: {fontFamily: 'Exo2-bold'},
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
  },
  unfocusedIcon: {
    opacity: 0.2
  }
});

export default AppNavigation;
