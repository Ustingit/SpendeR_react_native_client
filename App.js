import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import SpendGridCell from './components/spends/SpendGridCell'
import { groupDataByDate } from './helpers/data/dataModifiers'

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

const groupedSpends = groupDataByDate(SPENDS);

const App = () => {
  const renderItem = ({ item }) => (
    <SpendGridCell spent={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{marginTop:20, marginLeft: 20}}>Your spends:</Text>
      <View style={{ flex: 1, marginTop: 20 }} >
          {
              groupedSpends.map(group => (
                  <View key={group.name.toDateString()} >
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