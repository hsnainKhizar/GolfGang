import { Text, View, Dimensions, FlatList, Image, SafeAreaView, ImageBackground, Pressable, StyleSheet, Alert } from 'react-native'
import React, { Component } from 'react'

export default class ResultedUsers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item,
            index: this.props.index + 1,
            comp: this.props.comp

        }
    }

    

    componentDidMount() {
        // console.log("comp",this.props.comp.first_price);
    }



    render() {
        return (

            <View>
                {
                    this.state.index <= 3 && (
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, alignSelf: "center", justifyContent: 'center' }}>

                                {
                                    this.state.item.image == null ?
                                        <Image style={{ width: this.state.index === 1 ? 80 : 70, height: this.state.index === 1 ? 80 : 70, borderRadius: this.state.index === 1 ? 40 : 35 }} source={require('../assets/user.png')} />
                                        :
                                        <ImageBackground
                                            source={{
                                                uri: `data:image/png;base64,${this.state.item.image}`

                                            }}
                                            style={{ width: this.state.index === 1 ? 80 : 70, height: this.state.index === 1 ? 80 : 70 }}
                                            imageStyle={{ borderRadius: this.state.index === 1 ? 40 : 35 }}
                                        >
                                        </ImageBackground>
                                }

                                <View style={{position:'absolute',bottom:0,right:0}}>
                                    {
                                        this.state.index === 1 && (
                                            <Image style={{width:30,height:30}} source={require('../assets/firstStar.png')}/>
                                        )
                                    }
                                    {
                                        this.state.index === 2 && (
                                            <Image style={{width:30,height:30}} source={require('../assets/secondStar.png')}/>
                                        )
                                    }
                                    {
                                        this.state.index === 3 && (
                                            <Image style={{width:30,height:30}} source={require('../assets/thirdStar.png')}/>
                                        )
                                    }
                                    
                                </View>

                                
                                {/* <Image style={{ width: this.state.index === 1 ? 80:70, height: this.state.index === 1 ? 80:70, borderRadius: this.state.index === 1 ? 40:35 }} source={require('../assets/user.png')} /> */}
                            </View>
                            <View>
                                <Text style={{ alignSelf: 'center', marginTop: 10 }}>{this.state.item.name}</Text>
                                {
                                    this.state.index === 1 && (
                                        <Text style={{ alignSelf: 'center', marginTop: 10 }}>${this.state.comp.buy_in_cost_amount}</Text>
                                    )
                                }
                                {/* {
                                    this.state.index === 2 && (
                                        <Text style={{ alignSelf: 'center', marginTop: 10 }}>${this.state.comp.second_price}</Text>
                                    )
                                }
                                {
                                    this.state.index === 3 && (
                                        <Text style={{ alignSelf: 'center', marginTop: 10 }}>${this.state.comp.third_price}</Text>
                                    )
                                } */}
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }
}