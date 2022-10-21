import { View, Text, SafeAreaView, Pressable,TouchableWithoutFeedback,Keyboard, StyleSheet, TextInput, Alert, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, ImageBackground, Dimensions } from 'react-native'

import React, { useState, useEffect } from 'react'
import { Button, RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

const GolfPreferencesScreen = (props) => {

    const [count, setCount] = useState("0")
    const [count2, setCount2] = useState("0")
    const [count3, setCount3] = useState("0")
    const [betting, setBetting] = useState("")
    const [drinking, setDrinking] = useState("")
    const [handicap, setHandicap] = useState(0)
    const [smoking, setSmoking] = useState("")
    const [home_golf_course, setHomeGolfCourse] = useState("")


    const [indicator, setIndicator] = useState(false);
    const navigation = useNavigation();

    const checkData = () => {

        let email = props.route.params.email
        let password = props.route.params.password
        let name = props.route.params.name
        let age = props.route.params.age
        let gender = props.route.params.gender
        let city = props.route.params.city
        let state = props.route.params.state
        let zipcode = props.route.params.zipcode
        console.log("handicap", handicap);

        navigation.navigate('HobbiesScreen', { email, password, name, age, gender, city, state,zipcode, home_golf_course, drinking, betting, smoking, handicap })
    }

    useEffect(() => {
        console.log("data", props.route.params);
    })


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
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginLeft: 16, marginTop: 14 }}>Fill in your golf preferences</Text>
            </View>

            <View style={{ flexDirection: 'column', flex: 1, padding: 15, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textTitle}>Home golf course</Text>
                    <TextInput style={styles.textInput} onChangeText={setHomeGolfCourse} value={home_golf_course} placeholder={"Enter Your Home Golf Course"}></TextInput>
                    <Text style={styles.textTitle}>Handicap</Text>

                    <Slider
                        maximumValue={100}
                        minimumValue={0}
                        minimumTrackTintColor="#2A7862"
                        maximumTrackTintColor="#ccc"
                        step={1}
                        value={handicap}
                        onValueChange={
                            (sliderValue) => setHandicap(sliderValue)
                        }
                        thumbTintColor="#2A7862"


                        style={{ width: Dimensions.get('screen').width - 30, height: 40 }}
                    />  
                    <View style={{ flexDirection:'row',alignItems: 'center', justifyContent: 'center' }}>
                        <Text >{handicap} HCP</Text>
                    </View>



                    {/* <TextInput style={styles.textInput} onChangeText={setEmail} value={email} placeholder={"Enter Your Age"}></TextInput> */}

                    <Text style={styles.textTitle}>Betting</Text>

                    {
                        count === "0" &&
                        (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable onPress={() => { setCount("1"); setBetting("Yes") }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                <Text>Yes</Text>
                            </Pressable>

                            <Pressable onPress={() => { setCount("2"); setBetting("No") }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                <Text>No</Text>
                            </Pressable>
                        </View>)
                    }

                    {
                        count === "1" &&
                        (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable onPress={() => { setCount("1"); setBetting("Yes") }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                <Text style={{ color: 'white', fontWeight: '500' }}>Yes</Text>
                            </Pressable>

                            <Pressable onPress={() => { setCount("2"); setBetting("No") }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                <Text >No</Text>
                            </Pressable>
                        </View>)
                    }
                    {
                        count === "2" &&
                        (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable onPress={() => { setCount("1"); setBetting("Yes") }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                <Text>Yes</Text>
                            </Pressable>

                            <Pressable onPress={() => { setCount("2"); setBetting("No") }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                <Text style={{ color: 'white', fontWeight: '500' }}>No</Text>
                            </Pressable>
                        </View>)
                    }

                    <Text style={styles.textTitle}>Drinking</Text>

                    {
                        count2 === "0" &&
                        (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable onPress={() => { setCount2("1"); setDrinking("Yes") }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                <Text>Yes</Text>
                            </Pressable>

                            <Pressable onPress={() => { setCount2("2"); setDrinking("No") }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                <Text>No</Text>
                            </Pressable>
                        </View>)
                    }

                    {
                        count2 === "1" &&
                        (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable onPress={() => { setCount2("1"); setDrinking("Yes") }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                <Text style={{ color: 'white', fontWeight: '500' }}>Yes</Text>
                            </Pressable>

                            <Pressable onPress={() => { setCount2("2"); setDrinking("No") }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                <Text >No</Text>
                            </Pressable>
                        </View>)
                    }
                    {
                        count2 === "2" &&
                        (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable onPress={() => { setCount2("1"); setDrinking("Yes") }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                <Text>Yes</Text>
                            </Pressable>

                            <Pressable onPress={() => { setCount2("2"); setDrinking("No") }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                <Text style={{ color: 'white', fontWeight: '500' }}>No</Text>
                            </Pressable>
                        </View>)
                    }

                    <Text style={styles.textTitle}>Smoking</Text>

                    {
                        count3 === "0" &&
                        (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable onPress={() => { setCount3("1"); setSmoking("Yes") }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                <Text>Yes</Text>
                            </Pressable>

                            <Pressable onPress={() => { setCount3("2"); setSmoking("No") }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                <Text>No</Text>
                            </Pressable>
                        </View>)
                    }

                    {
                        count3 === "1" &&
                        (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable onPress={() => { setCount3("1"); setSmoking("Yes") }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                <Text style={{ color: 'white', fontWeight: '500' }}>Yes</Text>
                            </Pressable>

                            <Pressable onPress={() => { setCount3("2"); setSmoking("No") }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                <Text >No</Text>
                            </Pressable>
                        </View>)
                    }
                    {
                        count3 === "2" &&
                        (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable onPress={() => { setCount3("1"); setSmoking("Yes") }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                <Text>Yes</Text>
                            </Pressable>

                            <Pressable onPress={() => { setCount3("2"); setSmoking("No") }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                <Text style={{ color: 'white', fontWeight: '500' }}>No</Text>
                            </Pressable>
                        </View>)
                    }



                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Button uppercase={false} mode="contained" onPress={() => { checkData() }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} loading={indicator} style={styles.loginButton}>Continue</Button>
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>

    )
}

export default GolfPreferencesScreen
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