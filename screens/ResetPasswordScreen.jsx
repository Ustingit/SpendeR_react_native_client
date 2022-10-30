import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/common/Buttons/InlineTextButton';
import { NAVIGATION_KEY as signUpPageKey } from './SignUpScreen';

const backgroundImage = require('../images/background-mountain_dark.jpg');

export default function ResetPasswordScreen({ navigation }) {
    const [email, setEmail] = useState(""); 

    return (
        <ImageBackground style={AppStyles.container} source={backgroundImage} >
<KeyboardAvoidingView style={AppStyles.backgroundCover} 
                      behavior={Platform.OS === "ios"? "padding" : null}
                      keyboardVerticalOffset={60} >
            <Text style={[AppStyles.lightText, AppStyles.header]} >Reset password</Text>
            <TextInput placeholder='Email' 
                       placeholderTextColor='#BEBEBE'
                       value={email}
                       onChangeText={setEmail} 
                       style={[AppStyles.textInput, AppStyles.lightText, AppStyles.lightTextInput]} />
            <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
                <Text style={AppStyles.lightText} >Don't have an account ? </Text>
                <InlineTextButton text="Sign Up" onPress={() => navigation.navigate(signUpPageKey)} ></InlineTextButton>
            </View>
            <Button title="Reset" color="#f7b267" ></Button>
        </KeyboardAvoidingView>
        </ImageBackground>
    );
}

export const NAVIGATION_KEY = "ResetPasswordScreen";
