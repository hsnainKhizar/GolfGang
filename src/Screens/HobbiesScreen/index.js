import { View, Text, SafeAreaView, Dimensions,TouchableWithoutFeedback,Keyboard, ActivityIndicator, StyleSheet, TextInput, Alert, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, ImageBackground, Pressable } from 'react-native'

import React, { useEffect, useState } from 'react'
import { Button, RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
import Modal from "react-native-modal";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import GetLocation from 'react-native-get-location'
import BottomView from '../../BottomTab/BottomView';

const baseUrl = 'https://golfgang.indexideaz.tech/api';

const HobbiesScreen = (props) => {

    const [job_type, setJob] = useState("");
    const [hobby, setHobbies] = useState("");
    const [isCreated, setCreated] = useState(false)
    const [location, setLocation] = useState("");

    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false)

    const [indicator, setIndicator] = useState(false);


    useEffect(() => {
        // console.log(props.route.params);
    })

    const enableLocation = () => {

        //only location and handicap

        console.log("job", job_type);
        console.log("hobby", hobby);
        console.log("location", location);
        //
        // backgroundcolor = 'grey'
        setShowModal(true)
    }

    const registerUser = async () => {
        setIndicator(true)

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                // setLocation(location)
                console.log("location",location);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })

        let email = props.route.params.email
        let password = props.route.params.password
        let name = props.route.params.name
        let age = props.route.params.age
        let gender = props.route.params.gender
        let city = props.route.params.city
        let state = props.route.params.state
         let location = props.route.params.zipcode
        let image = ""

        let betting = props.route.params.betting
        let drinking = props.route.params.drinking
        let handicap = props.route.params.handicap.toString()
        let smoking = props.route.params.smoking
        let home_golf_course = props.route.params.home_golf_course


        console.log("email", email);
        console.log("password", password);
        console.log("name", name);
        console.log("age", age);
        console.log("gender", gender);
        console.log("city", city);
        console.log("state", state);
        console.log("zipcode", location);
        console.log("email", betting);
        console.log("password", drinking);
        console.log("name", smoking);
        console.log("age", handicap);
        console.log("gender", home_golf_course);








        try {
            const response = await axios.post(`${baseUrl}/register`, {
                email,
                password,
                image,
                name,
                age,
                gender,
                city,
                state,
                betting,
                drinking,
                handicap,
                smoking,
                home_golf_course,
                job_type,
                hobby,
                location,
            });
            if (response.status === 200) {
                setIndicator(false)
                // console.log(response.data);
                Alert.alert('Account Successfully Created')
                setShowModal(false);
                setCreated(true)
                navigation.replace('WelcomeScreen') 
            }
        } catch (error) {
            setIndicator(false)
            console.log(error)
            Alert.alert("An error has occurred,try after some time");
        }
    }

    // if(isCreated == true){
    //     return(
    //         <BottomView />
    //     )
    // }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ backgroundColor: '#2A7862' }}>
            </SafeAreaView>
            <View style={{ backgroundColor: '#2A7862' }}>
                <Text></Text>
            </View>
            <View style={{ backgroundColor: '#2A7862', paddingBottom: 10 }}>
                <Pressable onPress={() => { navigation.goBack() }} style={{ flexDirection: 'row' }}>
                    <Icon style={{ marginLeft: 10 }} color={"white"} name="chevron-left" size={25} />
                </Pressable>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginLeft: 16, marginTop: 14 }}>What do you do besides golf?</Text>
            </View>

            <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white', padding: 15, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textTitle}>What do you do for a living?</Text>
                    <TextInput style={styles.textInput} onChangeText={setJob} value={job_type} ></TextInput>
                    <Text style={styles.textTitle}>What are your hobbies beyond golf?</Text>
                    <TextInput style={styles.textInput} onChangeText={setHobbies} value={hobby}></TextInput>
                </View>
                {
                    indicator === true && (
                        <ActivityIndicator size="large" color={"#2A7862"} />
                    )
                }


                <View style={{ flexDirection: 'column' }}>
                    <Button uppercase={false} mode="contained" onPress={() => { enableLocation() }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} loading={indicator} style={styles.loginButton}>Submit</Button>
                </View>
            </View>
            <Modal
                backdropOpacity={0.3}
                isVisible={showModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>


                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                            <Icon name="map-pin" size={17} />
                            <Text style={{ marginLeft: 6, fontSize: 20, color: '#1D242D' }}>Enable your location</Text>
                        </View>
                        <Text style={{ marginTop: 10, fontSize: 16, color: '#1D242D' }}>
                            To get the best experience of the app,see competitions or people nearby,please enable your geolocation.We don't store or share the data
                        </Text>


                        <View style={{ flexDirection: 'row' }}>
                            <Pressable onPress={() => { setShowModal(false); registerUser() }} style={{ marginTop: 15, paddingLeft: 24, paddingRight: 24, paddingBottom: 16, paddingTop: 16, backgroundColor: '#fff', borderRadius: 5 }}>
                                <Text style={{ color: 'black' }}>Do It Later</Text>
                            </Pressable>
                            <Pressable onPress={() => { registerUser() }} style={{ marginTop: 15, marginLeft: 6, paddingLeft: 54, paddingRight: 54, paddingBottom: 18, paddingTop: 18, backgroundColor: '#2A7862', borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Enable</Text>
                            </Pressable>
                        </View>



                        {/* <Button onPress={() => { this.setState({ modalVisible: false }) }} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 12 }} style={styles.loginButton}>Close</Button> */}

                    </View>
                </View>
            </Modal>

        </View>
        </TouchableWithoutFeedback>
    )
}

export default HobbiesScreen
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
        //marginTop: 22,
        // padding: 15,
    },
    modalView: {
        //margin: 20,
        width: Dimensions.get('window').width,
        marginBottom: -20,
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