import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../../Screens/LoginScreen';
import WelcomeScreen from '../../Screens/WelcomeScreen';
import EmailAndPasswordScreen from '../../Screens/EmailAndPasswordScreen';
import AboutYourSelfScreen from '../../Screens/AboutYourSelfScreen';
import GolfPreferencesScreen from '../../Screens/GolfPreferencesScreen';
import HobbiesScreen from '../../Screens/HobbiesScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
                // options={() => ({ title: '', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="WelcomeScreen"
                component={WelcomeScreen}
            />
            <Stack.Screen
                // options={() => ({ title: '', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="LoginScreen"
                component={LoginScreen}
            />
             <Stack.Screen
                // options={() => ({ title: '', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="EmailAndPasswordScreen"
                component={EmailAndPasswordScreen}
            />
            <Stack.Screen
                // options={() => ({ title: '', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="AboutYourSelfScreen"
                component={AboutYourSelfScreen}
            />
             <Stack.Screen
                // options={() => ({ title: '', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="GolfPreferencesScreen"
                component={GolfPreferencesScreen}
            />
            <Stack.Screen
                // options={() => ({ title: '', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="HobbiesScreen"
                component={HobbiesScreen}
            />


        </Stack.Navigator>
    )
}

export default AuthStack