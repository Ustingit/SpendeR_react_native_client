import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Alert, ActivityIndicator } from 'react-native';
import SpendGridCell from './components/spends/SpendGridCell'
import { groupDataByDate } from './helpers/data/dataModifiers'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [spends, setSpends] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://63552286483f5d2df3adc834.mockapi.io/get/spends')
    .then(({ data }) => {
      const groupedData = groupDataByDate(data);
      console.log('grouped fetched:', groupedData);
      setSpends(groupedData);
    }).catch((err) => {
      console.log('error:', err);
      Alert.alert('Error','Error during fetching spends form server.');
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => (
    <SpendGridCell spent={item} />
  );

  const renderGroup = ({ item }) => {
    return (
      <View key={item.name} >
                        <Text style={{marginLeft: 20}}>{new Date(item.name).toDateString()}</Text>
                        <FlatList
                            data={item.items}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
    );
  };

  if (isLoading) {
    return <View style={{
      flex: 1, //takes all the width
      justifyContent: 'center',
      alignContent: 'center'
    }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 15 }} >Data loading..</Text>
    </View>
  }

  if (spends.length === 0) {
    return <View><Text>There no spends. Feel free to add first..</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{marginTop:20, marginLeft: 20}}>Your spends:</Text>
      <FlatList data={spends} renderItem={renderGroup} keyExtractor={(group, index) => index} />
      <StatusBar theme="auto" />
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