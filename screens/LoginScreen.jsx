import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/common/Buttons/InlineTextButton';

const backgroundImage = require('../images/background-mountain_dark.jpg');

export default function LoginScreen() {
    const [userName, setUserName] = useState(""); 
    const [password, setPassword] = useState(""); 

    return (
        <ImageBackground style={AppStyles.container} source={backgroundImage} >
<KeyboardAvoidingView style={AppStyles.backgroundCover} 
                      behavior={Platform.OS === "ios"? "padding" : null}
                      keyboardVerticalOffset={60} >
            <Text style={[AppStyles.lightText, AppStyles.header]} >Login</Text>
            <TextInput placeholder='Username' 
                       placeholderTextColor='#BEBEBE'
                       value={userName}
                       onChangeText={setUserName} 
                       style={[AppStyles.textInput, AppStyles.lightText, AppStyles.lightTextInput]} />
            <TextInput placeholder='Password' 
                       placeholderTextColor='#BEBEBE' 
                       secureTextEntry={true}
                       value={password}
                       onChangeText={setPassword}
                       style={[AppStyles.textInput, AppStyles.lightText, AppStyles.lightTextInput]} />
            <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
                <Text style={AppStyles.lightText} >Don't have an account ? </Text>
                <InlineTextButton text="Sign Up" ></InlineTextButton>
            </View>
            <View style={[AppStyles.rowContainer, AppStyles.bottomMargin]}>
                <Text style={AppStyles.lightText} >Forgotten your password ? </Text>
                <InlineTextButton text="Reset" ></InlineTextButton>
            </View>
            <Button title="Login" color="#f7b267" ></Button>
        </KeyboardAvoidingView>
        </ImageBackground>
    );
}

export const NAVIGATION_KEY = "LoginScreen";