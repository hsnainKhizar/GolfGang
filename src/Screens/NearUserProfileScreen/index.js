import { Text, View, SafeAreaView, Image, FlatList, ActivityIndicator, Alert, Pressable, ImageBackground, Dimensions, ScrollView } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import PostsView from '../../Components/PostsView'
import UserPostsView from '../../Components/UserPostView'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
const baseUrl = 'https://golfgang.indexideaz.tech/api';

export class NearUserProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            userData: [],
            followStatus: false,
            item: this.props.route.params,
            totalFollowing: 0,
            totalFollowers: 0,
            loader: false,
        }
    }

    getLoginUserData = async () => {
        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                this.setState({ userData: CartValue[0].user })
            }
        })


    }

    componentDidMount() {
        this.getLoginUserData()

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


    render() {

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView style={{ backgroundColor: '#white' }}>

                </SafeAreaView>


                <View style={{ backgroundColor: 'white' }}>
                    <Text></Text>
                </View>

                <View style={{ backgroundColor: 'white', paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Icon style={{ marginLeft: 10 }} color={"black"} onPress={() => { this.props.navigation.goBack() }} name="chevron-left" size={25} />
                        {this.state.followStatus === false ? <Pressable onPress={() => { this.followFriend() }} style={{ padding: 8, borderWidth: 0.5, borderRadius: 7,marginRight:10, borderColor: '#007F6D' }}>
                            <Text style={{ color: '#007F6D' }}>Follow</Text>

                        </Pressable> :
                            <Image style={{ tintColor: '#2A7862',marginRight:10 }} source={require('../../assets/Check_round_fill.png')} />
                            // <Pressable style={{ padding: 8, borderWidth: 0.5, borderRadius: 7, borderColor: '#007F6D' }}>
                            //     <Text style={{ color: '#007F6D' }}>Message</Text>
                            // </Pressable>
                        }
                    </View>
                </View>

                <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={() => { this.props.navigation.navigate('OtherUser') }}>
                            {
                                this.props.route.params.image == null ?
                                    <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/user.png')} />
                                    :
                                    <ImageBackground
                                        source={{
                                            uri: `data:image/png;base64,${this.props.route.params.image}`

                                        }}
                                        style={{ height: 60, width: 60, }}
                                        imageStyle={{ borderRadius: 30 }}
                                    >
                                    </ImageBackground>
                            }
                            {/* <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/user-3.jpg')} /> */}
                        </Pressable>

                        <View style={{ marginLeft: 8 }}>
                            <Text style={{ color: '#000', fontWeight: '500' }}>{this.state.item.name} </Text>
                            <Text style={{ color: '#546881', marginTop: 3 }}>{this.state.item.gender === "male" ? "Male" : "Female"} {this.state.item.age} {this.state.item.city}</Text>
                            <Text style={{ color: '#546881', marginTop: 3 }}>Joined {moment(this.state.item.created_at).format('MMMM Do YYYY')}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ padding: 16 }}>
                    <Text style={{ fontSize: 14, color: '#090B0E', fontWeight: '500' }}>{this.state.item.job_type}</Text>
                    {/* <Text style={{ marginTop: 8, fontSize: 14, color: '#090B0E', fontWeight: '400' }}>Based in Seattle. Prefer sunny and cloudies weather</Text> */}
                    <Text style={{ marginTop: 8, fontSize: 14, color: '#090B0E', fontWeight: '400' }}>{this.state.item.hobby}</Text>
                </View>

                <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text>{this.state.item.handicap}</Text>
                        <Text style={{ marginTop: 10 }}>HCP</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>0</Text>
                        <Text style={{ marginTop: 10 }}>Followers</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>{this.state.item.follow.length}</Text>
                        <Text style={{ marginTop: 10 }}>Following</Text>
                    </View>
                </View>

                <View style={{ flex: 1 }}>

                    {
                        this.state.item.post.length === 0 ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <Text style={{ color: 'black' }}>No posts</Text>
                            </View>
                            :
                            <FlatList
                                data={this.state.item.post}
                                renderItem={({ item }) => <UserPostsView item={item} navigation={this.props.navigation} />}
                                showsVerticalScrollIndicator={false}
                            />

                    }

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

export default NearUserProfileScreen