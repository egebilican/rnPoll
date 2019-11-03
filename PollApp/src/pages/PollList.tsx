import React from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface NavStatelessComponent extends React.StatelessComponent {
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
  navigationOptions?: Object;
}

const PollListPage: NavStatelessComponent = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>List of available polls</Text>
    </View>
  );
};

PollListPage.navigationOptions = ({navigation}: NavStatelessComponent) => {
  return {
    title: 'All Polls',
    headerRight: () => (
      <Button
        onPress={() =>
          Alert.alert(
            'Hey :)',
            'Do you want to create a new poll?',
            [
              {
                text: 'Not really',
                onPress: () => console.log('no'),
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          )
        }
        title="Add"
        color="red"
      />
    ),
  };
};

export default PollListPage;
