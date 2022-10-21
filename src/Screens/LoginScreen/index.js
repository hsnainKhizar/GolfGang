import { View, Text, SafeAreaView, StyleSheet,Platform, TouchableWithoutFeedback, ScrollView, Keyboard, TextInput, Alert, Dimensions, Image, TouchableOpacity, KeyboardAvoidingView, ImageBackground, Pressable } from 'react-native'
import Modal from "react-native-modal";
import React, { useEffect, useState } from 'react'
import { Button, RadioButton } from 'react-native-paper'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import axios from 'axios';
//import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux';

const baseUrl = 'https://golfgang.indexideaz.tech/api';

import AsyncStorage from '@react-native-async-storage/async-storage'
import BottomView from '../../BottomTab/BottomView';


const LoginScreen = (props) => {
    const [showPassword, setShowPassword] = useState(true)


    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [email, setEmail] = useState("");
    // const [indicator,setIndicator] = useState(false) 
    let backgroundcolor = '#fff'
    const [num, setNum] = useState(0)
    const [showApp, setShowApp] = useState(false)
    const [showModal, setShowModal] = useState(true)
    const [password, setPassword] = useState("");
    const [indicator, setIndicator] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setShowModal(true)
    }, [])

    const loginUser = async () => {

        await AsyncStorage.setItem('user_password', password)
        //console.log("userPassword",userPassword);
        let data = []
        let value = []
        let fcm = await AsyncStorage.getItem('fcmToken')
        console.log("fcm", fcm);

        setIndicator(true)
        try {
            const response = await axios.post(`${baseUrl}/login`, {
                email,
                password,
            });
            // console.log(response.data)

            if (response.status === 200) {
                // setIndicator(false)

                let userDetail = response.data

                data = JSON.stringify(response.data)

                value = JSON.parse(data)
                let id = value.user.id
                console.log("id", value.user.id);

                try {
                    const response = await axios.post(`${baseUrl}/updatefcm`, {
                        fcm,
                        id
                    });
                    //  console.log(response.data)

                    if (response.status === 200) {
                        console.log("fcm updated")
                    }
                } catch (error) {

                    console.log("here", error)
                }

                AsyncStorage.getItem('userData').then((datacart) => {
                    // console.log(datacart)
                    if (datacart !== null) {
                        const cart = JSON.parse(datacart)
                        cart.push(userDetail)
                        AsyncStorage.setItem('userData', JSON.stringify(cart))
                    }
                    else {
                        const cart = []
                        cart.push(userDetail)
                        AsyncStorage.setItem('userData', JSON.stringify(cart))
                    }
                    props.addItemToCart(num)
                }).catch((eror) => {
                    console.log(eror)
                })

                setShowApp(true)
                setIndicator(false)
                //navigation.replace('WelcomeScreen')
            }
        } catch (error) {
            setIndicator(false)
            console.log(error)
            Alert.alert("An error has occurred,try after some time");
        }
    }
    return (


        <View style={{ flex: 1 }}>

            <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
               
                    <View style={{ flex: 1 }}>



                        <View style={{ flex: 1 }}>

                            <Image style={{
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height
                            }} source={require('../../assets/loginBack.jpeg')} />
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            isVisible={showModal}
                            backdropOpacity={0.3}
                           // isVisible={this.state.showModal}
                        // onRequestClose={() => {
                        //     Alert.alert("Modal has been closed.");
                        //     setModalVisible(!showModal);
                        // }}
                        > 
                            <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                            <View style={styles.centeredView}>
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <View style={styles.modalView}>
                                     

                                            
                                                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', paddingBottom: 10 }}>
                                                    <Text style={{ marginLeft: 6, fontSize: 17, color: '#1D242D' }}>Login</Text>
                                                </View>


                                                <Text style={styles.textTitle}>Email Address</Text>
                                                <TextInput style={styles.textInput} onChangeText={setEmail} value={email} placeholder={"Email"}></TextInput>
                                                <Text style={styles.textTitle}>Password </Text>

                                                <View style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', paddingRight: 5, alignItems: 'center', marginTop: 14 }}>
                                                    <TextInput style={styles.passTextInput}  onChangeText={setPassword} value={password} secureTextEntry={showPassword} placeholder={"Password"}></TextInput>
                                                    {
                                                        showPassword === true ?
                                                            <Icon onPress={() => { setShowPassword(false); }} name="eye-off" size={17} />
                                                            :
                                                            <Icon onPress={() => { setShowPassword(true); }} name="eye" size={17} />
                                                    }
                                                </View>

                                                <Text style={{ marginTop: 26, color: '#2A7862',alignSelf:'center' }}>Reset Password</Text>

                                                <Button onPress={() => { loginUser() }}  loading={indicator} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold' }} style={styles.loginButton}>Log In</Button>
                                                <Text style={{ alignSelf:'center',color: 'black', marginBottom: 30 }}>Don't have an account ? <Pressable onPress={() => {
                                                    navigation.goBack()
                                                    setShowModal(false)
                                                }}>
                                                    <Text style={{ color: '#2A7862' }}>Sign up</Text></Pressable> </Text>
                                           
                                     
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            </KeyboardAvoidingView>
                        </Modal>

                    </View>
               
            </View>
        </View>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (num) => dispatch({ type: 'ADD_TO_CART', payLoad: num })
    }
}

export default connect(null, mapDispatchToProps)(LoginScreen);
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
        //flex:1,
        width: Dimensions.get('screen').width,
        backgroundColor: "white",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
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
        width: '95%'
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
        alignSelf: 'flex-start'
        // fontFamily:'Neue Haas Unica'
    },
    loginButton: {
        alignSelf: 'center',
        //position:'relative',
        marginBottom: 40,
        //right:0,
        //alignSelf:'flex-end',
        width: '100%',
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