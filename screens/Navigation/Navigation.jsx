import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen, { NAVIGATION_KEY as homeKey } from '../../screens/Home';
import SpendDetailsScreen, { NAVIGATION_KEY as detailsKey } from '../../screens/SpendDetails';
import LoginScreen, { NAVIGATION_KEY as loginKey } from '../LoginScreen';
import SignUpScreen, { NAVIGATION_KEY as signUpKey } from '../SignUpScreen';
import ResetPasswordScreen, { NAVIGATION_KEY as resetPasswordKey } from '../ResetPasswordScreen';
import ManageAccount, { NAVIGATION_KEY as manageAccountKey } from '../Account/ManageAccount';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Octicons, AntDesign } from '@expo/vector-icons';
import TypesManagementScreen, { NAVIGATION_KEY as typesManagementKey } from '../TypesManagementScreen';
import ReportsScreen, { NAVIGATION_KEY as reportsKey } from '../ReportsScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// NavigationContainer - renders navigation
// Stack.Navigator - creates navigation
export const UnAuthorizedNavigation = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen name={loginKey} component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name={signUpKey} component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name={resetPasswordKey} component={ResetPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name={NAVIGATION_KEY_AUTHORIZED_PAGES} component={AuthorizedNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export const AuthorizedNavigation = () => {
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
    
    return (<Tab.Navigator labeled={false} barStyle={{backgroundColor: 'black'}} activeColor='white' >
                <Tab.Screen name={homeKey} insiggear
                              component={HomeScreen} 
                              options={{
                                headerRight: () => showLogoutButton(),
                                headerShown: false,
                                tabBarIcon: ({color, size}) => (
                                    <MaterialCommunityIcons name='home' color={color} size={26} />
                                ) 
                              }} />
                <Tab.Screen name={reportsKey} 
                              component={ReportsScreen}
                              options={{
                                tabBarIcon: ({color, size}) => (
                                    <MaterialIcons name='insights' color={color} size={26} />
                                ) 
                              }} />
                <Tab.Screen name={typesManagementKey} 
                              component={TypesManagementScreen}
                              options={{
                                tabBarIcon: ({color, size}) => (
                                    <AntDesign name='sharealt' color={color} size={26} />
                                ) 
                              }} />
                <Tab.Screen name={manageAccountKey} 
                              component={ManageAccount} 
                              options={{ 
                                headerShown: false,
                                tabBarIcon: ({color, size}) => (
                                    <Octicons name='gear' color={color} size={26} />
                                ) 
                              }} />
                <Tab.Screen name={detailsKey} component={SpendDetailsScreen} options={{ tabBarVisible: false }} />
            </Tab.Navigator>);
};

export const NAVIGATION_KEY_AUTHORIZED_PAGES = "AuthorizedNavigationPages";