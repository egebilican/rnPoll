import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from 'react-native';
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
      <ScrollView style={styles.container}>
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
              <View style={{paddingBottom: 10}}>
                <Text style={styles.sectionTitle}>Question:</Text>
                <TextInput
                  onChangeText={handleChange('question')}
                  onBlur={handleBlur('email')}
                  value={values.question}
                  placeholder="Type your question here"
                  autoCorrect={false}
                  autoFocus={true}
                  accessibilityLabel="New Question"
                  style={styles.inputStyle}
                />
                {errors && errors.question && (
                  <Text style={{color: 'red'}}>{errors.question}</Text>
                )}
              </View>
              <Text style={styles.sectionTitle}>Choices: </Text>
              {values.choices.map((choice: string, index: number) => (
                <Text
                  key={`${index}-${choice}`}
                  style={styles.addedChoiceStyle}>
                  {choice}
                </Text>
              ))}
              <View>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    placeholder="Add choice"
                    value={tempChoice}
                    onChangeText={text => {
                      setTempChoice(text);
                    }}
                    accessibilityLabel="New Choice"
                    style={styles.inputStyle}
                  />
                  <TouchableHighlight
                    onPress={() => {
                      setFieldValue('choices', [...values.choices, tempChoice]);
                      setTempChoice('');
                    }}
                    accessibilityLabel="Add new choice button"
                    style={styles.addChoice}>
                    <Text style={{paddingHorizontal: 10}}>+</Text>
                  </TouchableHighlight>
                </View>
                {errors && errors.choices && (
                  <Text style={{color: 'red'}}>{errors.choices}</Text>
                )}
              </View>
              <TouchableHighlight
                onPress={handleSubmit}
                accessibilityLabel="Add new question button"
                style={styles.createButton}>
                <Text>Submit Question</Text>
              </TouchableHighlight>
            </View>
          )}
        </Formik>
      </ScrollView>
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

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#b4d1d2',
  },
  inputStyle: {
    flex: 1,
    backgroundColor: '#beddb2',
    paddingHorizontal: 10,
    height: 40,
  },
  addedChoiceStyle: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 3,
    height: 20,
  },
  addChoice: {
    backgroundColor: '#b69dba',
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    padding: 10,
    marginVertical: 3,
    borderColor: '#beddb2',
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#c1b7d4',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
