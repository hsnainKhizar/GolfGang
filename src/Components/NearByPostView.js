import { Text, View, FlatList,Pressable,Image } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NearPosts from './NearPosts'

export default class NearByPostView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            nearByUserData: [],
        }
    }

    fetchdata = async () => {

        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                // console.log("data",CartValue[0][0][0]);
                this.setState({ userData: CartValue[0].user })
            }
        })
        console.log("strt now");
        console.log("zip",this.props.item.name)
        if (this.state.userData.location == this.props.item.location){
            console.log("match");
        }
       
    }

    componentDidMount() {
        console.log(this.props.item.id);
        this.fetchdata()
    }
    render() {
        return (
            <View style={{}}>
                {
                    this.state.userData.location === this.props.item.location ?
                        <View style={{paddingLeft: 20,paddingTop:14}}>
                            {
                                this.props.item.post.length > 0 && (
                                    // <Text>user id {this.props.item.id}</Text>
                                    <View style={{ flexDirection: 'row' }}>

                                    <Pressable onPress={()=>{ 
                                        let item = this.props.item; 
                                        this.props.navigation.navigate('NearUser',item);
                                    }}>
                                        {
                                            this.props.item.image == null ?
                                                <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={require('../assets/user.png')} />
                                                :
                                                <ImageBackground
                                                    source={{
                                                        uri: `data:image/png;base64,${this.props.item.image}`
                
                                                    }}
                                                    style={{ height: 30, width: 30, }}
                                                    imageStyle={{ borderRadius: 15 }}
                                                >
                                                </ImageBackground>
                                        }
                                        {/* <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={require('../assets/user.png')} /> */}
                                    </Pressable>
                                    {/* <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={require('../assets/user.png')} /> */}
                                    <View style={{ marginLeft: 8 }}>
                
                                        <Text style={{ color: '#000', fontWeight: '500' }}>{this.props.item.name} <Text style={{ color: '#546881' }}>posted below images</Text></Text>
                
                
                                        {/* <Text style={{ color: '#546881', marginTop: 3 }}>{this.state.postDate}</Text> */}
                                    </View>
                                </View>
                                )
                            } 
                            <View style={{flex:1}}>
                            <FlatList
                                data={this.props.item.post}
                                renderItem={({ item,i }) => <NearPosts item={item} navigation={this.props.navigation} />}
                                showsVerticalScrollIndicator={false} 
                                refreshing={this.state.refreshing}
                                onRefresh={this.updateUserData}
                            />
                           
                            </View> 
                            
                        </View>
                        :
                        null
                }
                 
            </View>
        )
    }
}