import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Alert, RefreshControl, TouchableOpacity, ImageBackground, Button, Modal } from 'react-native';
import SpendGridCell from '../components/spends/SpendGridCell'
import { groupDataByDate, addItemToGroupedArray, deleteItemByIdFromGroupedArray } from '../helpers/data/dataModifiers'
import Loader from '../components/common/Loader'
import { NAVIGATION_KEY as detailsNavigationKey } from '../screens/SpendDetails';
import { NAVIGATION_KEY as loginNavigationKey } from './LoginScreen';
import { sendEmailVerification } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db, SPEND_COLLECTION } from '../firebase';
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
  const [spends, setSpends] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const fetchSpends = async () => {
    setIsLoading(true);

    try {
      const q = query(collection(db, SPEND_COLLECTION), where("user", "==", auth.currentUser.uid));
      const qSnapshot = await getDocs(q);

      var items = [];
      qSnapshot.forEach((doc) => {
        items.push({
          ...doc.data(),
          id: doc.id
        });
      });

      const groupedData = groupDataByDate(items);
      console.log('grouped fetched:', groupedData);
      setSpends(groupedData);
    } catch (e) {
      console.log('===> error during fetching spends from db:', e);
      Alert.alert('Error','Error during fetching spends form server.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function fetchSpendsInternal() {
      setIsLoading(true);
  
      try {
        const q = query(collection(db, SPEND_COLLECTION), where("user", "==", auth.currentUser.uid));
        const qSnapshot = await getDocs(q);
  
        var items = [];
        qSnapshot.forEach((doc) => {
          items.push({
            ...doc.data(),
            id: doc.id
          });
        });
  
        const groupedData = groupDataByDate(items);
        console.log('grouped fetched:', groupedData);
        setSpends(groupedData);
      } catch (e) {
        console.log('===> error during fetching spends from db:', e);
        Alert.alert('Error','Error during fetching spends form server.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSpendsInternal();
  }, []);

  const deleteSpend = async (spendId) => {
    try {
      await deleteDoc(doc(db, SPEND_COLLECTION, spendId));

      var updatedSpends = deleteItemByIdFromGroupedArray(spends, spendId);
      setSpends(updatedSpends);
    } catch (e) {
      console.log(`===> error of deleting item with id: ${spendId}, error: ${e}`);
    } finally {
      navigation.navigate(NAVIGATION_KEY);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(detailsNavigationKey, { "item": item, "onDelete": deleteSpend })} >
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

  const saveNewSpend = async (spendToAdd) => {
    try {
      var docRef = await addDoc(collection(db, SPEND_COLLECTION), spendToAdd);
      spendToAdd.id = docRef.id;

      var updatedSpends = addItemToGroupedArray(spends, spendToAdd); 
      setSpends(updatedSpends);
    } catch (e) {
      console.log(`===> error duing saving new spend. Error: ${e} . Spend: ${spendToAdd}`);
    }
  }

  if (isLoading) { return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} ><Loader /></View> }
  if (spends.length === 0) {  return <View><Text>There no spends. Feel free to add first..</Text></View>; }

  return (
    <ImageBackground source={backgroundImage} style={styles.image} >
    <View>
      <Text style={{marginTop:80, marginLeft: 20}}>Your spends:</Text>
      <Button title="Add spend" color="#fb4d3d" style={{marginTop: 40}} onPress={() => setShowAddMenu(true)} />
      <Modal animationType='slide' transparent={true} visible={showAddMenu} onRequestClose={() => setShowAddMenu(false)}>
        <AddSpendModal onClose={() => setShowAddMenu(false)} addSpend={saveNewSpend} />
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