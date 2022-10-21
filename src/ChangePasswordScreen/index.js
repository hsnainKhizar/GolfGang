import { Text, View, SafeAreaView, Pressable, Image, StyleSheet, TextInput, Alert } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Button, RadioButton } from 'react-native-paper'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
const baseUrl = 'https://golfgang.indexideaz.tech/api';
export class ChangePasswordScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            currentPassword: '',
            showPassword: true,
            showNewPassword: true,
            showConfirmPassword: true,
            enteredPassword: '',
            showError: false,
            showNewError: false,
            newPassword: '',
            userData: [],
            confirmPassword: '',
        }
    }

    fetchdata = async () => {

        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                // console.log("data",CartValue[0][0][0]);
                this.setState({ userData: CartValue[0].user })
            }
        })
    }

    componentDidMount() {
        this.fetchdata()
        this.checkPassword()
    }

    checkPassword = async () => {
        let userPassword = await AsyncStorage.getItem('user_password')
        this.setState({ currentPassword: userPassword })
        //console.log("Pass",typeof(this.state.currentPassword));
        // AsyncStorage.removeItem('')
    }

    matchPasswords = () => {
        if (this.state.currentPassword !== this.state.enteredPassword) {
            this.setState({ showError: true })
        } else {
            this.setState({ showError: false })
        }
    }

    matchNewPasswords = () => {
        if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({ showNewError: true })
        } else {
            this.setState({ showNewError: false })
        }
    }

    changePassword = async()=>{
        if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({ showNewError: true })
        } else {
            this.setState({ showNewError: false })
            console.log("changed WIll add password put request");
            let password = this.state.enteredPassword
            Alert.alert('Password will change in 24 hours')


            // try {
            //     const response = await axios.put(`${baseUrl}/user/${this.state.userData.id}`, {
            //      password
            //     });
            //     if (response.status === 200) {
            //       console.log("password updated")
            //       Alert.alert('Password will change in 24 hours')
            //       AsyncStorage.setItem('user_password',password)
            //     }
            //   } catch (error) {
            //     console.log("here",error)
            //   }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                </SafeAreaView>

                <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon onPress={() => { this.props.navigation.navigate.goBack() }} style={{ marginLeft: 10 }} color={"white"} onPress={() => { this.props.navigation.goBack() }} name="chevron-left" size={25} />
                    </View>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Change Password</Text>
                </View>

                <View style={{ padding: 10, marginLeft: 16 }}>
                    <Text style={styles.textTitle}>Current Password</Text>
                    <View style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', alignItems: 'center', marginTop: 14 }}>

                        <TextInput style={styles.passTextInput} onEndEditing={() => { this.matchPasswords() }} onChangeText={(text) => { this.setState({ enteredPassword: text }) }} value={this.state.enteredPassword} secureTextEntry={this.state.showPassword} placeholder={"Password"}></TextInput>
                        {/* <Icon  name="eye-off" size={17} /> */}
                        {
                            this.state.showPassword === true ?
                                <Icon onPress={() => { this.setState({ showPassword: false }) }} name="eye-off" size={17} />
                                :
                                <Icon onPress={() => { this.setState({ showPassword: true }) }} name="eye" size={17} />
                        }


                    </View>
                    {
                        this.state.showError === true && (
                            <Text style={{ color: 'red' }}>Passwords do not match</Text>
                        )
                    }

                    <Text style={styles.textTitle}>New Password</Text>
                    <View style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', alignItems: 'center', marginTop: 14 }}>
                    <TextInput style={styles.passTextInput} secureTextEntry={this.state.showNewPassword} onChangeText={(text) => { this.setState({ newPassword: text }) }} value={this.state.newPassword} placeholder={"Enter New Password"} ></TextInput>
                    {
                        this.state.showNewPassword === true ?
                            <Icon onPress={() => { this.setState({ showNewPassword: false }) }} name="eye-off" size={17} />
                            :
                            <Icon onPress={() => { this.setState({ showNewPassword: true }) }} name="eye" size={17} />
                    }
                    </View>

                    <Text style={styles.textTitle}>Confirm New Password</Text>
                    <View style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', alignItems: 'center', marginTop: 14 }}>
                    <TextInput style={styles.passTextInput} onEndEditing={() => { this.matchNewPasswords() }} secureTextEntry={this.state.showConfirmPassword} onChangeText={(text) => { this.setState({ confirmPassword: text }) }} value={this.state.confirmPassword} placeholder={"Confirm Password"} ></TextInput>
                    {
                        this.state.showConfirmPassword === true ?
                            <Icon onPress={() => { this.setState({ showConfirmPassword: false }) }} name="eye-off" size={17} />
                            :
                            <Icon onPress={() => { this.setState({ showConfirmPassword: true }) }} name="eye" size={17} />
                    }
                    </View>
                    {
                        this.state.showNewError === true && (
                            <Text style={{ color: 'red' }}>Passwords do not match</Text>
                        )
                    }


                </View>

                <View style={{ position: 'absolute', alignSelf: 'center', bottom: 50, width: '80%' }}>
                    <Button uppercase={false} mode="contained" onPress={() => {this.changePassword()}} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>Save Changes</Button>
                </View>
            </View>
        )
    }
}

export default ChangePasswordScreen

const styles = StyleSheet.create({

    textInput: {
        height: 40,
        marginTop: 14,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#F2F4F7',
        borderColor: 'black',
        borderRadius: 2,
        width: '100%'
    },

    textTitle: {
        color: '#090B0E',
        marginTop: 14,
        fontSize: 16,
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
    loginButton: {
        // width: '80%',
        borderRadius: 10,
        backgroundColor: '#2A7862',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 2,
        top: 20,
    },
})