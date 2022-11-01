import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/common/Buttons/InlineTextButton';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { NAVIGATION_KEY as homeScreenKey } from './Home';

const backgroundImage = require('../images/background-mountain_dark.jpg');
const auth = getAuth();

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [validationMessage, setValidationMessage] = useState(""); 

    let validateAndSet = (value, valueToCompare, setValue) => {
        if (value != valueToCompare) {
            setValidationMessage("Password do not match.");
        } else {
            setValidationMessage("");
        }

        setValue(value);
    };

    let signUp = () => {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(`!!! ==> succesfully signed up: ${JSON.stringify(userCredential.user)}`);
                navigation.navigate(homeScreenKey, { user: userCredential.user });
            }).catch((error) => {
                console.log(`!!! ==> error during signin up: ${error.code} with message: ${error.message}`);
                setValidationMessage(error.message);
            });
        }
    };

    return (
        <ImageBackground style={AppStyles.container} source={backgroundImage} >
<KeyboardAvoidingView style={AppStyles.backgroundCover} 
                      behavior={Platform.OS === "ios"? "padding" : null}
                      keyboardVerticalOffset={60} >
            <Text style={[AppStyles.lightText, AppStyles.header]} >Sign Up</Text>
            <Text style={AppStyles.errorText} >{validationMessage}</Text>
            <TextInput placeholder='Email' 
                       placeholderTextColor='#BEBEBE'
                       value={email}
                       onChangeText={setEmail} 
                       style={[AppStyles.textInput, AppStyles.lightText, AppStyles.lightTextInput]} />
            <TextInput placeholder='Password' 
                       placeholderTextColor='#BEBEBE' 
                       secureTextEntry={true}
                       value={password}
                       onChangeText={setPassword}
                       style={[AppStyles.textInput, AppStyles.lightText, AppStyles.lightTextInput]} />
            <TextInput placeholder='Confirm password' 
                       placeholderTextColor='#BEBEBE' 
                       secureTextEntry={true}
                       value={confirmPassword}
                       onChangeText={(newValue) => validateAndSet(newValue, password, setConfirmPassword)}
                       style={[AppStyles.textInput, AppStyles.lightText, AppStyles.lightTextInput]} />
            <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
                <Text style={AppStyles.lightText} >Already have an account ? </Text>
                <InlineTextButton text="Login" onPress={() => navigation.popToTop()} ></InlineTextButton>
            </View>
            <Button title="Sign Up" onPress={signUp} color="#f7b267" ></Button>
        </KeyboardAvoidingView>
        </ImageBackground>
    );
}

export const NAVIGATION_KEY = "SignUpScreen";
