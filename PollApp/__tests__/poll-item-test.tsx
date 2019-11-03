import 'react-native';
import React from 'react';
import {render} from 'react-native-testing-library';
import {PollItem} from '../src/components/PollItem';
import {Poll} from '../src/stores/PollListStore';

it('renders poll question text', () => {
  const mockPoll: Poll = {
    choices: [],
    question: 'Very good question',
    url: '/question/1',
  };
  const {getByText} = render(<PollItem poll={mockPoll} />);

  expect(getByText(mockPoll.question)).toBeDefined();
});
