import { View, Text, TextInput, Button, } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React, { useState } from 'react';
import AppStyles from '../../styles/AppStyles';
import { auth } from '../../firebase';

export default function AddSpendModal(props) {
    const [comment, setComment] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [isCommon, setIsCommon] = useState(false);

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
                    var spendToAdd = {
                        comment: comment,
                        amount: amount,
                        date: new Date().toISOString(),
                        type: 0,
                        subType: 0,
                        direction: 0,
                        user: auth.currentUser.uid,
                        id: 0,
                        currency: 0,
                        isCommon: isCommon
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