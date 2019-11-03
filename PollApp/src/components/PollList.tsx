import React from 'react';
import {View, Text} from 'react-native';
import {Poll} from '../stores/PollListStore';

export const PollList: React.FC<{polls: Poll[]}> = ({polls}) => {
  const renderPoll = (poll: Poll) => {
    return <Text key={poll.url}>{poll.question}</Text>;
  };

  return <View testID="pollList">{polls.map(poll => renderPoll(poll))}</View>;
};
