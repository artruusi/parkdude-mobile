import {createDrawerNavigator} from 'react-navigation-drawer';
import MainView from '../components/MainView';
import LogOut from '../components/LogOut';


const AppNavigation = createDrawerNavigator(
  {
    MainView: {screen: MainView},
    LogOut: {screen: LogOut}
  },
  {
    initialRouteName: 'MainView'
  }
);

export default AppNavigation;
