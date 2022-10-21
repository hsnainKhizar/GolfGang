import { Text, View, Pressable, SafeAreaView,Linking, TouchableWithoutFeedback, Dimensions, Image, StyleSheet, TextInput, Alert } from 'react-native'
import React, { Component } from 'react'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class SettingsScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            userData: [],
        }
    }

    getData = async () => {
        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                this.setState({ userData: CartValue[0].user })
                this.setState({ postsLength: this.state.userData.post.length })
                //console.log("posts", this.state.userData);
                //console.log(userInfo[0][0].id)
            }
        })
    }

    componentDidMount() {
        this.getData()
    }


    deleteUser = () => {
        this.setState({ showModal: false })
        Alert.alert('Account delete request in progress')
        //console.log("delete",this.state.userData.id);
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


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                </SafeAreaView>

                <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon onPress={() => { this.props.navigation.goBack() }} style={{ marginLeft: 10 }} color={"white"} name="chevron-left" size={25} />
                    </View>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Settings</Text>
                    <Text style={{ color: '#CCDFD9', fontWeight: 'bold', fontSize: 14, marginTop: 10, alignSelf: 'flex-start', marginLeft: 16, marginBottom: 7 }}>Here you can edit your account and profile data, change notification preferences and contect us</Text>
                </View>

                <View style={{ padding: 10, marginLeft: 16 }}>
                    <Pressable onPress={() => { this.props.navigation.navigate('EditProfile', this.state.userData) }} style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', alignItems: 'center', marginTop: 14 }}>
                        <Text style={styles.passTextInput}>Edit Profile</Text>
                        <Icon name="chevron-right" size={17} />
                    </Pressable>
                    {/* <Pressable onPress={()=>{this.props.navigation.navigate('ChangeEmail')}} style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', alignItems: 'center', marginTop: 14 }}>
                        <Text style={styles.passTextInput}>Change Email</Text>
                        <Icon name="chevron-right" size={17} />
                    </Pressable> */}
                    <Pressable onPress={() => { this.props.navigation.navigate('ChangePassword') }} style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', alignItems: 'center', marginTop: 14 }}>
                        <Text style={styles.passTextInput}>Change Password</Text>
                        <Icon name="chevron-right" size={17} />
                    </Pressable>
                    <Pressable onPress={() => { this.props.navigation.navigate('NotificationPreferences') }} style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', alignItems: 'center', marginTop: 14 }}>
                        <Text style={styles.passTextInput}>Notification Preferences</Text>
                        <Icon name="chevron-right" size={17} />
                    </Pressable>
                    <Pressable onPress={() => { this.props.navigation.navigate('BlockedUsers') }} style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', alignItems: 'center', marginTop: 14 }}>
                        <Text style={styles.passTextInput}>Blocked Users</Text>
                        <Icon name="chevron-right" size={17} />
                    </Pressable>
                    <Pressable onPress={() => { this.props.navigation.navigate('TermsAndServices') }} style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', alignItems: 'center', marginTop: 14 }}>
                        <Text style={styles.passTextInput}>Terms of Service</Text>
                        <Icon name="chevron-right" size={17} />
                    </Pressable>
                    <Pressable onPress={() => { this.props.navigation.navigate('PrivacyPolicy') }} style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', alignItems: 'center', marginTop: 14 }}>
                        <Text style={styles.passTextInput}>Privacy Policy</Text>
                        <Icon name="chevron-right" size={17} />
                    </Pressable>
                    <Pressable onPress={() => { this.setState({ showModal: true }) }}>
                        <Text style={{ marginTop: 18, alignSelf: 'center', color: '#D62F2F', fontSize: 16, fontWeight: '500' }}>Deactivate Account</Text>
                    </Pressable>

                </View>

                <View style={{ bottom: 5, position: 'absolute', padding: 10, marginLeft: 16 }}>
                    <Text style={{ color: '#090B0E' }}>Do you have any questions or have ideas how to improve the app? Feel free to <Pressable
                        onPress={() => {
                            Linking.openURL('mailto:support@golfgang.co') 
                        }}
                        style={{ marginTop: -3 }}><Text style={{ color: '#2A7862', marginBottom: -4 }}>contact us</Text></Pressable></Text>

                </View>

                <Modal
                    // animationType="slide"
                    backdropOpacity={0.3}
                    isVisible={this.state.showModal}

                >
                    <TouchableWithoutFeedback onPress={() => {
                        this.setState({ showModal: false })
                        // setShowModal(false) 
                        // setModalVisible(!showModal);
                    }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>


                                <View style={{ flexDirection: 'row', width: '100%', paddingBottom: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, color: '#1D242D' }}>Are you sure you want to deactivate your account?</Text>
                                    {/* <Pressable onPress={() => { this.setState({ showModal: false }) }}>
                                    <Image style={{ alignSelf: 'flex-end' }} source={require('../../assets/Close_round.png')} />
                                </Pressable> */}
                                </View>

                                <View style={{ flexDirection: 'row', width: '100%', paddingBottom: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text>You won't be able to use the app anymore unless you create a new account,All your current data will be lost.</Text>
                                </View>





                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <Pressable onPress={() => { this.deleteUser() }} style={{ marginTop: 15, marginLeft: 6, paddingLeft: 54, paddingRight: 54, paddingBottom: 18, paddingTop: 18, backgroundColor: '#D62F2F', borderRadius: 10 }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes, Delete It</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { this.setState({ showModal: false }) }} style={{ marginTop: 15, paddingLeft: 24, paddingRight: 24, paddingBottom: 16, paddingTop: 16, backgroundColor: '#fff', borderRadius: 5 }}>
                                        <Text style={{ color: 'black' }}>Cancel</Text>
                                    </Pressable>

                                </View>
                                {/* <Button onPress={() => { this.setState({ showModal: false }) }} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold' }} style={styles.loginButton}>Log In</Button> */}

                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

            </View>
        )
    }
}

export default SettingsScreen

const styles = StyleSheet.create({
    passTextInput: {
        height: 40,
        //marginTop:10,
        // borderWidth:1,
        padding: 10,
        fontSize: 16,
        color: '#090B0E',
        borderColor: 'black',
        borderRadius: 5,
        width: '90%'
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
})