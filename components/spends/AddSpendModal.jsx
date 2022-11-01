import { View, Text, TextInput, Button, } from 'react-native';
import React, { useState } from 'react';
import AppStyles from '../../styles/AppStyles';

export default function AddSpendModal(props) {
    const [comment, setComment] = useState("");

    return (
        <View style={AppStyles.container} >
            <Text style={AppStyles.header} >Add spend</Text>
            <TextInput style={[AppStyles.textInput, AppStyles.darkTextInput]}
                       placeholder="Comment"
                       value={comment}
                       onChangeText={setComment} />
            <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin]} >
                <Button title='Cancel' onPress={props.onClose} />
                <Button title='Ok' onPress={() => {
                    props.addSpend(comment);
                    setComment("");      
                    props.onClose();
                }} />
            </View>
        </View>
    )
}