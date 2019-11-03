import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Very Important Statistic</Text>
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

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#b4d1d2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
