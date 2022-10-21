import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FindFriendsScreen from '../../Screens/FindFriendsScreen';
import OtherUserProfileScreen from '../../Screens/OtherUserProfileScreen';
import ImageViewScreen from '../../Screens/ImageViewScreen';
import NotificationsScreen from '../../Screens/NotificationsScreen';
import SettingsScreen from '../../Screens/SettingsScreen';
import ChangeEmailScreen from '../../Screens/ChangeEmailScreen';
import NewPasswordScreen from '../../Screens/NewPasswordScreen';
import NotificationPreferencesScreen from '../../Screens/NotificationPreferencesScreen';
import BlockedUsersScreen from '../../Screens/BlockedUsersScreen';
import TermsAndServicesScreen from '../../Screens/TermsAndServicesScreen';
import PrivacyPolicyScreen from '../../Screens/PrivacyPolicyScreen';
import ContactUsScreen from '../../Screens/ContactUsScreen';
import EditProfileScreen from '../../Screens/EditProfileScreen';
import ChangePasswordScreen from '../../ChangePasswordScreen';
import ProfileScreen from '../../Screens/ProfileScreen';
import UploadImageScreen from '../../Screens/UploadImageScreen';
import FeedScreen from '../../Screens/FeedScreen';
import LoginScreen from '../../Screens/LoginScreen';
import FollowUserProfile from '../../Screens/FollowUserProfile';
import FollowingUsersScreen from '../../Screens/FollowingUsersScreen';
import MyFollowUserProfileScreen from '../../Screens/MyFollowUserProfileScreen';
import ChatScreen from '../../Screens/ChatScreen';
import NearUserProfileScreen from '../../Screens/NearUserProfileScreen';

const Stack = createStackNavigator();

const FeedStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                // options={() => ({ title: '', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="Feed"
                component={FeedScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="FollowUser"
                component={FollowUserProfile}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="Image"
                component={ImageViewScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="Notification"
                component={NotificationsScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="Settings"
                component={SettingsScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="ChangeEmail"
                component={ChangeEmailScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="ChangePassword"
                component={ChangePasswordScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="NotificationPreferences"
                component={NotificationPreferencesScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="BlockedUsers"
                component={BlockedUsersScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="TermsAndServices"
                component={TermsAndServicesScreen}
            />

            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="PrivacyPolicy"
                component={PrivacyPolicyScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="Contact"
                component={ContactUsScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="EditProfile"
                component={EditProfileScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="Profile"
                component={ProfileScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="Upload"
                component={UploadImageScreen}
            />
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="Login"
                component={LoginScreen}
            /> 
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="FollowingUsers"
                component={FollowingUsersScreen}
            /> 
            <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="MyFollowUser"
                component={MyFollowUserProfileScreen}
            /> 
             <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="Chat"
                component={ChatScreen}
            /> 
             <Stack.Screen
                // options={() => ({ title: 'Live Tracking', headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#253f9e', shadowColor: '#253f9e' }, headerBackTitle: false })}
                name="NearUser"
                component={NearUserProfileScreen}
            /> 
        </Stack.Navigator>
    )
}
 
export default FeedStack