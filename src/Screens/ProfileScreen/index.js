import { Text, View, SafeAreaView, Pressable, FlatList, ImageBackground, Alert, Image, ScrollView, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import React, { Component } from 'react'
import Modal from "react-native-modal";
import PostsView from '../../Components/PostsView'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthStack from '../../NavigationStacks/AuthStack';
import ImageResizer from 'react-native-image-resizer';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { connect } from 'react-redux';
import moment from 'moment'
 
//import axios from 'axios';
//import AsyncStorage from '@react-native-async-storage/async-storage'
const baseUrl = 'https://golfgang.indexideaz.tech/api';

import ImagePicker from 'react-native-image-crop-picker';
import LoginScreen from '../LoginScreen';
import UserPostsView from '../../Components/UserPostView';



export class ProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            userData: [],
            showWelcome: false,
            imageLink: "",
            num: 0,
            followers: [],
            demoData: ["no post"],
            following: [],
            refreshing: false,
            postsLength: 0,
            totalFollowing: 0,
            totalFollowers: 0,
            joined_date: "",
        }
    }

    fetchdata = async () => {

        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                this.setState({ userData: CartValue[0].user })
                this.setState({ followers: CartValue[0].follower.followerData })
                this.setState({ following: CartValue[0].following.followingData })
                this.setState({ postsLength: this.state.userData.post.length })
                this.setState({ totalFollowers: this.state.followers.length })
                this.setState({ totalFollowing: this.state.following.length })
                // console.log("following", this.state.followers)
            }
        })

        var date = moment(this.state.userData.created_at).format('MMMM Do YYYY')
        // console.log(date);
        this.setState({ joined_date: date })
    }

    componentDidMount() {
        this.fetchdata()
    }

    logout = async () => {

        await AsyncStorage.removeItem('userData').then((res) => {
            this.props.addItemToCart(this.state.num)
            //this.props.navigation.navigate('LoginScreen')

        })
            .catch((e) => {
            })
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
                                this.setState({ userData: CartValue[0].user })
                                this.setState({ followers: CartValue[0].follower.followerData })
                                this.setState({ following: CartValue[0].following.followingData })
                                this.setState({ postsLength: this.state.userData.post.length })
                                this.setState({ totalFollowers: this.state.followers.length })
                                this.setState({ totalFollowing: this.state.following.length })
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

            //console.log("link", this.state.imageLink);
            //setImageUrl(imageUri);
            //base(imageUri)

            // this.bs.current.snapTo(1);
        });
        // console.log(image)
        //setImage(image)
        //setImageUrl(image)

    };

    uploadPostPage = ()=>{
        // let link = this.state.imageLink
        let user_name = this.state.userData.name
        let user_id = this.state.userData.id
        let navigation = this.props.navigation
        this.props.navigation.navigate('Upload', {user_name, user_id,navigation })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                    </SafeAreaView>

                    <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                            <Icon onPress={() => { this.props.navigation.goBack() }} style={{ marginLeft: 10 }} color={"white"}  name="chevron-left" size={25} />
                            <Icon onPress={() => { this.logout() }} style={{ marginLeft: 10 }} color={"white"} name="edit" size={25} />
                        </View>
                        <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>

                                {
                                    this.state.userData.image === null ?
                                        <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/user.png')} />
                                        :
                                        <ImageBackground
                                            source={{
                                                uri: `data:image/png;base64,${this.state.userData.image}`

                                            }}
                                            style={{ height: 60, width: 60, }}
                                            imageStyle={{ borderRadius: 30 }}
                                        >
                                        </ImageBackground>
                                }


                                <View style={{ marginLeft: 8 }}>
                                    <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 20 }}>{this.state.userData.name} </Text>
                                    <Text style={{ color: '#CCDFD9', marginTop: 3 }}>{this.state.userData.gender === 'male' ? 'Male':'Female'} {this.state.userData.age} {this.state.userData.city}</Text>
                                    <Text style={{ color: '#CCDFD9', marginTop: 3 }}>Joined {this.state.joined_date}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 16 }}>
                            {/* <Pressable style={{ padding: 10, backgroundColor: '#50907E', borderRadius: 13, borderColor: '#007F6D' }}>
                                <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '400' }}>Stroke Play</Text>
                            </Pressable>
                            <Pressable style={{ padding: 10, marginLeft: 8, backgroundColor: '#50907E', borderRadius: 13, borderColor: '#007F6D' }}>
                                <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '400' }}>Eagle</Text>
                            </Pressable>
                            <Pressable style={{ padding: 10, marginLeft: 8, backgroundColor: '#50907E', borderRadius: 13, borderColor: '#007F6D' }}>
                                <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '400' }}>Birdie</Text>
                            </Pressable> */}
                        </View>
                        <View style={{ padding: 16 }}>
                            <Text style={{ fontSize: 14, color: '#ffffff', fontWeight: '500' }}>{this.state.userData.job_type}</Text>
                            <Text style={{ marginTop: 8, fontSize: 14, color: '#ffffff', fontWeight: '400' }}>{this.state.userData.hobby}</Text>
                            {/* <Text style={{ marginTop: 8, fontSize: 14, color: '#ffffff', fontWeight: '400' }}>Enjoying golf for more tha 4 years.</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: "#ffffff", fontWeight: '400' }}>{this.state.userData.handicap}</Text>
                                <Text style={{ marginTop: 10, color: '#CCDFD9', fontWeight: '400', fontSize: 14 }}>HCP</Text>
                            </View>
                            <Pressable onPress={() => { let item = this.state.followers; this.props.navigation.navigate('FollowingUsers', item) }} style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: "#ffffff", fontWeight: '400' }}>{this.state.totalFollowers}</Text>
                                <Text style={{ marginTop: 10, color: '#CCDFD9', fontWeight: '400', fontSize: 14 }}>Followers</Text>
                            </Pressable>
                            <Pressable onPress={() => { let item = this.state.following; this.props.navigation.navigate('FollowingUsers', item) }} style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: "#ffffff", fontWeight: '400' }}>{this.state.totalFollowing}</Text>
                                <Text style={{ marginTop: 10, color: '#CCDFD9', fontWeight: '400', fontSize: 14 }}>Following</Text>
                            </Pressable>
                        </View>
                        {/* <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Notifications</Text> */}
                    </View>

                    {
                        this.state.postsLength !== 0 ?
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={this.state.userData.post}
                                    renderItem={({ item }) => <UserPostsView item={item} navigation={this.props.navigation} />}
                                    showsVerticalScrollIndicator={false}
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.updateUserData}
                                />
                            </View>
                            :
                            <FlatList
                                data={this.state.demoData}
                                renderItem={({ item }) =>

                                    <View style={{ flex: 1, marginTop: 200, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 18, color: '#546881', fontWeight: '500' }}>No Images Posted Yet</Text>
                                    </View>


                                }
                                showsVerticalScrollIndicator={false}
                                refreshing={this.state.refreshing}
                                onRefresh={this.updateUserData}

                            />
                        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        //     <Text style={{ fontSize: 18, color: '#546881', fontWeight: '500' }}>No Images Posted Yet</Text>
                        // </View>

                    }



                    <Pressable onPress={() => { this.uploadPostPage() }} style={{ position: 'absolute', borderRadius: 29, backgroundColor: '#2A7862', padding: 16, bottom: 13, right: 16 }}>
                        <Icon color={"white"} name="plus" size={25} />
                    </Pressable>

                    <Modal
                        // animationType="slide"
                        backdropOpacity={0.3}
                        // pres={()=>{this.setState({showModal: false})}}
                        isVisible={this.state.showModal}

                    >
                        <TouchableWithoutFeedback onPress={() => {
                        this.setState({showModal : false})
                       // setShowModal(false) 
                        // setModalVisible(!showModal);
                    }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 50, marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, color: '#090B0E' }}>Upload Post</Text>
                                    <Pressable style={{ alignSelf: 'flex-end' }} onPress={() => { this.setState({ showModal: false }) }}>
                                        <Image style={{ alignSelf: 'flex-end', tintColor: 'black', backgroundColor: 'white' }} source={require('../../assets/Close_round.png')} />
                                    </Pressable>
                                </View>


                                <View style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', paddingRight: 5, alignItems: 'center', marginTop: 14 }}>
                                    <Icon style={{ marginLeft: 17 }} name="camera" size={17} />
                                    <Text style={styles.passTextInput}  >Take a photo</Text>

                                </View>
                                <Pressable onPress={() => {
                                    //this.props.navigation.navigate('Upload', this.state.imageLink )
                                    this.choosePhotoFromLibrary()
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

            </View>

        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (num) => dispatch({ type: 'ADD_TO_CART', payLoad: num })
    }
}

export default connect(null, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
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
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        //marginTop: 22,
        // padding: 15,
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