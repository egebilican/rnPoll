import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationScreenComponent,
} from 'react-navigation';
import {observer} from 'mobx-react';
import {Choice} from 'src/stores/PollListStore';
import {ChoiceItem} from '../components/ChoiceItem';
import {useStore} from '../stores';

interface Props
  extends NavigationScreenProp<NavigationState, NavigationParams> {}

const renderChoice = (choice: Choice, handleVote: () => void) => {
  return (
    <TouchableOpacity
      key={`${choice.url}`}
      onPress={handleVote}
      style={styles.choiceContainer}>
      <ChoiceItem choice={choice} />
    </TouchableOpacity>
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
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{pollDetails.question}</Text>
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

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#b4d1d2',
  },
  choiceContainer: {
    padding: 10,
    marginVertical: 3,
    borderColor: '#beddb2',
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#c1b7d4',
  },
});
