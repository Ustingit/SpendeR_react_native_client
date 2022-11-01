import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Alert, RefreshControl, TouchableOpacity, ImageBackground, Button, Modal } from 'react-native';
import SpendGridCell from '../components/spends/SpendGridCell'
import { groupDataByDate } from '../helpers/data/dataModifiers'
import Loader from '../components/common/Loader'
import { NAVIGATION_KEY as detailsNavigationKey } from '../screens/SpendDetails';
import { NAVIGATION_KEY as loginNavigationKey } from './LoginScreen';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import AddSpendModal from '../components/spends/AddSpendModal';

const backgroundImage = require('../images/baffett.jpg');

const HomeScreen = ({ navigation }) => {
  if (!auth.currentUser) {
    navigation.navigate(loginNavigationKey);
  }

  if (!auth.currentUser.emailVerified) {
    return <ImageBackground source={backgroundImage} style={styles.image} >
      <View>
        <Text style={{marginTop:20, marginLeft: 20}}>Please verify your email to get access for managing spends.</Text>
        <Button title="Send Verification Email" onPress={() => sendEmailVerification(auth.currentUser)} />
      </View>
    </ImageBackground>
  }

  const [isLoading, setIsLoading] = useState(true);
  const [spends, setSpends] = useState();
  const [showAddMenu, setShowAddMenu] = useState(false);

  const fetchSpends = () => {
    setIsLoading(true);
    axios.get('https://63552286483f5d2df3adc834.mockapi.io/get/spends')
    .then(({ data }) => {
      const groupedData = groupDataByDate(data);
      //console.log('grouped fetched:', groupedData);
      setSpends(groupedData);
    }).catch((err) => {
      console.log('error:', err);
      Alert.alert('Error','Error during fetching spends form server.');
    }).finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(fetchSpends, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(detailsNavigationKey, { item: item })} >
        <SpendGridCell spent={item} />
    </TouchableOpacity>
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

  const saveNewSpend = ({ comment }) => {
    console.log('in saving, ', comment);
  }

  if (isLoading) { return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} ><Loader /></View> }
  if (spends.length === 0) {  return <View><Text>There no spends. Feel free to add first..</Text></View>; }

  return (
    <ImageBackground source={backgroundImage} style={styles.image} >
    <View>
      <Text style={{marginTop:80, marginLeft: 20}}>Your spends:</Text>
      <Button title="Add spend" color="#fb4d3d" style={{marginTop: 40}} onPress={() => setShowAddMenu(true)} />
      <Modal animationType='slide' transparent={true} visible={showAddMenu} onRequestClose={() => setShowAddMenu(false)}>
          <AddSpendModal onClose={() => setShowAddMenu(false)}
                         addSpend={saveNewSpend} />
      </Modal>
      <FlatList data={spends} 
                renderItem={renderGroup} 
                keyExtractor={(group, index) => index} 
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchSpends} />} />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
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
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    height: '100%',
    width: '100%'
  }
});

export default HomeScreen;
export const NAVIGATION_KEY = "Home";