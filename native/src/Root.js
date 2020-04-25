import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Posts/Index';
import Content from './Posts/Content';

console.disableYellowBox = true;

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home},
    Content: { screen: Content },
  },
  {
    initialRouteName: 'Home',
  }
);
export default createAppContainer(AppNavigator);
