import {createStackNavigator} from 'react-navigation-stack';
import LoginView from '../components/LoginView';
import AppEntryPoint from '../components/AppEntryPoint';
import OnboardingView from '../components/OnboardingView';

const AuthNavigation = createStackNavigator(
  {
    OnboardingView: {screen: OnboardingView},
    AppEntryPoint: {screen: AppEntryPoint},
    Login: {screen: LoginView}
  },
  {
    initialRouteName: 'OnboardingView',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default AuthNavigation;
