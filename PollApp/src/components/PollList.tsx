import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {Poll} from '../stores/PollListStore';
import {PollItem} from './PollItem';

export const PollList: React.FC<{
  polls: Poll[];
  goToDetail: (poll: Poll) => void;
}> = ({polls, goToDetail}) => {
  const renderPoll = (poll: Poll) => {
    return (
      <TouchableHighlight key={poll.url} onPress={() => goToDetail(poll)}>
        <PollItem poll={poll}>{poll.question}</PollItem>
      </TouchableHighlight>
    );
  };

  return <View testID="pollList">{polls.map(poll => renderPoll(poll))}</View>;
};
