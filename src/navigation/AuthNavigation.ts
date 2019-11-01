import { createStackNavigator } from 'react-navigation-stack'
import LoginView from '../components/LoginView'
import AppEntryPoint from '../components/AppEntryPoint'

const AuthNavigation = createStackNavigator(
    {
      AppEntryPoint: { screen: AppEntryPoint},
      Login: { screen: LoginView }
    },
    {
      initialRouteName: 'AppEntryPoint'
    }
  )

  export default AuthNavigation;