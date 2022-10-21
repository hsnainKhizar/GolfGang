import { Text, View, Image, Pressable, Dimensions, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import axios from 'axios';
const baseUrl = 'https://golfgang.indexideaz.tech/api';
 
export class CompetitionsView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            item: this.props.item
        }
    }

    componentDidMount() {
        // console.log("name",this.state.item.user.name);
    }

    checkCompetitionDetail = () => {

        this.updateViewsDetail()

        let item = this.state.item
        this.props.navigation.navigate('Detail', item)
    }

    updateViewsDetail = async () => {
        console.log("user_id", this.state.item.user.id);
        console.log("competition", this.state.item.id);

        let competition_id = this.state.item.id
        let user_id = this.state.item.user.id

        try {
            const response = await axios.post(`${baseUrl}/competitionview`, {
                competition_id,
                user_id
            });
            // console.log(response.data)

            if (response.status === 200) {
                // let item = this.state.item
                // this.props.navigation.navigate('Detail', item)
                console.log("view added");
            }
        } catch (error) {
            //setIndicator(false)
            console.log(error)
            // Alert.alert("An error has occurred,try later");
        }


    }

    render() {
        return (
            <Pressable onPress={() => { this.checkCompetitionDetail() }} style={{ backgroundColor: 'white', borderRadius: 9, marginVertical: 10 }}>
                <Pressable onPress={() => { this.checkCompetitionDetail() }}>
                    <ImageBackground
                        source={{
                            uri: `data:image/png;base64,${this.state.item.image}`

                        }}
                        style={{ width: Dimensions.get('window').width - 30, height: 127 }}
                        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                    >
                    </ImageBackground>
                    {/* <Image style={{ width: Dimensions.get('window').width - 30, height: 127, borderTopLeftRadius: 12, borderTopRightRadius: 12 }} source={require('../assets/Photo.png')} /> */}
                </Pressable>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#1D242D', fontSize: 20, fontWeight: '500' }}>{this.state.item.name}</Text>
                        <Pressable style={{ padding: 8, backgroundColor: '#EAF2EF', borderRadius: 13, borderColor: '#007F6D' }}>
                            <Text style={{ color: '#2A7862' }}>Buy In ${this.state.item.buy_in_cost_amount}</Text>
                        </Pressable>
                    </View>
                    <Text style={{ color: '#546881' }}>{this.state.item.com_date}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Image style={{ width: 20, height: 20 }} source={require('../assets/Flag_fill.png')} />
                        <Text style={{ color: '#546881' }}>{this.state.item.no_shorts} : </Text>
                        <Text style={{ color: '#546881' }}>{this.state.item.format}</Text>
                    </View>
                </View>

            </Pressable>
        )
    }
}

export default CompetitionsView