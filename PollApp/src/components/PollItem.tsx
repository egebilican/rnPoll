import React from 'react';
import {Text} from 'react-native';
import {Poll} from '../stores/PollListStore';

export const PollItem: React.FC<{poll: Poll}> = ({poll}) => {
  return <Text>{poll.question}</Text>;
};
