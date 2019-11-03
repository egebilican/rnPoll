import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import PollListPage from './PollList';
import {createStackNavigator} from 'react-navigation-stack';

const PollListNavigation = createStackNavigator(
  {
    Home: PollListPage,
    Details: PollListPage,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppNavigator = createBottomTabNavigator(
  {
    PollList: createAppContainer(PollListNavigation),
    Statistics: PollListPage,
    Random: PollListPage,
  },
  {
    initialRouteName: 'PollList',
  },
);

export const Main = createAppContainer(AppNavigator);
