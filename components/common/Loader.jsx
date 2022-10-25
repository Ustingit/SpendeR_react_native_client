import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default Loader = () => {
    return (
        <View style={{
            flex: 1, //takes all the width
            justifyContent: 'center',
            alignContent: 'center'
          }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 15 }} >Data loading..</Text>
          </View>
    )
}