import React from 'react';
import {View, Text} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationScreenComponent,
} from 'react-navigation';
import {observer} from 'mobx-react';

import {useStore} from '../stores';

interface Props
  extends NavigationScreenProp<NavigationState, NavigationParams> {}

const StatisticsPage: NavigationScreenComponent<{}, Props> = observer(
  ({navigation}) => {
    const {pollList} = useStore();
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Statistics</Text>
        <Text>{`In this session you have voted ${
          pollList.voteCount
        } times`}</Text>
      </View>
    );
  },
);

StatisticsPage.navigationOptions = (
  props: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
  return {
    title: 'Statistics',
  };
};

export default StatisticsPage;
