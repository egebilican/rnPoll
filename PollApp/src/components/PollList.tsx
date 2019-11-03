import React from 'react';
import {View, Text, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Poll} from '../stores/PollListStore';
import {PollItem} from './PollItem';

export const PollList: React.FC<{
  polls: Poll[];
  goToDetail: (poll: Poll) => void;
}> = ({polls, goToDetail}) => {
  const renderPoll = (poll: Poll) => {
    return (
      <TouchableOpacity key={poll.url} onPress={() => goToDetail(poll)}>
        <PollItem poll={poll}>{poll.question}</PollItem>
      </TouchableOpacity>
    );
  };

  return <View testID="pollList">{polls.map(poll => renderPoll(poll))}</View>;
};
