import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/Home';
import SpendDetailsScreen from '../../screens/SpendDetails';

const Stack = createNativeStackNavigator();

// NavigationContainer - renders navigation
// Stack.Navigator - creates navigation
export const Navigation = () => {
    return <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SpendDetails" component={SpendDetailsScreen} />
    </Stack.Navigator>
    </NavigationContainer>;
}