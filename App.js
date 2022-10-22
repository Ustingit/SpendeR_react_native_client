import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

var today = new Date();
var oldDate = new Date(new Date().setDate(today.getDate()-5));

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

const groupedSpends = Object.values(SPENDS.reduce((spd, item) => {
  if (!spd[item.date]) spd[item.date] = {
      name: item.date,
      items: []
  };
  spd[item.date].items.push(item);
  return spd;
}, {}));

const Item = ({ spent }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{spent.amount} zl.</Text>
    <Text style={styles.title}>{spent.description}</Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }) => (
    <Item spent={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{marginTop:20, marginLeft: 20}}>Your spends:</Text>
      <View style={{ flex: 1, marginTop: 20 }} >
          {
              groupedSpends.map(group => (
                  <View>
                      <Text style={{marginLeft: 20}}>{group.name.toDateString()}</Text>
                      <FlatList
                          data={group.items}
                          renderItem={renderItem}
                          keyExtractor={item => item.id}
                      />
                  </View>
              ))
          }
      </View>
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