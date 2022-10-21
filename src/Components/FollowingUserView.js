import { Text, View, Pressable, Image, ImageBackground } from 'react-native'
import React, { Component } from 'react'
 
export class FollowingUserView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            item: this.props.item,
        }
    }
 

    render() {
        return (
            <Pressable style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable onPress={() => { let item = this.state.item; this.props.navigation.navigate('MyFollowUser', item) }}>  
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
                        {/* <Text style={{ color: '#546881', marginTop: 3 }}>{this.state.item.gender} {this.state.item.age} {this.state.item.location}</Text> */}
                        {/* <Text style={{ color: '#546881', marginTop: 3 }}>Joined 20 Aug 2022</Text> */}
                    </View>


                </View>





                <Pressable onPress={()=>{this.props.navigation.navigate('Chat',this.state.item)}} style={{ padding: 8, borderWidth: 0.5, borderRadius: 7, borderColor: '#007F6D' }}>
                    <Text style={{ color: '#007F6D' }}>Message</Text>

                </Pressable>
            </Pressable>
        )
    }
}

export default FollowingUserView