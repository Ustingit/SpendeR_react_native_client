import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
//import styled from 'styled-components/native';

export default SpendDetailsScreen = ({ route, navigation }) => {
    const { item } = route.params;
    
    useEffect(() => {
        navigation.setOptions({
            title: 'Spend details:'
        });
    }, []);

    return (
        <View>
            <Image source={{ uri: 'http://art.mau.ru/foto/dream/001.jpg' }} />
            <Text>{item.id}</Text>
            <Text>{item.amount} zl</Text>
            <Text>{new Date(item.date).toLocaleDateString()}</Text>
            <Text>{item.comment}</Text>
            <Text>{item.typeName} / {item.subTypeName}</Text>
        </View>
    );
};

export const NAVIGATION_KEY = "SpendDetails";

/*
const SpendImage = styled.Image`
    border-radius: 10px;
    width: 100%;
    height: 250px;
    margin-bottom: 20px;
`;

const SpendText = styled.Text`
    font-size: 18px;
    line-height: 24px;
`;

*/