import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

var today = new Date();
var oldDate = new Date().setDate(today.getDate()-5);

const SPENDS = [
  { 
    id: 1,
    description: "groceries",
    amount: 15.567,
    user: 1,
    type: 0,
    sudType: 1,
    direction: 0,
    date: today
  },
  { 
    id: 2,
    description: "transport",
    amount: 3.40,
    user: 1,
    type: 2,
    sudType: 5,
    direction: 0,
    date: today
  },
  { 
    id: 3,
    description: "bouth glasses",
    amount: 967.45,
    user: 1,
    type: 3,
    sudType: 7,
    direction: 0,
    date: oldDate
  },
  { 
    id: 4,
    description: "salary",
    amount: 3400,
    user: 1,
    type: 12,
    sudType: 15,
    direction: 1,
    date: oldDate
  },
];

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }) => (
    <Item title={item.description} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>Your spends:</Text>
      <FlatList
        data={SPENDS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
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

export default App;