import {createStackNavigator} from 'react-navigation-stack';
import LoginView from '../components/LoginView';
import AppEntryPoint from '../components/AppEntryPoint';
import OnboardingView from '../components/OnboardingView';
import WaitForConfirmationView from '../components/WaitForConfirmationView';
import PasswordLoginView from '../components/PasswordLoginView';

const AuthNavigation = createStackNavigator(
  {
    OnboardingView: {screen: OnboardingView},
    AppEntryPoint: {screen: AppEntryPoint},
    Login: {screen: LoginView},
    PasswordLoginView: {screen: PasswordLoginView},
    WaitForConfirmationView: {screen: WaitForConfirmationView}
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
