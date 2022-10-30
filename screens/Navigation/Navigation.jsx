import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen, { NAVIGATION_KEY as homeKey } from '../../screens/Home';
import SpendDetailsScreen, { NAVIGATION_KEY as detailsKey } from '../../screens/SpendDetails';
import LoginScreen, { NAVIGATION_KEY as loginKey } from '../LoginScreen';
import SignUpScreen, { NAVIGATION_KEY as signUpKey } from '../SignUpScreen';

const Stack = createNativeStackNavigator();

// NavigationContainer - renders navigation
// Stack.Navigator - creates navigation
export const Navigation = () => {
    return <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name={loginKey} component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name={signUpKey} component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name={homeKey} component={HomeScreen} />
        <Stack.Screen name={detailsKey} component={SpendDetailsScreen} />
    </Stack.Navigator>
    </NavigationContainer>;
}