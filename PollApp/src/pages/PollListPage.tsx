import React from 'react';
import {ScrollView, Text, Button, Alert, StyleSheet, View} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationScreenComponent,
} from 'react-navigation';
import {useStore} from '../stores';
import {observer} from 'mobx-react';
import {PollList} from '../components/PollList';
import {Poll} from 'src/stores/PollListStore';

interface Props
  extends NavigationScreenProp<NavigationState, NavigationParams> {}

const PollListPage: NavigationScreenComponent<{}, Props> = observer(
  ({navigation}) => {
    const {pollList} = useStore();
    React.useEffect(() => {
      pollList.fetchPolls();
    }, []);
    const goToDetail = (poll: Poll) => {
      navigation.navigate('Details', {poll});
    };
    return (
      <ScrollView style={styles.container}>
        {pollList.polls && pollList.polls.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Active Polls</Text>
            <PollList polls={pollList.polls} goToDetail={goToDetail} />
          </View>
        ) : (
          <Text>Waiting</Text>
        )}
      </ScrollView>
    );
  },
);

PollListPage.navigationOptions = ({navigation}) => {
  return {
    title: 'All Polls',
    headerRight: () => (
      <Button
        onPress={() =>
          Alert.alert(
            'Hey :)',
            'Do you want to create a new poll?',
            [
              {
                text: 'Not really',
                onPress: () => console.log('no'),
              },
              {text: 'OK', onPress: () => navigation.navigate('Create')},
            ],
            {cancelable: false},
          )
        }
        title="Create"
        color="black"
      />
    ),
  };
};

export default PollListPage;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#b4d1d2',
    paddingBottom: 50,
  },
});
