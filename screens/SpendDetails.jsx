import React, { useEffect, useState } from 'react';
import { Image, Text, View, Button, Modal } from 'react-native';
import { getShortCurrencySignById } from '../helpers/currencyHelper';
import UpdateSpendModal from '../components/spends/UpdateSpendModal';

export default SpendDetailsScreen = ({ route, navigation }) => {
    const { item, onDelete, onSpendUpdate } = route.params;
    const [showUpdateMenu, setShowUpdateMenu] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            title: 'Spend details:'
        });
    }, []);

    return (
        <View>
            <Image source={{ uri: 'http://art.mau.ru/foto/dream/001.jpg' }} />
            <Modal animationType='slide' transparent={true} visible={showUpdateMenu} onRequestClose={() => setShowUpdateMenu(false)}>
                <UpdateSpendModal onClose={() => setShowUpdateMenu(false)} onSpendUpdate={onSpendUpdate} spend={item} />
            </Modal>
            <Text>{item.id}</Text>
            <Text>{item.amount} {getShortCurrencySignById(item.currency)}</Text>
            <Text>{new Date(item.date).toLocaleDateString()}</Text>
            <Text>{item.comment}</Text>
            <Text>{item.typeName} / {item.subTypeName}</Text>
            <View>
                <Button title="Update" onPress={() => setShowUpdateMenu(true)} color="#f7b267" ></Button>
                <Button title="Delete" onPress={() => onDelete(item.id)} color="#f7b267" ></Button>
            </View>
        </View>
    );
};

export const NAVIGATION_KEY = "SpendDetails";