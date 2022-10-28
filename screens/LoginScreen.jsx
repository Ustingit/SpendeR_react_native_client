import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/common/Buttons/InlineTextButton';

const backgroundImage = require('../images/background-mountain_dark.jpg');

export default function LoginScreen() {
    const [userName, setUserName] = useState(""); 
    const [password, setPassword] = useState(""); 

    return (
        <ImageBackground style={AppStyles.container} source={backgroundImage} >
<View style={AppStyles.backgroundCover} >
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
            <View style={AppStyles.rowContainer}>
                <Text style={AppStyles.lightText} >Don't have an account ? </Text>
                <InlineTextButton text="Sign Up" ></InlineTextButton>
            </View>
        </View>
        </ImageBackground>
    );
}

export const NAVIGATION_KEY = "LoginScreen";
