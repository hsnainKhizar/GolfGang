import { View, Text, SafeAreaView, Dimensions, Image, Pressable } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
 
class ImageViewScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
        }
    }

    componentDidMount(){
        console.log(this.props.route.params);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black',justifyContent:'flex-end',alignItems:'center'}}>
                <SafeAreaView style={{ backgroundColor: 'black' }}>

                </SafeAreaView>


                <View style={{ backgroundColor: 'black' }}>
                    <Text></Text>
                </View>

                <View style={{ backgroundColor: 'black', padding: 10, paddingBottom: 10, alignSelf: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Icon onPress={()=>{this.props.navigation.navigate.goBack()}} style={{ marginLeft: 10, alignSelf: 'flex-end' }} color={"white"} onPress={() => { this.props.navigation.goBack() }} name="x" size={25} />
                    </View>
                </View>

                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image style={{ width: Dimensions.get('window').width, height: 380 }} source={{ uri: `https://golfgang.indexideaz.tech/public/postimage/${this.props.route.params}` }} />
                    {/* <Image style={{ width: Dimensions.get('window').width, height: 380 }} source={require('../../assets/Photo.png')} /> */}
                </View>
                
                {/* $$$$$$$$$$   this will show when post is by login user */}

                <View style={{position:'absolute',bottom:20}}>
                    {/* <Text style={{color:'white',fontWeight:'400',fontSize:16}}>Caption will be writtin somewhere here</Text> */}
                    {/* <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
                        <Pressable style={{borderWidth:1,borderColor:'white',padding:7,borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'500',fontSize:16}}>Replace</Text>
                        </Pressable>
                        <Pressable style={{borderWidth:1,borderColor:'white',padding:7,borderRadius:5,marginLeft:10}}>
                            <Text style={{color:'white',fontWeight:'500',fontSize:16}}>Delete</Text>
                        </Pressable>
                    </View> */}
                </View>
            </View>
        )
    }

}

export default ImageViewScreen