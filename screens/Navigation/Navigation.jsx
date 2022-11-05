import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen, { NAVIGATION_KEY as homeKey } from '../../screens/Home';
import SpendDetailsScreen, { NAVIGATION_KEY as detailsKey } from '../../screens/SpendDetails';
import LoginScreen, { NAVIGATION_KEY as loginKey } from '../LoginScreen';
import SignUpScreen, { NAVIGATION_KEY as signUpKey } from '../SignUpScreen';
import ResetPasswordScreen, { NAVIGATION_KEY as resetPasswordKey } from '../ResetPasswordScreen';
import ManageAccount, { NAVIGATION_KEY as manageAccountKey } from '../Account/ManageAccount';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Stack = createNativeStackNavigator();

// NavigationContainer - renders navigation
// Stack.Navigator - creates navigation
export const Navigation = () => {
    let logout = () => {
        signOut(auth).then(() => {
            console.log(`!!! ==> succesfully signed out!`);
          })
      }

    let showLogoutButton = () => {
        if (auth.currentUser) {
            return (<Button
              onPress={logout}
              title="Logout"
              color="#b2adad"
            />);
        } else {
            return (<></>);
        }
    }

    return <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name={loginKey} component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name={signUpKey} component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name={resetPasswordKey} component={ResetPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name={homeKey} 
                      component={HomeScreen} 
                      options={{
                        headerRight: () => showLogoutButton()
                      }} />
        <Stack.Screen name={detailsKey} component={SpendDetailsScreen} />
        <Stack.Screen name={manageAccountKey} component={ManageAccount} options={{ headerShown: false }} />
    </Stack.Navigator>
    </NavigationContainer>;
}