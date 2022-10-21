
import React from 'react'
import { View, Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Feather';
import FeedScreen from '../Screens/FeedScreen';
import FindFriendsScreen from '../Screens/FindFriendsScreen';
import CompetitionScreen from '../Screens/CompetitionsScreen';
import MessagesScreen from '../Screens/MessagesScreen';
import FindFriendsStack from '../NavigationStacks/FindFriendsStack';
import CompetitionStack from '../NavigationStacks/CompetitionStack';
import FeedStack from '../NavigationStacks/FeedStack';
import MessagesStack from '../NavigationStacks/MessagesStack';

const Tab = createBottomTabNavigator();

const BottomView = () => {
   return (
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#fff' } }} tabBarOptions={{ activeTintColor: '#090B0E', inactiveTintColor: '#546881' }} >
         <Tab.Screen
            component={FeedStack}
            name="Feed"
            options={{
               tabBarIcon: ({ color }) => (
                  //   <Entypo name="home" color={color} size={24} />
                  <Image style={{ tintColor: color }} source={require('../assets/Paper_fill.png')} />
               ),
            }}
            screenOptions={{}}
         />
         <Tab.Screen
            component={FindFriendsStack}
            name="Find Friends"
            options={{
               tabBarIcon: ({ color }) => (
                  //   <Entypo name="home" color={color} size={24} />
                  <Image style={{ tintColor: color }} source={require('../assets/User_fill_add.png')} />
               ),
            }}
         />
         <Tab.Screen
            component={CompetitionStack}
            name="Competitions"
            options={{
               tabBarIcon: ({ color }) => (
                  //   <Entypo name="home" color={color} size={24} />
                  <Image style={{ tintColor: color }} source={require('../assets/Flag_fill.png')} />
               ),
            }}
         />
         <Tab.Screen
            component={MessagesStack}
            name="Message"
            options={{
               tabBarIcon: ({ color }) => (
                  //   <Entypo name="home" color={color} size={24} />
                  <Image style={{ tintColor: color }} source={require('../assets/Chat_fill.png')} />
               ),
            }}
         />
      </Tab.Navigator>
   )
}

export default BottomView
