import { View, Text, SafeAreaView, ActivityIndicator, Dimensions, StyleSheet, FlatList, Alert, Pressable, ImageBackground, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native'
import { Button, RadioButton } from 'react-native-paper'
import React, { useCallback } from 'react'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Feather'
import PostsView from '../../Components/PostsView'
import { Component } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import NearByPostView from '../../Components/NearByPostView';
const baseUrl = 'https://golfgang.indexideaz.tech/api';

class FeedScreen extends Component {

    

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            userData: [],
            showWelcome: false,
            postsLength: 0,
            allposts: [],
            demoData: ["no post"],
            followerInfo: [],
            refreshing: false,
            imageLink: "",
            loader: false,
            loaderUsers: false,
            users: [],
            viewSwitch: false,
            finalSwitch : false,
            
        }
    }



    fetchdata = async () => {
        this.setState({ viewSwitch: false },()=>{
            this.setState({finalSwitch : this.state.viewSwitch})
            //console.log(this.state.viewSwitch)
        })
        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                // console.log("data",CartValue[0][0][0]);
                this.setState({ userData: CartValue[0].user })
                this.setState({ allposts: CartValue[0].following.followingPost })
                //  this.setState({ userData: CartValue[0][1]}) 
                this.setState({ postsLength: this.state.allposts.length })
                // console.log("posts", this.state.allposts);

                //console.log(userInfo[0][0].id)
            }
        })

        //  let postArray = this.state.userData.post

        //  postArray.map((val,i)=>{
        //     this.setState(prevState => ({
        //         allposts: [val, ...prevState.allposts]
        //       }))
        // })
        // console.log("all",this.state.allposts);

        // console.log("follow ids",followIDs);





        // console.log("userDetail", this.state.userData.id);
    }

    componentDidMount() {
        this.fetchdata()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.fetchdata()
        });

        this.setState({ loader: true })

        setTimeout(() => {
            this.setState({ loader: false })
        }, 3000)
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    updateUserData = async () => {

        this.setState({ refreshing: true })

        try {
            const response = await axios.get(`${baseUrl}/user/${this.state.userData.id}`, {

            });
            // console.log(response.data)

            if (response.status === 200) {
                await AsyncStorage.removeItem('userData').then((res) => {
                    //this.props.addItemToCart(this.state.num)

                })
                    .catch((e) => {
                    })
                // setIndicator(false)
                this.setState({ refreshing: false })
                //  console.log("new new data", response.data);

                let userDetail = response.data
                //this.setState({userData : user})

                AsyncStorage.getItem('userData').then((datacart) => {
                    // console.log(datacart)
                    if (datacart !== null) {
                        const cart = JSON.parse(datacart)
                        cart.push(userDetail)

                        AsyncStorage.setItem('userData', JSON.stringify(cart))
                        AsyncStorage.getItem('userData').then((cart) => {
                            if (cart !== null) {
                                let CartValue = JSON.parse(cart)
                                // console.log("data",CartValue[0][0][0]);
                                this.setState({ userData: CartValue[0].user })
                                this.setState({ allposts: CartValue[0].following.followingData })
                                //  this.setState({ userData: CartValue[0][1]})
                                this.setState({ postsLength: this.state.allposts.length })
                                // console.log("posts", this.state.allposts);

                                //console.log(userInfo[0][0].id)
                            }
                        })
                    }
                    else {
                        const cart = []
                        cart.push(userDetail)
                        AsyncStorage.setItem('userData', JSON.stringify(cart))
                    }
                    //props.addItemToCart(num)

                }).catch((eror) => {
                    console.log(eror)
                })
                //navigation.replace('WelcomeScreen')
            }
        } catch (error) {
            //setIndicator(false)
            console.log(error)
            this.setState({ refreshing: false })
            Alert.alert("An error has occurred,try later");
        }
    }

    choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            // width: 300,
            // height: 300,
            // cropping: true,
            // compressImageQuality: 0.7,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            this.setState({ imageLink: imageUri })
            let link = this.state.imageLink
            let user_name = this.state.userData.name
            let user_id = this.state.userData.id
            this.props.navigation.navigate('Upload', { link, user_name, user_id })
            // this.choosePhotoFromLibrary()
            this.setState({ showModal: false })

        });

    };

    uploadPostPage = () => {
        // let link = this.state.imageLink
        let user_name = this.state.userData.name
        let user_id = this.state.userData.id
        let navigation = this.props.navigation
        this.props.navigation.navigate('Upload', { user_name, user_id, navigation })
    }

    getAllUserData = async () => {
        this.setState({ loaderUsers: true })
        try {
            const response = await axios.get(`${baseUrl}/user`, {

            });
            // console.log(response.data)

            if (response.status === 200) {
                this.setState({ loaderUsers: false })

                this.setState({ users: response.data })
                // console.log("all users", response.data);
            }
        } catch (error) {
            //setIndicator(false)
            this.setState({ loaderUsers: false })
            console.log(error)
            Alert.alert("An error has occurred,try later");
        }
    }





    render() {
        if (this.state.loader === true) {
            return (
                <View style={{ backgroundColor: '#2A7862', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator
                        size="large"
                        color="#fff"
                        style={{}}
                    />
                </View>
            )
        }
        // if (this.state.loaderUsers === true) {
        //     return (
        //         <View style={{ backgroundColor: '#2A7862', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        //             <ActivityIndicator
        //                 size="large"
        //                 color="#fff"
        //                 style={{}}
        //             />
        //         </View>
        //     )
        // }
        return (
            <View style={{ flexDirection: 'column', flex: 1, paddingBottom: 170, backgroundColor: 'white' }} onLayout={this.fetchdata}>
                <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                </SafeAreaView>

                <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View>
                <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View>
                {/* <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View> */}
                <View style={{ backgroundColor: '#2A7862', paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginLeft: 16 }}>Feed</Text>
                        <View style={{ flexDirection: 'row', marginRight: 7 }}>
                            <Pressable onPress={() => { this.props.navigation.navigate('Notification') }}>
                                <Image style={{ tintColor: 'white', marginRight: 6 }} source={require('../../assets/Bell_light.png')} />
                            </Pressable>

                            <Pressable onPress={() => { this.props.navigation.navigate('Settings') }}>
                                <Image style={{ tintColor: 'white', marginRight: 6 }} source={require('../../assets/Setting_line_light.png')} />
                            </Pressable>

                            <Pressable onPress={() => { this.props.navigation.navigate('Profile') }}>
                                {
                                    this.state.userData.image == null ?
                                        <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={require('../../assets/user.png')} />
                                        :
                                        <ImageBackground
                                            source={{
                                                uri: `data:image/png;base64,${this.state.userData.image}`

                                            }}
                                            style={{ height: 30, width: 30, }}
                                            imageStyle={{ borderRadius: 15 }}
                                        >
                                        </ImageBackground>
                                }
                            </Pressable>
                        </View>

                    </View>
                    <Text style={{ color: '#CCDFD9', fontWeight: 'bold', fontSize: 14, marginTop: 10, alignSelf: 'flex-start', marginLeft: 16, marginBottom: 7 }}>Based on your preferences, we think you might be interested in following more golfers</Text>
                </View>

                {/* if user didnt followed anyone */}

                <View style={{ flexDirection: 'row', padding: 10, marginTop: 10 }}>
                    <TouchableOpacity onPress={() => {
                        this.setState({ viewSwitch: false }, ()=>{
                            this.setState({finalSwitch : this.state.viewSwitch})
                            console.log(this.state.viewSwitch)
                        });
                        // this.setState({ viewSwitch: false }); 
                       // console.log(this.state.viewSwitch)
                        //this.getAllUserData();

                    }} style={{ backgroundColor: '#2A7862', padding: 10,borderRadius:8 }}>
                        <Text style={{ color: '#fff', fontWeight: '500', fontSize: 16 }}>Your friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { 
                        this.setState({ viewSwitch: true }, ()=>{
                            this.setState({finalSwitch : this.state.viewSwitch})
                            console.log(this.state.viewSwitch)}
                            ); 
                            this.getAllUserData();
                        // this.setState({ viewSwitch: true }); 
                        //console.log(this.state.viewSwitch) 
                        }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 14,borderRadius:8 }}>
                        <Text style={{ color: '#fff', fontWeight: '500', fontSize: 16 }}>Near-by posts</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.finalSwitch === false ?
                        <View>
                            {
                                this.state.postsLength > 0 ?

                                    <View style={{}}>
                                        <FlatList
                                            data={this.state.allposts}
                                            renderItem={({ item }) => <PostsView item={item} navigation={this.props.navigation} />}
                                            showsVerticalScrollIndicator={false}
                                            refreshing={this.state.refreshing}
                                            onRefresh={this.updateUserData}

                                        />
                                    </View> :
                                    <FlatList
                                        data={this.state.demoData}
                                        renderItem={({ item }) =>

                                            <View style={{ flex: 1, marginTop: 200, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                                <Text style={{ fontSize: 18, color: '#546881', fontWeight: '500' }}>No Images Posted Yet</Text>
                                                <Text style={{ textAlign: 'center', marginTop: 8, color: '#546881', fontSize: 14 }}>To see the images posted by other golfers, start following more people</Text>
                                                {/* <Button uppercase={false} mode="contained" onPress={() => {  }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>Find Friends</Button> */}
                                            </View>

                                        }
                                        showsVerticalScrollIndicator={false}
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.updateUserData}
                                    />
                            }
                        </View>
                        :
                        <View>
                            {
                                this.state.loaderUsers === true ?
                                    <View style={{ backgroundColor: '#2A7862', marginTop: 160, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                        <ActivityIndicator
                                            size="large"
                                            color="#000"
                                            style={{ alignSelf: 'center', justifyContent: 'center' }}
                                        />
                                    </View> :
                                    <View style={{}}>
                                         <ScrollView contentContainerStyle={{flexGrow:1,paddingBottom:80 }}  showsVerticalScrollIndicator={false}  >

                                        {
                                            this.state.users.map((val) =>
                                                    <View style={{flex:1}}>
                                                        <NearByPostView item={val} navigation={this.props.navigation} />
                                                    </View> 
                                            )
                                        }
                                        </ScrollView>
                                    </View>
                            }
                        </View>
                }
                <Pressable onPress={() => {
                    this.uploadPostPage()
                    // this.setState({ showModal: true }) 
                }}
                    style={{ position: 'absolute', borderRadius: 29, backgroundColor: '#2A7862', padding: 16, bottom: 13, right: 16 }}>
                    <Icon color={"white"} name="plus" size={25} />
                </Pressable>
                <Modal
                    // animationType="slide"
                    backdropOpacity={0.3}
                    // pres={()=>{this.setState({showModal: false})}}
                    isVisible={this.state.showModal}

                >
                    <TouchableWithoutFeedback onPress={() => {
                        this.setState({ showModal: false })
                        // setShowModal(false)
                        // setModalVisible(!showModal);
                    }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                {/* <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 50, marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 20, color: '#090B0E' }}>Upload Post</Text>
                                <Pressable style={{ alignSelf: 'flex-end' }} onPress={() => { this.setState({ showModal: false }) }}>
                                    <Image style={{ alignSelf: 'flex-end', tintColor: 'black', backgroundColor: 'white' }} source={require('../../assets/Close_round.png')} />
                                </Pressable>
                            </View> */}


                                <View style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', paddingRight: 5, alignItems: 'center', marginTop: 14 }}>
                                    <Icon style={{ marginLeft: 17 }} name="camera" size={17} />
                                    <Text style={styles.passTextInput}  >Take a photo</Text>

                                </View>
                                <Pressable onPress={() => {
                                    //this.props.navigation.navigate('Upload', this.state.imageLink )
                                    this.uploadPostPage()
                                    // this.setState({ showModal: false })

                                }} style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', paddingRight: 5, alignItems: 'center', marginTop: 14, marginBottom: 20 }}>
                                    <Icon style={{ marginLeft: 17 }} name="image" size={17} />
                                    <Text style={styles.passTextInput}  >Select from library</Text>

                                </Pressable>


                                {/* <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <Pressable style={{ marginTop: 15, marginLeft: 6, paddingLeft: 54, paddingRight: 54, paddingBottom: 18, paddingTop: 18, backgroundColor: '#D62F2F', borderRadius: 10 }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes, Delete It</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { this.setState({ showModal: false }) }} style={{ marginTop: 15, paddingLeft: 24, paddingRight: 24, paddingBottom: 16, paddingTop: 16, backgroundColor: '#fff', borderRadius: 5 }}>
                                        <Text style={{ color: 'black' }}>Cancel</Text>
                                    </Pressable>
    
                                </View> */}
                                {/* <Button onPress={() => { this.setState({ showModal: false }) }} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold' }} style={styles.loginButton}>Log In</Button> */}

                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        )
    }

}

export default FeedScreen
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
        width: Dimensions.get('window').width,
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
        color: '#090B0E',
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
        width: '60%',
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