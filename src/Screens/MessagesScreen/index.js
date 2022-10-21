import { View, Text, SafeAreaView, Pressable, FlatList, ImageBackground, Image } from 'react-native'
import React from 'react'
import MessageView from '../../Components/MessageView'
import { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FollowingUserView from '../../Components/FollowingUserView'
import MessageUserView from '../../Components/MessageUserView'

class MessagesScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            allposts: [],
            postsLength: 0,
            followers: [],
            following: [],
            totalFollowing: 0,
        }
    }
    fetchdata = async () => {

        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                // console.log("data",CartValue[0][0][0]);
                this.setState({ userData: CartValue[0].user })
                this.setState({ allposts: CartValue[0][1] })
                this.setState({ following: CartValue[0].following.followingData })
                //  this.setState({ userData: CartValue[0][1]})
                this.setState({ postsLength: this.state.userData.follow.length })
                console.log("followers length", this.state.postsLength);
            }
        })

        // $$$$$$$$$$$$$ need to show all follwers

        //   let postArray = this.state.allposts

        //  postArray.map((val,i)=>{
        //      if(i <= this.state.postsLength)(
        //         this.setState(prevState => ({
        //             followers: [val.user, ...prevState.followers]
        //           }))
        //      )
        // })

        // console.log("my follwoers",this.state.followers.length);
    }

    componentDidMount() {
        this.fetchdata()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.fetchdata()
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }


    render() {
        return (
            <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                </SafeAreaView>

                <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View>
                <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View>

                <View style={{ backgroundColor: '#2A7862', paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginLeft: 16 }}>Chat Room</Text>
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
                                {/* <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={require('../../assets/user.png')} /> */}
                            </Pressable>
                        </View>

                    </View>
                    {/* <Text style={{ color: '#CCDFD9', fontWeight: 'bold', fontSize: 14, marginTop: 10, alignSelf: 'flex-start', marginLeft: 16, marginBottom: 7 }}>Based on your preferences, we think you might be interested in following more golfers</Text> */}
                </View>

                {/* $$$$$$$$$ message view */}
                <View style={{ flex: 1 }}>
                    {/* <Text style={{ fontSize: 18, color: '#546881', fontWeight: '500' }}>No messages</Text> */}

                    {/* <MessageView navigation={this.props.navigation}/> */}
                    {/* <MessageView /> */}

                    {/* <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.following}
                            renderItem={({ item }) => <MessageUserView item={item} />}
                            showsVerticalScrollIndicator={false}
                        />
                    </View> */}




                    <View>
                        <FlatList
                            data={this.state.following}
                            renderItem={({ item }) => <MessageView item={item} navigation={this.props.navigation} />}
                            showsVerticalScrollIndicator={false}
                        // refreshing={this.state.refreshing}
                        // onRefresh={this.updateUserData}
                        />
                    </View> 


                </View>


            </View>
        )
    }

}

export default MessagesScreen