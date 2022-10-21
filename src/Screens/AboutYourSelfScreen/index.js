import { View, Text, SafeAreaView, Pressable, StyleSheet, TextInput, Alert, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, ImageBackground, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'

import React, { useEffect, useState } from 'react'
import { Button, RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';

const AboutYourSelfScreen = (props) => {
    const [showPassword, setShowPassword] = useState(true)

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("")
    const [count, setCount] = useState("0")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")

    const navigation = useNavigation();



    useEffect(() => {
        //console.log("data",props.route.params.email);
    })

    checkData = () => {
        let email = props.route.params.email
        let password = props.route.params.password

        console.log("email", email);
        console.log("password", password);
        console.log("name", name);
        console.log("age", age);
        console.log("gender", gender);
        console.log("city", city);
        console.log("state", state);
        if (zipcode == "") {
            Alert.alert('Zipcode is required')
        } else {
            navigation.navigate('GolfPreferencesScreen', { email, password, name, age, gender, city, state, zipcode })
        }


    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginLeft: 16, marginTop: 14 }}>Tell us about yourself</Text>
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flexDirection: 'column', flex: 1, padding: 15, justifyContent: 'space-between' }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.textTitle}>Full Name</Text>
                                <TextInput style={styles.textInput} onChangeText={setName} value={name} placeholder={"Enter Your Name"}></TextInput>
                                <Text style={styles.textTitle}>Age</Text>
                                <TextInput style={styles.textInput} onChangeText={setAge} value={age} keyboardType='numeric' placeholder={"Enter Your Age"}></TextInput>
                                <Text style={styles.textTitle}>Gender</Text>


                                {
                                    count === "0" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Pressable onPress={() => { setCount("1"); setGender("Male") }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Male</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { setCount("2"); setGender("Female") }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text>Female</Text>
                                        </Pressable>
                                    </View>)
                                }

                                {
                                    count === "1" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Pressable onPress={() => { setCount("1"); setGender("Male") }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Male</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { setCount("2"); setGender("Female") }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text >Female</Text>
                                        </Pressable>
                                    </View>)
                                }
                                {
                                    count === "2" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Pressable onPress={() => { setCount("1"); setGender("Male") }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Male</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { setCount("2"); setGender("Female") }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Female</Text>
                                        </Pressable>
                                    </View>)
                                }






                                <Text style={styles.textTitle}>City</Text>
                                <TextInput style={styles.textInput} onChangeText={setCity} value={city} placeholder={"Enter City"}></TextInput>
                                <Text style={styles.textTitle}>State</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, backgroundColor: '#F2F4F7' }}>
                                    <TextInput style={styles.passTextInput} onChangeText={setState} value={state} placeholder={"State"}></TextInput>

                                    {/* <Icon onPress={() => { setShowPassword(false); }} name="arrow-down" size={17} /> */}
                                </View>
                                <Text style={styles.textTitle}>Zipcode</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, backgroundColor: '#F2F4F7' }}>
                                    <TextInput style={styles.passTextInput} onChangeText={setZipcode} value={zipcode} placeholder={"Zipcode"}></TextInput>

                                    {/* <Icon onPress={() => { setShowPassword(false); }} name="arrow-down" size={17} /> */}
                                </View>
                            </View>
                        </ScrollView>

                        <View style={{ flexDirection: 'column' }}>
                            <Button uppercase={false} mode="contained" onPress={() => { checkData() }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>Continue</Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>

    )
}

export default AboutYourSelfScreen
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
        marginBottom: 30,
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