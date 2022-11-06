import { View, Text, TextInput, Button, } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React, { useState } from 'react';
import AppStyles from '../../styles/AppStyles';

export default function UpdateSpendModal(props) {
    if (!props.spend) { return (<></>) }

    const [comment, setComment] = useState(props.spend.comment || "");
    const [amount, setAmount] = useState(props.spend.amount || "");
    const [date, setDate] = useState(props.spend.date || "");
    const [isCommon, setIsCommon] = useState(props.spend.isCommon || false);

    return (
        <View style={AppStyles.container} >
            <Text style={AppStyles.header} >Update spend</Text>
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
            <BouncyCheckbox isChecked={isCommon}
                            size={25}
                            fillColor="#258ea6"
                            unfillColor='#FFFFFF'
                            text='Is it common spend ?'
                            iconStyle={{ borderColor: "258ea6" }}
                            textStyle={{ textDecorationLine: "none" }}
                            onPress={(isChecked) => setIsCommon(isChecked)} />
            <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin]} >
                <Button title='Cancel' onPress={props.onClose} />
                <Button title='Ok' onPress={() => {
                    props.onSpendUpdate({
                        id: props.spend.id,
                        comment: comment,
                        amount: amount,
                        date: new Date().toISOString(),
                        isCommon: isCommon
                    });

                    props.onClose();
                }} />
            </View>
        </View>
    )
}