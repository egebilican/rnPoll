import 'react-native';
import React from 'react';
import PollList from '../src/pages/PollListPage';
import {render, waitForElement, act} from 'react-native-testing-library';
import mockAxios from 'axios';
import {StoreProvider} from '../src/stores';

const renderWithStore = () =>
  render(
    <StoreProvider>
      <PollList />
    </StoreProvider>,
  );

it('renders header', () => {
  const {getByText} = renderWithStore();
  expect(getByText('Waiting')).toBeDefined();
});

it('renders polls', async () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: [{question: 'Dummy Poll', url: 'dummy'}],
    }),
  );
  const {getByTestId, getByText} = renderWithStore();
  await act(async () => {
    await waitForElement(() => getByTestId('pollList'));
  });
  expect(mockAxios.get).toHaveBeenCalled();
  expect(getByText('Dummy Poll')).toBeDefined();
});
