import React, { useEffect } from 'react';
import { Image, Text, View, Button } from 'react-native';
import { getShortCurrencySignById } from '../helpers/currencyHelper';

export default SpendDetailsScreen = ({ route, navigation }) => {
    const { item, onDelete } = route.params;
    
    console.log(`in details screen, item is: ${item}`);
    console.log(`in details screen, onDelete is: ${onDelete}`);

    useEffect(() => {
        navigation.setOptions({
            title: 'Spend details:'
        });
    }, []);

    return (
        <View>
            <Image source={{ uri: 'http://art.mau.ru/foto/dream/001.jpg' }} />
            <Text>{item.id}</Text>
            <Text>{item.amount} {getShortCurrencySignById(item.currency)}</Text>
            <Text>{new Date(item.date).toLocaleDateString()}</Text>
            <Text>{item.comment}</Text>
            <Text>{item.typeName} / {item.subTypeName}</Text>
            <View>
                <Button title="Delete" onPress={() => onDelete(item.id)} color="#f7b267" ></Button>
            </View>
        </View>
    );
};

export const NAVIGATION_KEY = "SpendDetails";