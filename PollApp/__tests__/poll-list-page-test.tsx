import 'react-native';
import React from 'react';
import PollList from '../src/pages/PollListPage';
import {render, waitForElement, act} from 'react-native-testing-library';
import {PollListStore} from '../src/stores/PollListStore';
import {Provider} from 'mobx-react';
import mockAxios from 'axios';

const renderWithStore = (pollListStore: PollListStore) =>
  render(
    <Provider pollListStore={pollListStore}>
      <PollList />
    </Provider>,
  );

it('renders header', () => {
  const pollListStore = new PollListStore();
  const {getByText} = renderWithStore(pollListStore);
  expect(getByText('Waiting')).toBeDefined();
});

it('renders polls', async () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: [{question: 'Dummy Poll', url: 'dummy'}],
    }),
  );
  const pollListStore = new PollListStore();
  const {getByTestId, getByText} = renderWithStore(pollListStore);
  await act(async () => {
    await waitForElement(() => getByTestId('pollList'));
  });
  expect(mockAxios.get).toHaveBeenCalled();
  expect(getByText('Dummy Poll')).toBeDefined();
});
