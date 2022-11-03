import { View, Text, TextInput, Button, } from 'react-native';
import React, { useState } from 'react';
import AppStyles from '../../styles/AppStyles';

export default function AddSpendModal(props) {
    const [comment, setComment] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    return (
        <View style={AppStyles.container} >
            <Text style={AppStyles.header} >Add spend</Text>
            <TextInput style={[AppStyles.textInput, AppStyles.darkTextInput]}
                       placeholder="Comment"
                       value={comment}
                       onChangeText={setComment} />
            <TextInput style={[AppStyles.textInput, AppStyles.darkTextInput]}
                       placeholder="Amount"
                       value={amount}
                       onChangeText={setAmount} />
            <TextInput style={[AppStyles.textInput, AppStyles.darkTextInput]}
                       placeholder="Date"
                       value={date}
                       onChangeText={setDate} />
            <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin]} >
                <Button title='Cancel' onPress={props.onClose} />
                <Button title='Ok' onPress={() => {
                    var spendToAdd = {
                        comment: comment,
                        amount: amount,
                        date: date,
                        type: 0,
                        subType: 0,
                        direction: 0,
                        user: 0,
                        id: 0,
                        currency: 0
                    };

                    props.addSpend(spendToAdd);
                    setComment("");      
                    setAmount("");      
                    setDate("");      
                    props.onClose();
                }} />
            </View>
        </View>
    )
}