import { View, Text, SafeAreaView, StyleSheet, TextInput, Alert, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, ImageBackground,Modal,Pressable } from 'react-native'

import React, { useState } from 'react'
import { Button, RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
  
const ResetPasswordScreen = () => {
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [email, setEmail] = useState("");
    let backgroundcolor = '#fff'
    const [showModal, setShowModal] = useState(false)
    const [password, setPassword] = useState("");
    const [indicator, setIndicator] = useState(false);

    const enableLocation = () => {
        backgroundcolor = 'grey'
        setShowModal(true)
    }
    return (
        <View style={{flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

            </SafeAreaView>

            <View style={{ backgroundColor: '#2A7862' }}>
                <Text></Text>
            </View>
            <View style={{ backgroundColor: '#2A7862' }}>
                <Text></Text>
            </View>
            <View style={{ backgroundColor: '#2A7862' }}>
                <Text></Text>
            </View>
            <View style={{ backgroundColor: '#2A7862', paddingBottom: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginLeft: 16 }}>Reset your password</Text>
                <Text style={{ color: '#CCDFD9', fontWeight: 'bold', fontSize: 12,marginTop:10, alignSelf: 'flex-start', marginLeft: 16 }}>The link to enter a new password will be sent to your email address.if you dont see the link,checkout spam folder</Text>
            </View>

            <View style={{ flexDirection: 'column', flex: 1, padding: 15, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textTitle}>Email Address</Text>
                    <TextInput style={styles.textInput} onChangeText={setEmail} value={email} placeholder={"Enter Email Address"} ></TextInput>
                   

                </View>
                

                <View style={{ flexDirection: 'column' }}>
                    <Button uppercase={false} mode="contained" onPress={() => {  }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} loading={indicator} style={styles.loginButton}>Reset Password</Button>
                </View>
            </View>
          
        </View>

    )
}

export default ResetPasswordScreen
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
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
       // padding: 15,
    },
    modalView: {
        //margin: 20,
        width: '100%',
        backgroundColor: "white",
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
       // borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
       // shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    passTextInput: {
        height: 40,
        //marginTop:10,
        // borderWidth:1,
        padding: 10,
        backgroundColor: '#F2F4F7',
        fontSize: 16,
        borderColor: 'black',
        borderRadius: 5,
        width: '90%'
    },
    textInput: {
        height: 40,
        marginTop: 14,
        //borderWidth: 1,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#F2F4F7',
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
        color: '#090B0E',
        marginTop: 14,
        fontSize: 16,
        // fontFamily:'Neue Haas Unica'
    },
    loginButton: {
        alignSelf: 'center',
        //position:'relative',
        marginBottom: 70,
        //right:0,
        //alignSelf:'flex-end',
        width: '80%',
        borderRadius: 10,
        // marginTop: 300,
        backgroundColor: '#2A7862',
        // color:'white',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 2,
        top: 20,
    },
})