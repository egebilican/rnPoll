import React from 'react';
import {TouchableHighlight} from 'react-native';
import {Poll} from '../stores/PollListStore';

export const PollItem: React.FC<{poll: Poll}> = ({poll}) => {
  const handlePress = () => {
    console.log('pressed on ', poll.url);
  };
  return (
    <TouchableHighlight onPress={handlePress}>
      {poll.question}
    </TouchableHighlight>
  );
};
