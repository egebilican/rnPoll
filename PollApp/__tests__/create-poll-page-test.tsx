import 'react-native';
import React from 'react';
import CreatePollPage from '../src/pages/CreatePollPage';
import {
  render,
  fireEvent,
  act,
  waitForElement,
} from 'react-native-testing-library';
import mockAxios from 'axios';
import {TouchableHighlight} from 'react-native';
import {StoreProvider} from '../src/stores';

const renderWithStore = () =>
  render(
    <StoreProvider>
      <CreatePollPage navigation={{navigate: () => {}}} />
    </StoreProvider>,
  );

it('renders page', () => {
  const {getByText} = renderWithStore();
  expect(getByText('Question:')).toBeDefined();
});

it('renders buttons', () => {
  const {queryAllByType} = renderWithStore();
  const shownTouchables = queryAllByType(TouchableHighlight);
  expect(shownTouchables.length).toBe(2);
});

it('creates new question', async () => {
  const {
    getByA11yLabel,
    getByText,
    queryAllByType,
    getByTestId,
  } = renderWithStore();
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
    fireEvent.press(submitButton);
  });
  await act(async () => {
    await waitForElement(() => getByTestId('wait'));
  });

  expect(mockAxios.post).toHaveBeenCalled();
});
