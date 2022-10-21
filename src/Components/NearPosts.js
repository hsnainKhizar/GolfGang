import { Text, View,Pressable,Image,Dimensions} from 'react-native'
import React, { Component } from 'react'

export default class NearPosts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            totalLength: 0,
        }
    }

    componentDidMount() {
       
    }
    render() {
        return (
            // <View style={{flex:1}}>
                
                <Pressable style={{}} onPress={() => {
                }
                } >
                    <Text style={{ color: '#000', fontWeight: '400', marginTop: 10 }}>{this.props.item.caption} </Text>
                    <Image style={{ width: Dimensions.get('window').width - 40, height: 300, borderRadius: 12, alignSelf: 'flex-start', marginTop: 10 }} source={{ uri: `https://golfgang.indexideaz.tech/public/postimage/${this.props.item.image}` }} />
                </Pressable>
           
        )
    }
}