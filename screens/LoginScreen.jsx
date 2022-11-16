import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/common/Buttons/InlineTextButton';
import { NAVIGATION_KEY as signUpPageKey } from './SignUpScreen';
import { NAVIGATION_KEY as resetPasswordPageKey } from './ResetPasswordScreen';
import { NAVIGATION_KEY as homeScreenKey } from './Home';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { NAVIGATION_KEY_AUTHORIZED_PAGES as authorizedPagesKey } from './Navigation/Navigation';
 
const backgroundImage = require('../images/background-mountain_dark.jpg');

export default function LoginScreen({ navigation }) {
    if (auth.currentUser) {
        navigation.navigate(authorizedPagesKey, { screen: homeScreenKey });
    } else {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate(authorizedPagesKey, { screen: homeScreenKey });
            }
        });
    }

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [errorMessage, setErrorMessage] = useState(""); 

    let login = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(`!!! ==> succesfully logged in: ${JSON.stringify(userCredential.user)}`);
                navigation.navigate(authorizedPagesKey, { screen: homeScreenKey });
                setEmail("");
                setPassword("");
                setErrorMessage("");
            })
            .catch((error) => {
                console.log(`!!! ==> error during logging in: ${error.code} with message: ${error.message}`);
                setErrorMessage(error.message);
            });
        }
    }

    return (
        <ImageBackground style={AppStyles.container} source={backgroundImage} >
<KeyboardAvoidingView style={AppStyles.backgroundCover} 
                      behavior={Platform.OS === "ios"? "padding" : null}
                      keyboardVerticalOffset={60} >
            <Text style={[AppStyles.lightText, AppStyles.header]} >Login</Text>
            <Text style={AppStyles.errorText} >{errorMessage}</Text>
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
            <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
                <Text style={AppStyles.lightText} >Don't have an account ? </Text>
                <InlineTextButton text="Sign Up" onPress={() => navigation.navigate(signUpPageKey)} ></InlineTextButton>
            </View>
            <View style={[AppStyles.rowContainer, AppStyles.bottomMargin]}>
                <Text style={AppStyles.lightText} >Forgotten your password ? </Text>
                <InlineTextButton text="Reset" onPress={() => navigation.navigate(resetPasswordPageKey)} ></InlineTextButton>
            </View>
            <Button title="Login" onPress={login} color="#f7b267" ></Button>
        </KeyboardAvoidingView>
        </ImageBackground>
    );
}

export const NAVIGATION_KEY = "LoginScreen";
