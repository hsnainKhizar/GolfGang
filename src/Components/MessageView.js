import { Text, View, Image, Pressable,ImageBackground } from 'react-native'
import React, { Component } from 'react'

 class MessageView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item,
        }
    }

    componentDidMount(){
       // console.log("prop",this.props);
    }


 


    render() {
        return (
            <Pressable onPress={()=>{ let item = this.state.item ; this.props.navigation.navigate('Chat',item)}} style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', }}>
                    <View>
                        <View style={{ position: 'absolute', borderRadius: 16, borderWidth: 6, zIndex: 10, borderColor: '#2A7862', height: 8, right: 3, flexDirection: 'row', backgroundColor: 'green' }}>

                        </View>
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
                    </View>

                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ color: '#000', fontWeight: '500' }}>{this.state.item.name} </Text>
                        <Text style={{ color: '#546881', marginTop: 3 }}>{this.state.item.gender === "male" ? "Male": "Female" } {this.state.item.age} {this.state.item.city},{this.state.item.state}</Text>
                        {/* <Text style={{ color: '#546881', marginTop: 3 }}>Joined 20 Aug 2022</Text> */}
                    </View>

                </View>
                {/* <Text style={{ color: '#546881', marginTop: 3, alignSelf: 'flex-start' }}>09:21</Text> */}


            </Pressable>
        )
    }
}

export default MessageView