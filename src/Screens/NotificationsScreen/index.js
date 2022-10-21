import { Text, View, SafeAreaView,FlatList,ActivityIndicator,ImageBackground, Image, Pressable } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios';
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
const baseUrl = 'https://golfgang.indexideaz.tech/api';

export class NotificationsScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            notificationData: [],
            totalPosts: 0,
            loader: false,
        }
    }

    fetchdata = async () => {

        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                // console.log("data",CartValue[0][0][0]);
                this.setState({ userData: CartValue[0].user })

                // console.log("posts", this.state.allposts);

                //console.log(userInfo[0][0].id)
            }
        })

        this.getNotifications()


    }

    getNotifications = async () => {
        console.log("user id", this.state.userData.id);
        this.setState({loader: true})

        try {
            const response = await axios.get(`${baseUrl}/getallnotifications/${this.state.userData.id}`, {

            });
            //  console.log(response.data)

            if (response.status === 200) {
                this.setState({loader: false})
                this.setState({ notificationData: response.data })
                console.log("fcm updated", this.state.notificationData)
                this.setState({ totalPosts: this.state.notificationData.length })
            }
        } catch (error) {
            this.setState({loader: false})
            console.log("here", error)
        }


    }

    componentDidMount() {
        this.fetchdata()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.fetchdata()
        });

        // this.setState({ loader: true })

        // setTimeout(() => {
        //   this.setState({ loader: false })
        // }, 3000)
    }

    componentWillUnmount() {
        this._unsubscribe()
    }


    render() {
        if (this.state.loader === true) {
            return (
              <View style={{backgroundColor:'#2A7862',alignItems:'center',justifyContent:'center',flex:1}}>
              <ActivityIndicator
                size="large"
                color="#fff"
                style={{}}
              />
              </View>
            )
          } 
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                </SafeAreaView>

                <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon onPress={() => { this.props.navigation.navigate.goBack() }} style={{ marginLeft: 10 }} color={"white"} onPress={() => { this.props.navigation.goBack() }} name="chevron-left" size={25} />
                    </View>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Notifications</Text>
                </View>

                {
                    this.state.totalPosts > 0 ?
                    <FlatList
                    data={this.state.notificationData}
                    renderItem={({ item }) =>

                        <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable >

                                {
                                    item.user.image == null ?
                                        <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/user.png')} />
                                        :
                                        <ImageBackground
                                            source={{
                                                uri: `data:image/png;base64,${item.user.image}`

                                            }}
                                            style={{ height: 60, width: 60, }}
                                            imageStyle={{ borderRadius: 30 }}
                                        >
                                        </ImageBackground>
                                }
                                   
                                    {/* <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/user-3.jpg')} /> */}
                                </Pressable>

                                <View style={{ marginLeft: 8 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ color: '#000', fontWeight: '500' }}>{item.user.name} </Text>
                                        <Text style={{ color: '#546881' }}>{item.message}"</Text>
                                    </View>
 
                                    <Text style={{ color: '#546881', marginTop: 13 }}>{moment(item.created_at).format('MMMM Do YYYY')}</Text>
                                </View>
                            </View>
                        </View>

                    }
                    showsVerticalScrollIndicator={false}
                    refreshing={this.state.refreshing}
                    onRefresh={this.updateUserData}

                />:
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>No notifications</Text>
                </View>


                }

                

               


                {/* <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={() => { this.props.navigation.navigate('OtherUser') }}>
                            <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/user-3.jpg')} />
                        </Pressable>

                        <View style={{ marginLeft: 8 }}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{ color: '#000', fontWeight: '500' }}>Sophia </Text>
                            <Text style={{ color: '#546881' }}>messaged you "wow this is really epic"</Text>
                            </View>
                            
                            <Text style={{ color: '#546881', marginTop: 3 }}>Today, 09:00</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={() => { this.props.navigation.navigate('OtherUser') }}>
                            <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/user-3.jpg')} />
                        </Pressable>

                        <View style={{ marginLeft: 8 }}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{ color: '#000', fontWeight: '500' }}>Sophia </Text>
                            <Text style={{ color: '#546881' }}>messaged you "wow this is really epic"</Text>
                            </View>
                            
                            <Text style={{ color: '#546881', marginTop: 3 }}>Today, 09:00</Text>
                        </View>
                    </View>
                </View> */}
            </View>
        )
    }
}

export default NotificationsScreen