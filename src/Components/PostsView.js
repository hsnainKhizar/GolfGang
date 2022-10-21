import { Text, View, Image, Dimensions, ImageBackground, Pressable } from 'react-native'
import React, { Component } from 'react'
import moment from 'moment'
 
export class PostsView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item,
            // user: this.props.item.user,
            userData: [],
            postDate: 0,
        }
    }
  
    componentDidMount() { 
        var date = moment(this.state.item.created_at).format('YYYY-MM-DD')
         this.setState({postDate: date})
        // console.log("date", this.state.postDate);

        //    this.getUserData()
    } 
    render() {
        return (
            <View style={{ padding: 20 }}>
                <View style={{ flexDirection: 'row' }}>

                    <Pressable onPress={() => { let item = this.state.item; this.props.navigation.navigate('FollowUser',item) }}>
                        {
                            this.state.item.user.image == null ?
                                <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={require('../assets/user.png')} />
                                :
                                <ImageBackground
                                    source={{
                                        uri: `data:image/png;base64,${this.state.item.user.image}`

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

                        <Text style={{ color: '#000', fontWeight: '500' }}>{this.state.item.user.name} <Text style={{ color: '#546881' }}>posted an image</Text></Text>


                        <Text style={{ color: '#546881', marginTop: 3 }}>{this.state.postDate}</Text>
                    </View>
                </View>
               
                    <Text style={{ color: '#000', fontWeight: '400',marginTop:10 }}>{this.state.item.caption} </Text>
                <Pressable onPress={()=>{this.props.navigation.navigate('Image',this.state.item.image)}} >
                  <Image style={{ width: Dimensions.get('window').width - 40, height: 300, borderRadius: 12, alignSelf: 'flex-start', marginTop: 10 }} source={{ uri: `https://golfgang.indexideaz.tech/public/postimage/${this.state.item.image}` }} />
                </Pressable>
            </View>
        )
    }
}

export default PostsView