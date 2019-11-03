import React from 'react';
import {Text} from 'react-native';
import {Choice} from '../stores/PollListStore';

export const ChiceItem: React.FC<{choice: Choice}> = ({choice}) => {
  return <Text>{choice.choice}</Text>;
};
