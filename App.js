import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Alert } from 'react-native';
import SpendGridCell from './components/spends/SpendGridCell'
import { groupDataByDate } from './helpers/data/dataModifiers'

var today = new Date();
var oldDate = new Date(new Date().setDate(today.getDate()-5));

const SPENDS = [
  { 
    id: 1,
    comment: "groceries",
    amount: 15.567,
    userId: 1,
    typeId: 0,
    subType: 1,
    direction: 0,
    date: today
  },
  { 
    id: 2,
    comment: "transport",
    amount: 3.40,
    userId: 1,
    typeId: 2,
    subType: 5,
    direction: 0,
    date: today
  },
  { 
    id: 3,
    comment: "bouth glasses",
    amount: 967.45,
    userId: 1,
    typeId: 3,
    subType: 7,
    direction: 0,
    date: oldDate
  },
  { 
    id: 4,
    comment: "salary",
    amount: 3400,
    userId: 1,
    typeId: 12,
    subType: 15,
    direction: 1,
    date: oldDate
  },
];

const groupedSpends = groupDataByDate(SPENDS);

const App = () => {
  const [spends, setSpends] = useState([]);

  useEffect(() => {
    axios.get('https://63552286483f5d2df3adc834.mockapi.io/get/spends')
    .then(({ data }) => {
      console.log('raw fetched:', data);
      const groupedData = groupDataByDate(data);
      console.log('grouped fetched:', groupedData);
      setSpends(groupedData);
    }).catch((err) => {
      console.log('error:', err);
      console.log('error:', err.response);
      Alert.alert('Error','Error during fetching spends form server.');
    });
  }, []);

  const renderItem = ({ item }) => (
    <SpendGridCell spent={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{marginTop:20, marginLeft: 20}}>Your spends:</Text>
      <View style={{ flex: 1, marginTop: 20 }} >
          {
              spends.map(group => (
                  <View key={group.name} >
                      <Text style={{marginLeft: 20}}>{new Date(group.name).toDateString()}</Text>
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