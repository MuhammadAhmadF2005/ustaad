import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ServiceListingScreen from './src/screens/ServiceListingScreen';
import ServiceProviderProfileScreen from './src/screens/ServiceProviderProfileScreen';
import BookingScreen from './src/screens/BookingScreen';
import ChatScreen from './src/screens/ChatScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import WomensServicesScreen from './src/screens/WomensServicesScreen';

export type RootStackParamList = {
    Onboarding: undefined;
    Login: undefined;
    Home: undefined;
    ServiceListing: { category: string };
    ServiceProviderProfile: { providerId: string };
    Booking: { providerId: string };
    Chat: { chatId: string };
    Profile: undefined;
    WomensServices: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Onboarding">
                    <Stack.Screen
                        name="Onboarding"
                        component={OnboardingScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ServiceListing"
                        component={ServiceListingScreen}
                        options={{ title: 'Services' }}
                    />
                    <Stack.Screen
                        name="ServiceProviderProfile"
                        component={ServiceProviderProfileScreen}
                        options={{ title: 'Provider Profile' }}
                    />
                    <Stack.Screen
                        name="Booking"
                        component={BookingScreen}
                        options={{ title: 'Book Service' }}
                    />
                    <Stack.Screen
                        name="Chat"
                        component={ChatScreen}
                        options={{ title: 'Chat' }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{ title: 'My Profile' }}
                    />
                    <Stack.Screen
                        name="WomensServices"
                        component={WomensServicesScreen}
                        options={{ title: 'Women Services' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App; 