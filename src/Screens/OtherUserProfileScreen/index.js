import { Text, View, SafeAreaView, Image, FlatList, Pressable,ImageBackground, Dimensions, ScrollView } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import PostsView from '../../Components/PostsView'
import UserPostsView from '../../Components/UserPostView'
import moment from 'moment'
 
export class OtherUserProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            item: this.props.route.params,
            totalFollowing: 0,
            totalFollowers: 0,
        }
    }

    componentDidMount() {
          console.log("user",this.state.item.post.length);
    }


    render() {
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
                        <Pressable style={{ padding: 8, marginRight: 16, borderWidth: 0.5, borderRadius: 7, borderColor: '#007F6D' }}>
                            <Text style={{ color: '#007F6D' }}>Follow</Text>
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
                            <Text style={{ color: '#546881', marginTop: 3 }}>{this.state.item.gender === "male" ? "Male":"Female"} {this.state.item.age} {this.state.item.city}</Text>
                            <Text style={{ color: '#546881', marginTop: 3 }}>Joined {moment(this.state.item.created_at).format('MMMM Do YYYY')}</Text>
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
                        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                            <Text style={{color:'black'}}>No posts</Text>
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

export default OtherUserProfileScreen