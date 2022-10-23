import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  title: {
    fontSize: 32,
  },
});

const SpendGridCell = ({ spent }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{spent.amount} zl.</Text>
      <Text style={styles.title}>{spent.comment}</Text>
    </View>
  );
}

export default SpendGridCell;