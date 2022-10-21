import { Text, View, SafeAreaView, Image, Alert, ActivityIndicator, FlatList, Pressable, ImageBackground, Dimensions, ScrollView } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import moment from 'moment'
import PostsView from '../../Components/PostsView'
import UserPostsView from '../../Components/UserPostView'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
const baseUrl = 'https://golfgang.indexideaz.tech/api';
 

export class MyFollowUserProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            item: this.props.route.params,
            followerData: [],
            followers: [],
            following: [],
            totalFollowing: 0,
            totalFollowers: 0,
            loader: false,
            joined_date: "",
            index:0,
            // totalFollowing: 0
        }
    }
 
    getFollowerDetail = async () => {
        console.log("id", this.state.item.id);
        this.setState({ loader: true })
        try {
            const response = await axios.get(`${baseUrl}/user/${this.state.item.id}`, {

            });

            if (response.status === 200) {
                // console.log("data",response.data);
                // let data = []
                 let CartValue = []
                let data = JSON.stringify(response.data)
                 CartValue = JSON.parse(data)  

                 console.log("cart",CartValue.user);

                this.setState({ loader: false })
                this.setState({ followerData: CartValue.user})
                this.setState({ followers: CartValue.follower.followerData })
                this.setState({ following: CartValue.following.followingData })
                this.setState({ totalFollowers: CartValue.follower.followerData.length })
                this.setState({ totalFollowing: CartValue.following.followingData.length })
                var date = moment(this.state.followerData.created_at).format('MMMM Do YYYY')

                this.setState({ joined_date: date })

            }
        } catch (error) {

            this.setState({ loader: false })
            console.log(error)
            Alert.alert("An error has occurred,try later");
        }

    }

    componentDidMount() {


        this.getFollowerDetail()
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
        return (
            <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView style={{ backgroundColor: '#white' }}>

                </SafeAreaView>


                <View style={{ backgroundColor: 'white' }}>
                    <Text></Text>
                </View>

                <View style={{ backgroundColor: 'white', paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Icon style={{ marginLeft: 10 }} color={"black"} onPress={() => { this.props.navigation.goBack() }} name="chevron-left" size={25} />
                        <Pressable onPress={()=>{this.props.navigation.navigate('Chat',this.state.followerData)}} style={{ padding: 8, marginRight: 16, borderWidth: 0.5, borderRadius: 7, borderColor: '#007F6D' }}>
                            <Text style={{ color: '#007F6D' }}>Message</Text>
                        </Pressable>

                        {/* $$$$$$$$$$$$$$$$$if Followes */}
                        {/* <View style={{flexDirection:'row',marginRight:16}}>
                            <Pressable style={{ padding: 8, marginRight: 8, borderWidth: 0.5, borderRadius: 7, borderColor: '#007F6D' }}>
                                <Text style={{ color: '#007F6D' }}>Message</Text>
                            </Pressable>
                            <Image style={{ tintColor: '#2A7862' }} source={require('../../assets/Check_round_fill.png')} />
                        </View> */}



                    </View>
                </View>

                <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable >
                            {
                                this.state.followerData.image == null ?
                                    <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={require('../../assets/user.png')} />
                                    :
                                    <ImageBackground
                                        source={{
                                            uri: `data:image/png;base64,${this.state.followerData.image}`

                                        }}
                                        style={{ height: 60, width: 60, }}
                                        imageStyle={{ borderRadius: 30 }}
                                    >
                                    </ImageBackground>
                            }
                            {/* <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/user-3.jpg')} /> */}
                        </Pressable>

                        <View style={{ marginLeft: 8 }}>
                            <Text style={{ color: '#000', fontWeight: '500' }}>{this.state.followerData.name} </Text>
                            <Text style={{ color: '#546881', marginTop: 3 }}>{this.state.followerData.gender === "male" ? "Male": "Female"} {this.state.followerData.age} {this.state.followerData.location}</Text>
                            <Text style={{ color: '#546881', marginTop: 3 }}>Joined {this.state.joined_date}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 16 }}>
                    {/* <Pressable style={{ padding: 10, backgroundColor: '#EAF2EF', borderRadius: 13, borderColor: '#007F6D' }}>
                        <Text style={{ color: '#2A7862' }}>Stroke Play</Text>
                    </Pressable>
                    <Pressable style={{ padding: 10, marginLeft: 8, backgroundColor: '#EAF2EF', borderRadius: 13, borderColor: '#007F6D' }}>
                        <Text style={{ color: '#2A7862' }}>Eagle</Text>
                    </Pressable>
                    <Pressable style={{ padding: 10, marginLeft: 8, backgroundColor: '#EAF2EF', borderRadius: 13, borderColor: '#007F6D' }}>
                        <Text style={{ color: '#2A7862' }}>Birdie</Text>
                    </Pressable> */}
                </View>
                <View style={{ padding: 16 }}>
                    <Text style={{ fontSize: 14, color: '#090B0E', fontWeight: '500' }}>{this.state.followerData.job_type}</Text>
                    {/* <Text style={{ marginTop: 8, fontSize: 14, color: '#090B0E', fontWeight: '400' }}>Based in Seattle. Prefer sunny and cloudies weather</Text> */}
                    <Text style={{ marginTop: 8, fontSize: 14, color: '#090B0E', fontWeight: '400' }}>{this.state.followerData.hobby}</Text>
                </View>

                <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text>{this.state.followerData.handicap}</Text>
                        <Text style={{ marginTop: 10 }}>HCP</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>{this.state.totalFollowers}</Text>
                        <Text style={{ marginTop: 10 }}>Followers</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>{this.state.totalFollowing}</Text>
                        <Text style={{ marginTop: 10 }}>Following</Text>
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <FlatList
                    data={this.state.followerData.post} 
                    renderItem={({ item }) => <UserPostsView item={item} navigation={this.props.navigation}/>}
                    showsVerticalScrollIndicator={false}
                />
                    {/* <ScrollView showsVerticalScrollIndicator={false}>
                        <Pressable onPress={()=>{this.props.navigation.navigate('Image')}}>
                            <Image style={{ width: Dimensions.get('window').width - 30, height: 300,borderRadius:8 }} source={require('../../assets/Photo.png')} />
                        </Pressable>

                        <Image style={{ width: Dimensions.get('window').width - 30, height: 380, borderTopLeftRadius: 12, borderTopRightRadius: 12, marginTop: 10 }} source={require('../../assets/Photo.png')} />
                    </ScrollView> */}
                </View>
            </View>
        )
    }
}

export default MyFollowUserProfileScreen