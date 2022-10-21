import { View, Text, SafeAreaView, StyleSheet, TextInput, Alert, Pressable, Dimensions, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native'

import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button, RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
  
const WelcomeScreen = () => {
   

    const navigation = useNavigation();

 
    
    const loginUser = ()=> {
       navigation.navigate('LoginScreen')
    }
    const createAccount = ()=> {
        navigation.navigate('EmailAndPasswordScreen')
    }

    return (
        <View style={{}}>
            <Image style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
            }} source={require('../../assets/loginBack.jpeg')} />

            <View style={{ position: 'absolute', height: Dimensions.get('window').height, alignSelf: 'center', justifyContent: 'space-between' }}>

                <View style={{}}>
                    <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                        <SafeAreaView></SafeAreaView>
                        {/* <Image style={{ alignSelf: 'center', marginBottom: 30,marginTop:30 }} source={require('../../assets/front.png')} /> */}
                        {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginBottom: 15 }}>Welcome to Golfgang!</Text> */}
                        <View style={{ padding:20}}>
                            {/* <Text style={{ color: 'white', fontWeight: '400', alignSelf: 'center', fontSize: 16 }}>Start using our app and level up your golf experience</Text> */}
                        </View>
                    </View>

                </View>

                <View style={{ marginBottom: 70 }}>
                    <View style={{ alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                            <Pressable onPress={loginUser} style={{ borderWidth: 1, borderColor: 'white', padding: 17, borderRadius: 14 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>         Log In            </Text>
                            </Pressable>
                            <Pressable onPress={createAccount} style={{ borderWidth: 1, borderColor: 'white', backgroundColor: 'white', padding: 17, borderRadius: 14, marginLeft: 10 }}>
                                <Text style={{ color: '#2A7862', fontWeight: '500', fontSize: 16 }}>   Create Account   </Text>
                            </Pressable>
                        </View>
                        {/* <Image style={{alignSelf:'center'}} source={require('../../assets/front.png')}/>
                        <Text>Welcome to Golfgang!</Text> */}
                    </View>

                </View>
            </View>
        </View>


    )
}

export default WelcomeScreen
const styles = StyleSheet.create({
    background: {
        flex: 0.22,
        // borderBottomRightRadius: 30,
        //borderBottomLeftRadius: 30,
        // backgroundColor:"#253f9e",
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        //position:'absolute',
        //left:30,
        //right:30,
        //top:120,
        //bottom:100,
        borderRadius: 10,
        padding: 16,
        //paddingTop:100,
    },
    passTextInput: {
        height: 40,
        //marginTop:10,
        // borderWidth:1,
        padding: 10,
        fontSize: 16,
        borderColor: 'black',
        borderRadius: 5,
        width: '90%'
    },
    textInput: {
        height: 40,
        marginTop: 14,
        borderWidth: 1,
        padding: 5,
        fontSize: 16,
        borderColor: 'black',
        borderRadius: 2,
        width: '100%'
    },
    textInputCountry: {
        height: 40,
        marginTop: 10,
        borderWidth: 1,
        padding: 5,
        fontSize: 16,
        borderColor: 'black',
        borderRadius: 2,
        width: '25%'
    },
    textTitle: {
        color: 'black',
        marginTop: 14,
        fontSize: 13,
        // fontFamily:'Neue Haas Unica'
    },
    loginButton: {
        alignSelf: 'center',
        // position:'absolute',
        //bottom:0,
        //right:0,
        // alignSelf:'flex-end',
        width: '80%',
        borderRadius: 10,
        marginTop: 300,
        backgroundColor: '#2A7862',
        // color:'white',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 2,
        top: 20,
    },
})