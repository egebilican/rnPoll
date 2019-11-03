import 'react-native';
import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import {Poll} from '../src/stores/PollListStore';
import {PollList} from '../src/components/PollList';
import {TouchableHighlight} from 'react-native';

it('renders poll list', () => {
  const mockPollList: Poll[] = [
    {
      choices: [],
      question: 'Very good question',
      url: '/question/1',
    },
    {
      choices: [],
      question: 'Another very good question',
      url: '/question/2',
    },
  ];

  const mockFn = jest.fn();

  const {queryAllByType} = render(
    <PollList polls={mockPollList} goToDetail={() => mockFn()} />,
  );
  const shownPolls = queryAllByType(TouchableHighlight);
  expect(shownPolls.length).toBe(2);
  if (shownPolls[0]) {
    fireEvent.press(shownPolls[0]);
  }
  expect(mockFn).toHaveBeenCalled();
});
