import React from 'react';
import {View, Text} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationScreenComponent,
} from 'react-navigation';
import {observer} from 'mobx-react';
import {Choice} from 'src/stores/PollListStore';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {ChiceItem} from '../components/ChoiceItem';
import {useStore} from '../stores';

interface Props
  extends NavigationScreenProp<NavigationState, NavigationParams> {}

const renderChoice = (choice: Choice, handleVote: () => void) => {
  return (
    <TouchableHighlight key={choice.choice} onPress={handleVote}>
      <ChiceItem choice={choice} />
    </TouchableHighlight>
  );
};

const PollDetailPage: NavigationScreenComponent<{}, Props> = observer(
  ({navigation}) => {
    const {pollList} = useStore();
    const pollDetails = navigation.getParam('poll');
    const handleVote = (voteUrl: string) => {
      pollList.vote(voteUrl, navigation.goBack);
    };
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{pollDetails.question}</Text>
        {pollDetails.choices.map((choice: Choice) =>
          renderChoice(choice, () => handleVote(choice.url)),
        )}
      </View>
    );
  },
);

PollDetailPage.navigationOptions = (
  props: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
  return {
    title: 'Poll Details',
  };
};

export default PollDetailPage;
