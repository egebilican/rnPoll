import 'react-native';
import React from 'react';
import CreatePollPage from '../src/pages/CreatePollPage';
import {
  render,
  fireEvent,
  act,
  waitForElement,
} from 'react-native-testing-library';
import {PollListStore} from '../src/stores/PollListStore';
import {Provider} from 'mobx-react';
import mockAxios from 'axios';
import {TouchableHighlight} from 'react-native';

const renderWithStore = (pollListStore: PollListStore) =>
  render(
    <Provider pollListStore={pollListStore}>
      <CreatePollPage />
    </Provider>,
  );

it('renders page', () => {
  const pollListStore = new PollListStore();
  const {getByText} = renderWithStore(pollListStore);
  expect(getByText('Question:')).toBeDefined();
  //   expect(getByText('Choices:')).toBeDefined();
});

it('renders buttons', () => {
  const pollListStore = new PollListStore();
  const {queryAllByType} = renderWithStore(pollListStore);
  const shownTouchables = queryAllByType(TouchableHighlight);
  expect(shownTouchables.length).toBe(2);
});

it('creates new question', async () => {
  //TODO: add post mock
  const pollListStore = new PollListStore();
  const {getByA11yLabel, getByText, queryAllByType} = renderWithStore(
    pollListStore,
  );
  const shownTouchables = queryAllByType(TouchableHighlight);

  const questionInput = getByA11yLabel('New Question');
  const choiceInput = getByA11yLabel('New Choice');
  const addChoiceButton = shownTouchables[0];
  const submitButton = shownTouchables[1];
  await act(async () => {
    fireEvent.changeText(questionInput, 'Test Question');
    fireEvent.changeText(choiceInput, 'Test Choice');
  });
  await act(async () => {
    fireEvent.press(addChoiceButton);
  });
  await act(async () => {
    fireEvent.changeText(choiceInput, 'Second Choice');
  });
  await act(async () => {
    fireEvent.press(addChoiceButton);
  });
  await act(async () => {
    fireEvent.changeText(choiceInput, 'third');
  });
  await act(async () => {
    fireEvent.press(addChoiceButton);
  });

  await act(async () => {
    await waitForElement(() => getByText('Test Choice'));
    await waitForElement(() => getByText('Second Choice'));
  });
  await act(async () => {
    await fireEvent.press(submitButton);
  });
});
