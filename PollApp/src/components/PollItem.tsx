import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Poll} from '../stores/PollListStore';

export const PollItem: React.FC<{poll: Poll}> = ({poll}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{poll.question}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {},
  container: {
    padding: 10,
    marginVertical: 3,
    borderColor: '#beddb2',
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#c1b7d4',
  },
});
