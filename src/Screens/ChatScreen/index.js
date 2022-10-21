import { View, Text, SafeAreaView, Dimensions, Modal, ImageBackground, KeyboardAvoidingView, Keyboard, TextInput, StyleSheet, FlatList, ActivityIndicator, Pressable, Alert, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState, Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Feather'
// import database from '@react-native-firebase/database'
import ImagePicker from 'react-native-image-crop-picker';
import { SendMessage, RecieveMessage } from '../../Components/Message';
import AboveKeyboard from "react-native-above-keyboard";
import axios from 'axios';
import RNFS from 'react-native-fs';
const baseUrl = 'https://golfgang.indexideaz.tech/api';
import moment from 'moment'
// import axios from 'axios';

//const baseUrl = 'https://sosnew.ucstestserver.xyz';


class ChatScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyboardStatus: false,
            item: this.props.route.params,
            // userData: [],
            userInfo: [],
            message: "",
            currentUid: '',
            guestUid: '',
            allMessages: [],
            image: '',
        }
    }
    fetchIDs = async () => {
        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                // console.log("data",CartValue[0][0][0]);
                this.setState({ userInfo: CartValue[0].user })
                this.setState({ currentUid: this.state.userInfo.id })
                this.setState({ guestUid: this.props.route.params.id })
            }
        })
        console.log("senderid", this.state.userInfo.id);
        console.log("recieverid", this.props.route.params.id);

        try {
            ///console.log("id", this.state.currentUid);
            database()
                .ref('message').
                child(`${this.state.currentUid}`).
                child(`${this.state.guestUid}`).
                on("value", (dataSnapshot) => {
                    // console.log("data", dataSnapshot.val());
                    let message = [];
                    dataSnapshot.forEach((data) => {

                        message.push({
                            sendBy: data.val().messege.sender,
                            recieveBy: data.val().messege.reciever,
                            msg: data.val().messege.msg,
                            image: data.val().messege.image,
                            date: data.val().messege.date,
                            time: data.val().messege.time,
                        });
                    })
                    this.setState({ allMessages: message.reverse() })
                    //console.log("All Messages", this.state.allMessages);
                })
        } catch (error) {
            console.log(error);
            // Alert.alert(error);
        }
    }
    componentDidMount() {

        this.fetchIDs()

        // setTimeout(() => {
        //     this.FlatListRef.scrollToEnd();
        //   }, 1500); 
    }


    sendMessage = async () => {
        let message = this.state.message
        let title = this.state.userInfo.name
        let id  = this.state.guestUid
        if (this.state.message) {
            SendMessage(this.state.currentUid, this.state.guestUid, message, "").
                then(async (res) => {

                    try {
                        const response = await axios.post(`${baseUrl}/smsnotifications`, {
                          id,
                          message,
                          title
                        });
                      //  console.log(response.data)
              
                        if (response.status === 200) {
                          console.log("fcm updated")
                        }
                      } catch (error) {
              
                        console.log("here",error)
                      }



                    

                    console.log("id", user_id);
                    this.setState({ message: "" })
                }).catch((error) => {
                    console.log(error);
                    // Alert.alert(error)
                })

            RecieveMessage(this.state.currentUid, this.state.guestUid, message, "").
                then(() => {
                    this.setState({ message: '' })
                }).catch((error) => {
                    // Alert.alert(error)
                })
        }
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }} >
                <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                </SafeAreaView>

                <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon onPress={() => { this.props.navigation.navigate.goBack() }} style={{ marginLeft: 10 }} color={"white"} onPress={() => { this.props.navigation.goBack() }} name="chevron-left" size={25} />
                        {/* other user detail */}

                        {
                            this.state.item.image == null ?
                                <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={require('../../assets/user.png')} />
                                :
                                <ImageBackground
                                    source={{
                                        uri: `data:image/png;base64,${this.state.item.image}`

                                    }}
                                    style={{ height: 40, width: 40, }}
                                    imageStyle={{ borderRadius: 20 }}
                                >
                                </ImageBackground>
                        }
                        {/* <Image style={{ width: 40, height: 40, borderRadius: 20,marginLeft:14 }} source={require('../../assets/user-3.jpg')} /> */}


                        <View style={{ marginLeft: 8 }}>
                            <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 20 }}>{this.state.item.name}</Text>
                            <Text style={{ color: '#CCDFD9', marginTop: 3 }}>{this.state.item.city},{this.state.item.state}</Text>
                            {/* <Text style={{ color: '#CCDFD9', marginTop: 3 }}>Joined</Text> */}
                        </View>
                    </View>
                    {/* <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Notifications</Text> */}
                </View>


                <View style={styles.container}>
                    <FlatList
                        inverted
                        ref={(ref) => (this.FlatListRef = ref)}
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: 40 }}
                        data={this.state.allMessages}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ maxWidth: Dimensions.get('window').width / 2 + 10, alignSelf: this.state.currentUid === item.sendBy ? 'flex-end' : 'flex-start', marginVertical: 10 }}>
                                <View style={{ borderBottomRightRadius: 9, borderBottomLeftRadius: 9, borderTopLeftRadius: 9, backgroundColor: this.state.currentUid === item.sendBy ? '#2A7862' : '#EBEEF2' }}>


                                    <Text style={{ color: this.state.currentUid === item.sendBy ? 'white' : 'black', fontSize: 16,fontWeight:'400', padding: 8 }}>{item.msg}  <Text style={{ fontSize: 13 }}>{item.time}  </Text></Text>


                                </View>
                            </View>
                        )}
                    />

                    {/* <AboveKeyboard>
                        {
                            this.state.keyboardStatus === false ? */}

                    <View style={{ height: 50, width: Dimensions.get('window').width - 30, alignItems: 'center', justifyContent: 'center', alignItems: "center", position: 'absolute', bottom: 0, flexDirection: 'row' }}>



                        <TextInput value={this.state.message} onChangeText={(text) => { this.setState({ message: text }) }} placeholder="Type your message" placeholderTextColor="#000" style={{ height: 40, padding: 10, width: '85%', borderRadius: 4, backgroundColor: "white" }}></TextInput>
                        <Pressable onPress={() => { this.sendMessage() }} style={{ backgroundColor: '#2A7862', marginLeft: 8, padding: 8, borderRadius: 20 }}>
                            <Image style={{width:23,height:23,tintColor:'white'}} source={require('../../assets/Send_hor_fill.png')}/>
                            {/* <Icon style={{ marginLeft: 5 }} name={"send"} size={23} /> */}
                        </Pressable>

                    </View>


                </View>


            </View>

        )
    }
}

export default ChatScreen

const styles = StyleSheet.create({
    background: {
        // flex: 0.15,
        // borderBottomRightRadius: 30,
        //borderBottomLeftRadius: 30,
        // backgroundColor:"#253f9e",
    },
    container: {
        flex: 1,
        // flexDirection: 'row',
        ///alignItems:'center',
        backgroundColor: 'white',
        // borderTopRightRadius: 40,
        //borderTopLeftRadius: 40,
        padding: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        padding: 15,
    },
    modalView: {
        margin: 20,

        width: '100%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    loginButton: {
        borderWidth: 3,
        backgroundColor: '#e6e5e1',
        color: 'white',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 2,
        marginTop: 16,
        //marginBottom:7,
        //height:40
    },
})