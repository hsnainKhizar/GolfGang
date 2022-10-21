import { Text, View, SafeAreaView, Dimensions,ScrollView, ImageBackground, Alert, Image, Pressable, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Button, RadioButton } from 'react-native-paper'
import ImageResizer from 'react-native-image-resizer';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
const baseUrl = 'https://golfgang.indexideaz.tech/api';
import moment from 'moment'
// import { ScrollView } from 'react-native-gesture-handler';

export class UploadImageScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            post_image: '',
            caption: "",
            imageLink: "",
            userData: [],
            user_name: this.props.route.params.user_name,
            loader: false,
        }
    }
    fetchdata = async () => {

        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                // console.log("data",CartValue[0][0][0]);
                this.setState({ userData: CartValue[0].user })
                this.setState({ allposts: CartValue[0].following.followingPost })
                //  this.setState({ userData: CartValue[0][1]}) 
                // this.setState({ postsLength: this.state.allposts.length })
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
        console.log("name", this.props.navigation);
        // this.resizeImage()
    }

    resizeImage = async () => {
        const resizedImage = await ImageResizer.createResizedImage(this.props.route.params.link, 400, 160, 'PNG', 80, 0, RNFS.DocumentDirectoryPath);
        const base64 = await RNFS.readFile(resizedImage.uri, 'base64');
        let image = base64
        this.setState({ post_image: image })
    }

    uploadPost = async () => {

        let caption = this.state.caption
        let user_id = this.props.route.params.user_id
        let id = user_id
        let title = this.state.user_name
        let message = "Added a new photo"
        this.setState({ loader: true })
        let fcm = await AsyncStorage.getItem('fcmToken')

        console.log("caption",caption);
        console.log("image",this.state.imageLink);

        if (this.state.imageLink === ""){
            // this.setState({imageLink : null})
            let data = new FormData();
            data.append('caption', caption)
            data.append('user_id', user_id)
           
    
    
            fetch(`${baseUrl}/post`, {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "multipart/form-data;"
                }
            })
                .then(response => {
                    this.setState({ loader: false })
                    //console.log("return", response.data);
                    this.sendNotification(id, message, title)
                    // this.updateUserData()
                    Alert.alert('Post Uploaded')
                    this.props.navigation.goBack()
                })
                .catch(err => {
                    console.log("error", console.err);
                    this.setState({ loader: false })
                    // Alert.alert('An error occured try again latter')
                })
    
            try {
                const response = await axios.post(`${baseUrl}/post`, {
                    data,
                });
                //console.log(response.data)
    
                if (response.status === 200) {
                    this.setState({ loader: false })
                     console.log("return",response.data);
                    Alert.alert('Post Uploaded')
                    this.props.navigation.goBack()
                }
            } catch (error) {
                // setIndicator(false)
                console.log(error)
                this.setState({ loader: false })
                // Alert.alert("An error has occurred");
    
            }

        }else{
            let data = new FormData();
            data.append('caption', caption)
            data.append('user_id', user_id)
            data.append('image', {
                uri: this.state.imageLink,
                type: "image/jpeg",
                name: "photo.jpg"
            })
    
    
            fetch(`${baseUrl}/post`, {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "multipart/form-data;"
                }
            })
                .then(response => {
                    this.setState({ loader: false })
                    //console.log("return", response.data);
                    this.sendNotification(id, message, title)
                    // this.updateUserData()
                    Alert.alert('Post Uploaded')
                    this.props.navigation.goBack()
                })
                .catch(err => {
                    console.log("error", console.err);
                    // this.setState({ loader: false })
                    Alert.alert('An error occured try again latter')
                })
    
            try {
                const response = await axios.post(`${baseUrl}/post`, {
                    data,
                });
                //console.log(response.data)
    
                if (response.status === 200) {
                    this.setState({ loader: false })
                     console.log("return",response.data);
                    Alert.alert('Post Uploaded')
                    this.props.navigation.goBack()
                }
            } catch (error) {
                // setIndicator(false)
                console.log(error)
                // this.setState({ loader: false })
                // Alert.alert("An error has occurred");
    
            }
        }


       

    }

    sendNotification = async (id, message, title) => {
        console.log("id and message", id, message);
        try {
            const response = await axios.post(`${baseUrl}/notifications`, {
                id,
                message,
                title
            });
            //  console.log(response.data)

            if (response.status === 200) {
                console.log("fcm updated")
            }
        } catch (error) {

            console.log("here", error)
        }
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
                                // this.setState({ allposts: CartValue[0].following.followingData })
                                //  this.setState({ userData: CartValue[0][1]})
                                // this.setState({ postsLength: this.state.allposts.length })
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
                Alert.alert('Post Uploaded')
                this.props.navigation.goBack()
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
            // let link = this.state.imageLink
            // let user_name = this.state.userData.name
            // let user_id = this.state.userData.id
            // this.props.navigation.navigate('Upload', { link, user_name, user_id })
            // this.choosePhotoFromLibrary()
           // this.setState({ showModal: false })

        });

    };

    takePhotoFromCamera = () => {
        ImagePicker.openCamera({
        //   width: 1200,
        //   height: 780,
        //   cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          this.setState({ imageLink: imageUri })
          
        });
      };


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                </SafeAreaView>


                {/* <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View> */}

                <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon onPress={() => { this.props.navigation.goBack() }} style={{ marginLeft: 10 }} color={"white"} name="chevron-left" size={25} />
                    </View>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Upload image</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:70}}>
                <View style={{ padding: 16 }}>
                    
                    <Pressable onPress={() => {
                        this.takePhotoFromCamera()
                    }} style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', paddingRight: 5, alignItems: 'center', marginTop: 14 }}>
                        <Icon style={{ marginLeft: 17 }} name="camera" size={17} />
                        <Text style={styles.passTextInput}  >Take a photo</Text>

                    </Pressable>
                    <Pressable onPress={() => {
                        this.choosePhotoFromLibrary()
                    }} style={{ flexDirection: 'row', backgroundColor: '#F2F4F7', paddingRight: 5, alignItems: 'center', marginTop: 14, marginBottom: 20 }}>
                        <Icon style={{ marginLeft: 17 }} name="image" size={17} />
                        <Text style={styles.passTextInput}  >Select from library</Text>

                    </Pressable>
                    <Pressable onPress={() => { }}>
                        {
                            this.state.imageLink === "" ?
                                <Image style={{ height: 200, marginTop: 14, width: Dimensions.get('window').width - 40, borderRadius: 8, }} source={require('../../assets/demoComp.jpg')} />
                                :
                                <ImageBackground
                                    source={{
                                        uri: `${this.state.imageLink}`

                                    }}
                                    style={{ height: 200, width: Dimensions.get('window').width - 30, }}
                                    imageStyle={{ borderRadius: 8 }}
                                >
                                </ImageBackground>

                        }


                        {/* <Image style={{ width: Dimensions.get('window').width - 30, height: 300, borderRadius: 8 }} source={require('../../assets/Photo.png')} /> */}
                    </Pressable>

                    <Text style={styles.textTitle}>Caption / Status only</Text>
                    <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ caption: text }) }} value={this.state.caption} placeholder={"Enter Caption"}></TextInput>
                   
                </View>
                </ScrollView>

                <View style={{ position: 'absolute', bottom: 40, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                    <Button onPress={this.uploadPost} loading={this.state.loader} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>Upload</Button>
                </View>

            </View>
        )
    }
}

export default UploadImageScreen

const styles = StyleSheet.create({
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
    loginButton: {
        alignSelf: 'center',
        // position:'absolute',
        //bottom:0,
        //right:0,
        // alignSelf:'flex-end',
        width: '90%',
        borderRadius: 10,
        // marginTop:300,
        backgroundColor: '#2A7862',
        // color:'white',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 2,
        top: 20,
    },
})