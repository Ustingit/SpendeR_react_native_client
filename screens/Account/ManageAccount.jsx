import { Button, View, TextInput, Text } from "react-native";
import React, { useState } from "react";
import AppStyles from "../../styles/AppStyles";
import { auth, db, SPEND_COLLECTION } from '../../firebase';
import { signOut, updatePassword, deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, writeBatch } from "firebase/firestore";

export default function ManageAccount({ navigation }) {
    const [currentPassword, setCurrentNewPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");

    let logOut = () => {
        signOut(auth).then(() => {
            navigation.popToTop();
        });
    };

    let updateUserPassword = () => {
        signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
        .then((userCredential) => {
            const user = userCredential.user;

            updatePassword(user, newPassword)
            .then(() => {
                setNewPassword("");
                setCurrentNewPassword("");
                setError("");
            })
            .catch((error) => {
                setError(error);
            });
        })
        .catch((error) => { setError(error); });
    };

    let deleteCurrentUser = () => {
        if (currentPassword === "") {
            setError("Must enter current password to delete account.");
        } else {
            signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
            .then((userCredential) => {
                const user = userCredential.user;

                let batch = writeBatch(db);
                const q = query(collection(db, SPEND_COLLECTION), where("user", "==", user.uid));
                getDocs(q).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        batch.delete(doc.ref);
                    });
                    batch.commit();
                });

                deleteUser(user)
                .then(() => {
                    setNewPassword("");
                    setCurrentNewPassword("");
                    setError("");
                    navigation.popToTop();
                })
                .catch((error) => {
                    setError(error);
                });
            })
            .catch((error) => { setError(error); });
        }
    };

    return (
        <View style={AppStyles.container} >
            <Text style={AppStyles.errorText} >{error}</Text>
            <TextInput style={[AppStyles.textInput, AppStyles.darkTextInput]}
                       placeholder="Current Password"
                       value={currentPassword}
                       onChangeText={setCurrentNewPassword} />
            <TextInput style={[AppStyles.textInput, AppStyles.darkTextInput]}
                       placeholder="New Password"
                       value={newPassword}
                       onChangeText={setNewPassword} />
            <Button onPress={updateUserPassword} title="Update Password" />
            <Button onPress={deleteCurrentUser} title="Delete User" />
            <Button onPress={logOut} title="Logout" />
            <Button onPress={() => navigation.pop()} title="Back to home" />
        </View>
    );
}

export const NAVIGATION_KEY = "ManageAccount";