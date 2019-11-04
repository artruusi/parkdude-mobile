import {createDrawerNavigator} from 'react-navigation-drawer';
import MainView from '../components/MainView';


const AppNavigation = createDrawerNavigator(
  {
    MainView: {screen: MainView}
  },
  {
    initialRouteName: 'MainView'
  }
);

export default AppNavigation;
