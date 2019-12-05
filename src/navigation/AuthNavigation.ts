import {createStackNavigator} from 'react-navigation-stack';
import LoginView from '../components/LoginView';
import AppEntryPoint from '../components/AppEntryPoint';
import OnboardingView from '../components/OnboardingView';
import WaitForConfirmationView from '../components/WaitForConfirmationView';
import EmailLoginView from '../components/EmailLoginView';

const AuthNavigation = createStackNavigator(
  {
    OnboardingView: {screen: OnboardingView},
    AppEntryPoint: {screen: AppEntryPoint},
    Login: {screen: LoginView},
    EmailLoginView: {screen: EmailLoginView},
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
