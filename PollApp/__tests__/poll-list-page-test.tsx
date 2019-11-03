import 'react-native';
import React from 'react';
import PollList from '../src/pages/PollList';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<PollList />);
});
