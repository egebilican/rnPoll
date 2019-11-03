import React from 'react';
import {View, Text, Button, Alert} from 'react-native';
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {pollList.polls && pollList.polls.length > 0 ? (
          <PollList polls={pollList.polls} goToDetail={goToDetail} />
        ) : (
          <Text>Waiting</Text>
        )}
      </View>
    );
  },
);

PollListPage.navigationOptions = (
  props: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
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
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          )
        }
        title="Add"
        color="red"
      />
    ),
  };
};

export default PollListPage;
