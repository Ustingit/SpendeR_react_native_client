import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React, { useState } from 'react';
import AppStyles from '../../styles/AppStyles';
import { auth } from '../../firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectList from 'react-native-dropdown-select-list'
import { DIRECTIONS } from '../../helpers/directionHelper';
import { AntDesign } from '@expo/vector-icons'; 

export default function AddSpendModal(props) {
    const [comment, setComment] = useState("");
    const [amount, setAmount] = useState("");
    const [isCommon, setIsCommon] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [selectedDirection, setSelectedDirection] = React.useState(DIRECTIONS[0]);

    const onDatePickerChange = (event, selectedDate) => {
        setShowDatepicker(false);
        setDate(selectedDate);
    };
    
    return (
        <View style={AppStyles.container} >
            <Text style={AppStyles.header} >Add spend</Text>
            <TouchableOpacity onPress={() => setShowDatepicker(true)} >
                <Text style={{ marginTop: 15 }} >Date: {date.toDateString()}</Text>
            </TouchableOpacity>
            <TextInput style={[AppStyles.textInput, AppStyles.darkTextInput]}
                       placeholder="Comment"
                       value={comment}
                       onChangeText={setComment} />
            <TextInput style={[AppStyles.textInput, AppStyles.darkTextInput]}
                       placeholder="Amount"
                       value={amount}
                       onChangeText={setAmount} />
            {showDatepicker && <DateTimePicker testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            onChange={onDatePickerChange} />}
            <SelectList setSelected={setSelectedDirection} onSelect={() => alert(selectedDirection)}
                        data={DIRECTIONS}  
                        arrowicon={<AntDesign name="downcircleo" size={12} color="black" />} 
                        search={false} 
                        boxStyles={{borderRadius:0}} //override default styles
                        defaultOption={DIRECTIONS[0]}  />
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
                    setComment("");      
                    setAmount("");      

                    props.addSpend({
                        comment: comment,
                        amount: amount,
                        date: date.toISOString(),
                        type: 0,
                        subType: 0,
                        direction: selectedDirection || DIRECTIONS[0].key,
                        user: auth.currentUser.uid,
                        id: 0,
                        currency: 0,
                        isCommon: isCommon
                    });

                    props.onClose();
                }} />
            </View>
        </View>
    )
}