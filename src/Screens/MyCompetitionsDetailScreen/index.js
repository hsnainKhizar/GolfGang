import { Text, View, Dimensions, FlatList, Image,TouchableWithoutFeedback, SafeAreaView, ActivityIndicator, ImageBackground, Pressable, StyleSheet, Alert } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Button, RadioButton } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import ResultedUsers from '../../Components/ResultedUsers'
const baseUrl = 'https://golfgang.indexideaz.tech/api';
import moment from 'moment'


export class MyCompetitionsDetailScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            userData: [],
            item: this.props.route.params,
            totalView: 0,
            totalInterested: 0,
            totalShared: 0,
            viewsUsers: [],
            interestedUsers: [],
            sharedUsers: [],
            rankedUsers: [],
            loader: false,
        }
    }

    getLoginUserData = async () => {
        this.setState({ loader: true })
        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                this.setState({ userData: CartValue[0].user })
                this.setState({ postsLength: this.state.userData.post.length })
                //console.log("login user id", this.state.userData);
                //console.log(userInfo[0][0].id)
            }
        })

        let competition_id = this.state.item.id

        try {
            const response = await axios.get(`${baseUrl}/competition/${competition_id}`, {

            });
            // console.log(response.data)

            if (response.status === 200) {
                this.setState({ loader: false })
                //competitionintersted
                //  competitionview
                this.setState({ viewsUsers: response.data.competitionview })
                this.setState({ totalView: this.state.viewsUsers.length })
                this.setState({ interestedUsers: response.data.competitionintersted })
                this.setState({ totalInterested: this.state.interestedUsers.length })
                // console.log("viewed users", response.data.competitionview);
            }
        } catch (error) {
            //setIndicator(false)
            console.log(error)
            // Alert.alert("An error has occurred,try later");
        }
    }

    getRankedUsers = async () => {

        try {
            const response = await axios.get(`${baseUrl}/getintersted/${this.state.item.id}`, {

            });
            // console.log(response.data)

            if (response.status === 200) {
                this.setState({ rankedUsers: response.data })
                // console.log(this.state.interestedUsers.length);
            }
        } catch (error) {
            //setIndicator(false)
            console.log(error)
            // Alert.alert("An error has occurred,try later");
        }

    }

    componentDidMount() {
        this.getLoginUserData()
        this.getRankedUsers()
    }



    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ImageBackground
                    source={{
                        uri: `data:image/png;base64,${this.state.item.image}`

                    }}
                    style={{ width: Dimensions.get('window').width, height: 295 }}
                    imageStyle={{}}
                >
                </ImageBackground>
                {/* <Image style={{ width: Dimensions.get('window').width, height: 295, borderTopLeftRadius: 12, borderTopRightRadius: 12 }} source={require('../../assets/Photo.png')} /> */}
                <View style={{ flexDirection: 'row', position: 'absolute' }}>
                    <SafeAreaView>
                        <View style={{ width: Dimensions.get('window').width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Icon style={{ marginLeft: 10, fontWeight: '500' }} color={"white"} onPress={() => { this.props.navigation.goBack() }} name="chevron-left" size={30} />
                            <Icon style={{ alignSelf: 'flex-end', marginRight: 14 }} color={"white"} onPress={() => { this.props.navigation.goBack() }} name="send" size={25} />
                        </View>

                    </SafeAreaView>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 14 }}>
                        <Text style={{ color: '#1D242D', fontSize: 24, fontWeight: '500' }}>{this.state.item.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14 }}>
                            <View>
                                <Text style={{ color: '#546881', fontSize: 16, marginTop: 8 }}>{this.state.item.golf_course}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#546881', fontSize: 16, marginTop: 12 }}><Icon name="map-pin" size={17} /> {this.state.userData.city},{this.state.userData.state} </Text>
                                    <Text style={{ color: '#546881', fontSize: 16, marginTop: 12, marginLeft: 10 }}><Icon name="calendar" size={17} /> {moment(this.state.userData.created_at).format('MMMM Do YYYY')}</Text> 
                                </View>
                            </View>

                            {
                                this.state.userData.image == null ?
                                    <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require('../../assets/user.png')} />
                                    :
                                    <ImageBackground
                                        source={{
                                            uri: `data:image/png;base64,${this.state.userData.image}`

                                        }}
                                        style={{ height: 50, width: 50, }}
                                        imageStyle={{ borderRadius: 25 }}
                                    >
                                    </ImageBackground>
                            }



                            {/* <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require('../../assets/user-3.jpg')} /> */}
                        </View>

                        {/* $$$$$$$$$$$$$$$$interested People if have */}


                        {

                            // let comp = this.state.item


                            this.state.item.status === "completed" ?

                                // <Text>complete</Text>
                                <View style={{ alignItems: 'center', backgroundColor: '#FFE49B', borderRadius: 10, padding: 10 }}>
                                    <FlatList
                                        data={this.state.rankedUsers}
                                        renderItem={({ item, index }) =>

                                            <ResultedUsers item={item} navigation={this.props.navigation} index={index} comp={this.state.item} />
                                        }
                                        showsVerticalScrollIndicator={false}
                                        horizontal={true}

                                    />
                                </View>

                                :
                                <Pressable onPress={() => { let item = this.state.item; this.props.navigation.navigate("Interested", item) }} style={{ flexDirection: 'row', padding: 15, marginTop: 12, borderRadius: 8, backgroundColor: '#FFE49B', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 16 }}>People Interested ({this.state.totalInterested})</Text>
                                    <Icon style={{ marginLeft: 10, fontWeight: '500' }} color={"black"} name="chevron-right" size={20} />
                                </Pressable>

                        }
                        {/* <View style={{ flexDirection: 'row', padding: 15, marginTop: 12, borderRadius: 8, backgroundColor: '#FFE49B', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16 }}>People Interested(4)</Text>
                            <Icon onPress={() => { this.props.navigation.navigate("Interested") }} style={{ marginLeft: 10, fontWeight: '500' }} color={"black"} name="chevron-right" size={20} />
                        </View> */}


                        <View style={{ flexDirection: 'row', padding: 16, marginTop: 12, alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <View style={{ alignItems: 'center' }}>
                                {
                                    this.state.loader === true ?
                                        <ActivityIndicator size={'small'} /> :
                                        <Text><Icon name="eye" size={17} /> {this.state.totalView}</Text>
                                }

                                <Text style={{ marginTop: 10, color: '#546881' }}>Views</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                {
                                    this.state.loader === true ?
                                        <ActivityIndicator size={'small'} /> :
                                        <Text><Text><Icon name="star" size={17} /></Text> {this.state.totalInterested}</Text>
                                }

                                <Text style={{ marginTop: 10, color: '#546881' }}>Interested</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text><Icon name="send" size={17} /> {this.state.totalShared}</Text>
                                <Text style={{ marginTop: 10, color: '#546881' }}>Shared</Text>
                            </View>
                        </View>
                        <Text style={{ color: '#1D242D', fontSize: 20 }}>About Competition</Text>
                        <View style={{ flexDirection: 'row', marginTop: 16 }}>
                            <Pressable style={{ padding: 10, backgroundColor: '#EAF2EF', borderRadius: 13, borderColor: '#007F6D' }}>
                                <Text style={{ color: '#2A7862' }}>{this.state.item.format}</Text>
                            </Pressable>
                            <Pressable style={{ padding: 10, marginLeft: 8, backgroundColor: '#EAF2EF', borderRadius: 13, borderColor: '#007F6D' }}>
                                <Text style={{ color: '#2A7862' }}>{this.state.item.handicap}</Text>
                            </Pressable>
                            {/* <Pressable style={{ padding: 10, marginLeft: 8, backgroundColor: '#EAF2EF', borderRadius: 13, borderColor: '#007F6D' }}>
                                <Text style={{ color: '#2A7862' }}>{this.state.item.no_shorts}</Text>
                            </Pressable> */}
                        </View>
                        <Text style={{ color: '#546881', fontSize: 16, marginTop: 10 }}>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum ', making it look like readable English
                        </Text>

                        <View style={{ alignItems: 'center', backgroundColor: '#F2F4F7', marginTop: 20, borderRadius: 8 }}>

                            <Image style={{ marginBottom: 10, marginTop: 13 }} source={require('../../assets/Trophy_light.png')} />
                            <Text style={{ color: '#1D242D', fontSize: 18, fontWeight: '400' }}>Buy In Price</Text>
                            {/* <View style={{ flexDirection: 'row', marginTop: 17 }}>
                                <Text style={{ color: '#1D242D', fontSize: 18, fontWeight: '500' }}>1st place  </Text>
                                <Text style={{ color: '#2A7862', fontSize: 18, fontWeight: '500' }}>${this.state.item.first_price}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 13 }}>
                                <Text style={{ color: '#1D242D', fontSize: 16, fontWeight: '400' }}>2nd place  </Text>
                                <Text style={{ color: '#2A7862', fontSize: 16, fontWeight: '500' }}>${this.state.item.second_price}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                                <Text style={{ color: '#1D242D', fontSize: 16, fontWeight: '400' }}>3rd place  </Text>
                                <Text style={{ color: '#2A7862', fontSize: 16, fontWeight: '500' }}>${this.state.item.third_price}</Text>
                            </View> */}
                        </View>

                        <Text style={{ color: '#2A7862', fontSize: 20, alignSelf: 'center', marginTop: 14 }}>Buy In ${this.state.item.buy_in_cost_amount}</Text>


                        {/*$$$$$$$$$ button for others to mark interest */}
                        {/* <Button uppercase={false} mode="contained" onPress={() => { loginIndividual() }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>I'm Interested</Button> */}

                        {/* $$$$$$$$$$$BUTTON FOR OWN CREATED COMPETITIONS */}

                        {
                            this.state.item.status === "active" ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Pressable onPress={() => { Alert.alert("in progress") }} style={{ marginTop: 15, paddingLeft: 24, borderColor: '#2A7862', borderWidth: 0.5, paddingRight: 24, paddingBottom: 10, paddingTop: 10, backgroundColor: '#fff', borderRadius: 5 }}>
                                        <Text style={{ color: 'black' }}>Edit Competition</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { let item = this.state.item; this.props.navigation.navigate('Complete', item) }} style={{ marginTop: 15, marginLeft: 6, paddingLeft: 54, paddingRight: 54, paddingBottom: 10, paddingTop: 10, backgroundColor: '#2A7862', borderRadius: 5 }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Complete</Text>
                                    </Pressable>
                                    {/* <Pressable onPress={() => { this.props.navigation.navigate('Complete') }} style={{ marginTop: 15, marginLeft: 6, paddingLeft: 54, paddingRight: 54, paddingBottom: 10, paddingTop: 10, backgroundColor: '#2A7862', borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Complete </Text>
                            </Pressable> */}
                                </View> :
                                <Pressable style={{ marginTop: 15, marginLeft: 6, paddingLeft: 54, paddingRight: 54, paddingBottom: 10, paddingTop: 10, backgroundColor: '#2A7862', borderRadius: 5 }}>
                                    <Text style={{ color: 'white', alignSelf: 'center', fontWeight: 'bold' }}>Completed</Text>
                                </Pressable>

                        }



                    </View>
                </ScrollView>

            </View>
        )
    }
}

export default MyCompetitionsDetailScreen

const styles = StyleSheet.create({
    loginButton: {
        alignSelf: 'center',
        marginTop: 16,
        // position:'absolute',
        //bottom:0,
        //right:0,
        // alignSelf:'flex-end',
        width: '80%',
        borderRadius: 10,
        backgroundColor: '#2A7862',
        // color:'white',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 2,

    },
})