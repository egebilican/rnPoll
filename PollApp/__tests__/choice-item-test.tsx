import 'react-native';
import React from 'react';
import {render} from 'react-native-testing-library';
import {ChoiceItem} from '../src/components/ChoiceItem';
import {Choice} from '../src/stores/PollListStore';

it('renders choice text', () => {
  const mockChoice: Choice = {
    choice: 'Amazing choice',
    votes: 0,
    url: 'question/1/choice/1',
  };
  const {getByText} = render(<ChoiceItem choice={mockChoice} />);

  expect(getByText(mockChoice.choice)).toBeDefined();
});
