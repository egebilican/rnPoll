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

interface Props
  extends NavigationScreenProp<NavigationState, NavigationParams> {}

const PollListPage: NavigationScreenComponent<{}, Props> = observer(() => {
  const {pollList} = useStore();
  React.useEffect(() => {
    pollList.fetchPolls();
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {pollList.polls && pollList.polls.length > 0 ? (
        <PollList polls={pollList.polls} />
      ) : (
        <Text>Waiting</Text>
      )}
    </View>
  );
});

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
