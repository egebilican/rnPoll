import React from 'react';
import {View, Text, TextInput, Button, TouchableHighlight} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationScreenComponent,
} from 'react-navigation';
import {observer} from 'mobx-react';
import {useStore} from '../stores';
import {Formik} from 'formik';
import {NewQuestionBody} from 'src/stores/PollListStore';

import * as Yup from 'yup';

const CreateQuestionSchema = Yup.object().shape({
  question: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  choices: Yup.array().min(2, 'At least 2 choices required'),
});
interface Props
  extends NavigationScreenProp<NavigationState, NavigationParams> {}

const CreatePollPage: NavigationScreenComponent<{}, Props> = observer(
  ({navigation}) => {
    const {pollList} = useStore();
    const [tempChoice, setTempChoice] = React.useState('');
    const initialValues: NewQuestionBody = {
      question: '',
      choices: [],
    };

    const handleSubmit = (values: NewQuestionBody) => {
      pollList.createQuestion(values, navigation.goBack);
    };

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={CreateQuestionSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
          }) => (
            <View>
              {pollList.state === 'posting' && (
                <Text testID="wait">Please wait</Text>
              )}
              <Text>Question:</Text>
              <TextInput
                onChangeText={handleChange('question')}
                onBlur={handleBlur('email')}
                value={values.question}
                placeholder="Type your question here"
                autoCorrect={false}
                autoFocus={true}
                accessibilityLabel="New Question"
              />
              {errors && errors.question && (
                <Text style={{color: 'red'}}>{errors.question}</Text>
              )}
              <Text>Choices: </Text>
              {values.choices.map((choice: string, index: number) => (
                <Text key={`${index}-${choice}`}>{choice}</Text>
              ))}
              <View>
                <TextInput
                  placeholder="Add choice"
                  value={tempChoice}
                  onChangeText={text => {
                    setTempChoice(text);
                  }}
                  accessibilityLabel="New Choice"
                />
                <TouchableHighlight
                  onPress={() => {
                    setFieldValue('choices', [...values.choices, tempChoice]);
                    setTempChoice('');
                  }}
                  accessibilityLabel="Add new choice button">
                  <Text>Add choice</Text>
                </TouchableHighlight>
                {errors && errors.choices && (
                  <Text style={{color: 'red'}}>{errors.choices}</Text>
                )}
              </View>
              <TouchableHighlight
                onPress={handleSubmit}
                accessibilityLabel="Add new question button">
                <Text>Submit Question</Text>
              </TouchableHighlight>
            </View>
          )}
        </Formik>
      </View>
    );
  },
);

CreatePollPage.navigationOptions = (
  props: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
  return {
    title: 'Poll Details',
  };
};

export default CreatePollPage;
