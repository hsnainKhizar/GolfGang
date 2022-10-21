import { View, Text, SafeAreaView, Keyboard, TouchableWithoutFeedback, Pressable, StyleSheet, TextInput, Alert, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native'

import React, { useState } from 'react'
import { Button, RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';

const EmailAndPasswordScreen = () => {
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [indicator, setIndicator] = useState(false);
    const navigation = useNavigation();


    const checkData = () => {
        //console.log("email",email);
        //console.log("password",password);
        //console.log("email",email);
        navigation.navigate('AboutYourSelfScreen', { email, password })
    }



    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flexDirection: 'column', backgroundColor: "white", flex: 1 }}>

           
           
                <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                </SafeAreaView>
                <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View>
                <View style={{ backgroundColor: '#2A7862', paddingBottom: 10 }}>
                    <Pressable onPress={() => { navigation.goBack() }} style={{ flexDirection: 'row' }}>
                        <Icon style={{ marginLeft: 10 }} color={"white"} name="chevron-left" size={25} />
                    </Pressable>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginLeft: 16, marginTop: 14 }}>What's Your Email Address And Password?</Text>
                </View>
              
                <View style={{ flexDirection: 'column', padding: 15 }}>
                    <Text style={styles.textTitle}>Email Address</Text>
                    <TextInput style={styles.textInput} onChangeText={setEmail} value={email} placeholder={"Email"}></TextInput>
                    <Text style={styles.textTitle}>Password </Text>

                    <View style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', alignItems: 'center', marginTop: 14 }}>
                        <TextInput style={styles.passTextInput} onChangeText={setPassword} value={password} secureTextEntry={showPassword} placeholder={"Password"}></TextInput>
                        {
                            showPassword === true ?
                                <Icon onPress={() => { setShowPassword(false); }} name="eye-off" size={17} />
                                :
                                <Icon onPress={() => { setShowPassword(true); }} name="eye" size={17} />
                        }
                    </View>



                    {/* <TextInput secureTextEntry={true} style={styles.textInput} onChangeText={setPassword} value={password} placeholder={"password"}  ></TextInput> */}
                    <Text style={styles.textTitle}>Confirm Password</Text>
                    <View style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', alignItems: 'center', marginTop: 14 }}>
                        <TextInput style={styles.passTextInput} onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry={showConfirmPassword} placeholder={"Confirm Password"}></TextInput>
                        {
                            showConfirmPassword === true ?
                                <Icon onPress={() => { setShowConfirmPassword(false); }} name="eye-off" size={17} />
                                :
                                <Icon onPress={() => { setShowConfirmPassword(true); }} name="eye" size={17} />
                        }
                    </View>

                    {
                        password !== confirmPassword && (
                            <Text style={{ color: 'red' }}>Passwords do not match</Text>
                        )
                    }
                    {/* <View style={{flex:1,flexDirection:'column',backgroundColor:'red'}}> */}

                    {/* </View> */}

                </View>
               

                {
                    password === confirmPassword && email !== "" && password !== "" && confirmPassword !== "" ?
                        <View style={{ position: 'absolute', bottom: 0, width: '100%', marginBottom: 60 }}>
                            <Button uppercase={false} mode="contained" onPress={() => { checkData() }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} loading={indicator} style={styles.loginButton}>Continue</Button>
                        </View> :
                        <View style={{ position: 'absolute', bottom: 0, width: '100%', marginBottom: 60 }}>
                            <Button uppercase={false} mode="contained" labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} loading={indicator} style={styles.loginButtonDim}>Continue</Button>
                        </View>
                }

           

        </View>
        </TouchableWithoutFeedback>
        


    )
}

export default EmailAndPasswordScreen
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
        //borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderColor: 'black',
        backgroundColor: '#F2F4F7',
        borderRadius: 2,
        width: '100%'
    },

    textTitle: {
        color: 'black',
        marginTop: 14,
        fontSize: 13,
        // fontFamily:'Neue Haas Unica'
    },
    loginButtonDim: {
        alignSelf: 'center',
        // position:'absolute',
        //bottom:0,
        //right:0,
        // alignSelf:'flex-end',
        width: '80%',
        borderRadius: 10,
        //  marginTop:300,
        backgroundColor: '#ccc',
        // color:'white',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 2,
        top: 20,
    },
    loginButton: {
        alignSelf: 'center',
        // position:'absolute',
        //bottom:0,
        //right:0,
        // alignSelf:'flex-end',
        width: '80%',
        borderRadius: 10,
        //  marginTop:300,
        backgroundColor: '#2A7862',
        // color:'white',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 2,
        top: 20,
    },
})