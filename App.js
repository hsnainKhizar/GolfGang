/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//import React from 'react';
import React, { useEffect, useState } from 'react'

import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';


import Routes from './src/Routes';
import store from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { notificationListener, requestUserPermission } from './src/Components/Notifications';

const App = (props) => {

  const [userInfo, setInfo] = useState([])
  const [showSplash, setSplash] = useState(false)


  useEffect(() => {

    requestUserPermission()
    notificationListener()
    setSplash(true)
    setTimeout(() => {
      setSplash(false)
    }, 3000)
    // requestUserPermission()
    // notificationListener()
  }, [])

  // useEffect(async()=>{
  //   await AsyncStorage.removeItem('userData').then((res) => {
  //     // this.props.addItemToCart(this.state.num)
  //     //this.props.navigation.navigate('LoginScreen')

  // })
  //     .catch((e) => {
  //     })
  // }) 

  // if (Platform.OS == 'android') {
    
    
  //   return (
  //     <View>
  //       {
  //         showSplash === true && (
  //           <Image source={require('./src/assets/splashGolf.png')} />
  //         )
  //       }
  //     </View>
  //   )
  // }

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor="#2A7862"
        barStyle="light-content"
      />
      {
          Platform.OS == 'android' && showSplash === true ?
            <Image source={require('./src/assets/splashGolf.png')}/>
          :
          <Routes />
        }
      
    </Provider>
  )
};
export default App;
