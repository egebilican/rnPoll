import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
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
      console.log('submitting', values);
      pollList.createQuestion(values, navigation.goBack);
    };
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View>
              <Text>Question: </Text>
              <TextInput
                onChangeText={handleChange('question')}
                onBlur={handleBlur('email')}
                value={values.question}
                placeholder="Type your question here"
              />
              <Text>Choices: </Text>
              {values.choices.map((choice: string) => (
                <Text>{choice}</Text>
              ))}
              <View>
                <TextInput
                  placeholder="Add choice"
                  value={tempChoice}
                  onChangeText={text => setTempChoice(text)}
                />
                <Button
                  title="Add choice"
                  onPress={() => {
                    setFieldValue('choices', [...values.choices, tempChoice]);
                    setTempChoice('');
                  }}
                />
              </View>
              <Button onPress={handleSubmit} title="Submit" />
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
