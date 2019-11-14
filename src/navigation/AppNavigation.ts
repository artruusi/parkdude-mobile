import {createDrawerNavigator} from 'react-navigation-drawer';
import MainView from '../components/MainView';
import LogOut from '../components/LogOut';
import MyReservationsView from '../components/MyParkingsView';


const AppNavigation = createDrawerNavigator(
  {
    MainView: {screen: MainView},
    MyReservationsView: {screen: MyReservationsView},
    LogOut: {screen: LogOut}
  },
  {
    initialRouteName: 'MainView'
  }
);

export default AppNavigation;
