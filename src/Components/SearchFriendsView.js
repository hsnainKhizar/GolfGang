import { View, Text, SafeAreaView, Alert, Image, TextInput, ImageBackground, Dimensions, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
const baseUrl = 'https://golfgang.indexideaz.tech/api';

export class SearchFriendsView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item,
            userData: [],
            age: "",
            handicap: "",
            milesAway: "",
            searchData: this.props.searchData,
            followStatus: false,
            followers: [],
            noResult: false,

        }
    }

    getLoginUserData = async () => {
        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                this.setState({ userData: CartValue[0].user })
                this.setState({ postsLength: this.state.userData.post.length })
                this.setState({ followers: this.state.userData.follow })
                //  console.log("login user id", this.state.userData.id);
                //console.log(userInfo[0][0].id)
            }
        })
        this.setState({ age: this.props.searchData.age.toString() })
        this.setState({ handicap: this.props.searchData.handicap.toString() })
        this.setState({ milesAway: this.props.searchData.miles_away.toString() })
  
    }

 
    followFriend = async () => {
        let user_id = this.state.userData.id
        let follower_id = this.state.item.id
        console.log("ids", this.state.userData.id, this.state.item.id);
        try {
            const response = await axios.post(`${baseUrl}/follow`, {
                user_id,
                follower_id,
            });
            // console.log(response.data)

            if (response.status === 200) {
                this.setState({ followStatus: true })
                // console.log("all users", response.data);
            }
        } catch (error) {
            //setIndicator(false)
            console.log(error)
            Alert.alert("An error has occurred,try later");
        }
    }



    componentDidMount() {
       
        this.getLoginUserData()
       

    }


    render() {
        if ( this.props.item.location == this.props.searchData.zipcode ||  this.props.item.betting == this.props.searchData.betting  || this.props.item.age == this.state.age || this.props.item.handicap == this.state.handicap || this.props.item.gender == this.props.searchData.gender || this.props.item.smoking == this.props.searchData.smoking) {
            return (
                <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={() => { let item = this.state.item; this.props.navigation.navigate('OtherUser', this.state.item) }}>
                            {
                                this.state.item.image == null ?
                                    <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../assets/user.png')} />
                                    :
                                    <ImageBackground
                                        source={{
                                            uri: `data:image/png;base64,${this.state.item.image}`

                                        }}
                                        style={{ height: 60, width: 60, }}
                                        imageStyle={{ borderRadius: 30 }}
                                    >
                                    </ImageBackground>
                            }
                            {/* <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../assets/user-3.jpg')} /> */}
                        </Pressable>

                        <View style={{ marginLeft: 8 }}>
                            <Text style={{ color: '#000', fontWeight: '500' }}>{this.props.item.name} </Text>
                            <Text style={{ color: '#546881', marginTop: 3 }}>{this.state.item.gender} {this.state.item.age} {this.state.item.location}</Text>
                            <Text style={{ color: '#546881', marginTop: 3 }}>Joined 20 Aug 2022</Text>
                        </View>
                    </View>




                    {this.state.followStatus === false ? <Pressable onPress={() => { this.followFriend() }} style={{ padding: 8, borderWidth: 0.5, borderRadius: 7, borderColor: '#007F6D' }}>
                        <Text style={{ color: '#007F6D' }}>Follow</Text>

                    </Pressable> :
                        <Image style={{tintColor:'#2A7862'}} source={require('../assets/Check_round_fill.png')}/>
                        // <Pressable style={{ padding: 8, borderWidth: 0.5, borderRadius: 7, borderColor: '#007F6D' }}>
                        //     <Text style={{ color: '#007F6D' }}>Message</Text>
                        // </Pressable>
                    }
                </View>
            )
        } 
        
        else {
           return null
        }

    }
}

export default SearchFriendsView