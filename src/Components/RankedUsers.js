import { Text, View, SafeAreaView, Image,ImageBackground, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class RankedUsers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item,
            index: this.props.index+1,
        }
    }
 
    componentDidMount() {

    }


    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>

                        {
                            this.state.item.image === null ?
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


                        <View style={{ marginLeft: 8 }}>
                            <Text style={{ color: '#000', fontWeight: '500' }}>{this.state.item.name} </Text>
                            <Text style={{ color: '#546881', marginTop: 3 }}>{this.state.item.gender === "male" ? "Male" : "Female"} {this.state.item.age} {this.state.item.city},{this.state.item.state}</Text>
                            {/* <Text style={{ color: '#546881', marginTop: 3 }}>Joined 20 Aug 2022</Text> */}
                        </View>
                    </View>

                    <Pressable style={{ padding: 8, borderWidth: 0.5, backgroundColor: '#2A7862', borderRadius: 40, borderColor: '#007F6D' }}>
                        <Text style={{ color: 'white', fontWeight: '800' }}>  {this.state.index} </Text>
                    </Pressable>
                </View>
            </View>
        )
    }
}