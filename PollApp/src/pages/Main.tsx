import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import PollDetailPage from './PollDetailPage';
import {createStackNavigator} from 'react-navigation-stack';
import {StoreProvider} from '../stores';
import React from 'react';
import CreatePollPage from './CreatePollPage';
import StatisticsPage from './StatisticsPage';
import PollListPage from './PollListPage';

const PollListNavigation = createStackNavigator(
  {
    Home: PollListPage,
    Details: PollDetailPage,
    Create: CreatePollPage,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppNavigator = createBottomTabNavigator(
  {
    PollList: createAppContainer(PollListNavigation),
    Statistics: StatisticsPage,
  },
  {
    initialRouteName: 'PollList',
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#b69dba',
    },
  },
);

const MainNavigation = createAppContainer(AppNavigator);

export const Main: React.FC<{}> = () => {
  return (
    <StoreProvider>
      <MainNavigation />
    </StoreProvider>
  );
};
