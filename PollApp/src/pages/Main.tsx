import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import PollListPage from './PollListPage';
import PollDetailPage from './PollDetailPage';
import {createStackNavigator} from 'react-navigation-stack';
import {StoreProvider} from '../stores';
import React from 'react';
import CreatePollPage from './CreatePollPage';

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
    Statistics: PollListPage,
    Random: PollListPage,
  },
  {
    initialRouteName: 'PollList',
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
