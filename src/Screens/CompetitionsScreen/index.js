import { View, Text, SafeAreaView, FlatList, Image, Alert, Pressable, ActivityIndicator, ScrollView, ImageBackground, StyleSheet, TextInput, Dimensions } from 'react-native'
import React, { Component } from 'react'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Feather'
import { Button, RadioButton } from 'react-native-paper'
import CompetitionsView from '../../Components/CompetitionsView'
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
const baseUrl = 'https://golfgang.indexideaz.tech/api';

class CompetitionScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            zipcode: 0,
            miles_away: 0,
            userData: [],
            demoData: ["no post"],
            competition_length: 0,
            followingUsersCompetitions: [],
            handicap: 0,
            age: 0,
            index: 0,
            gender: "",
            betting: "",
            drinking: "",
            smoking: "",
            refreshing: false,
            countBetting: "0",
            countDrinking: "0",
            countSmoking: "0",
            genderCount: "0",
            loader: false,
        }
    }

    getLoginUserData = async () => {
        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                this.setState({ userData: CartValue[0].user })
                this.setState({ followingUsersCompetitions: CartValue[0].following.followingCompetition })
                this.setState({ postsLength: this.state.userData.post.length })
                this.setState({ competition_length: CartValue[0].following.followingCompetition.length })
                // console.log("comp length", this.state.followingUsersCompetitions);
                // console.log(userInfo[0][0].id)
            }
        })
    }

    showFilter = () => {
        this.setState({ showModal: true })
    }

    createCompetition = () => {
        this.props.navigation.navigate('NewCompetition')
    }

    componentDidMount() {
        this.getLoginUserData()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getLoginUserData()
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    updateUserData = async () => {

        this.setState({ refreshing: true })



        try {
            const response = await axios.get(`${baseUrl}/user/${this.state.userData.id}`, {

            });
            // console.log(response.data)

            if (response.status === 200) {
                await AsyncStorage.removeItem('userData').then((res) => {
                    //this.props.addItemToCart(this.state.num)

                })
                    .catch((e) => {
                    })
                // setIndicator(false)
                this.setState({ refreshing: false })
                console.log("new new data", response.data);

                let userDetail = response.data
                //this.setState({userData : user})

                AsyncStorage.getItem('userData').then((datacart) => {
                    // console.log(datacart)
                    if (datacart !== null) {
                        const cart = JSON.parse(datacart)
                        cart.push(userDetail)

                        AsyncStorage.setItem('userData', JSON.stringify(cart))
                        AsyncStorage.getItem('userData').then((cart) => {
                            if (cart !== null) {
                                let CartValue = JSON.parse(cart)
                                // console.log("data",CartValue[0][0][0]);
                                this.setState({ userData: CartValue[0].user })
                                this.setState({ followingUsersCompetitions: CartValue[0].following.followingCompetition })
                                this.setState({ postsLength: this.state.userData.post.length })
                                this.setState({ competition_length: CartValue[0].following.followingCompetition.length })
                                //console.log("posts", this.state.userData);

                                //console.log(userInfo[0][0].id)
                            }
                        })
                    }
                    else {
                        const cart = []
                        cart.push(userDetail)
                        AsyncStorage.setItem('userData', JSON.stringify(cart))
                    }
                    //props.addItemToCart(num)

                }).catch((eror) => {
                    console.log(eror)
                })
                //navigation.replace('WelcomeScreen')
            }
        } catch (error) {
            //setIndicator(false)
            console.log(error)
            this.setState({ refreshing: false })
            Alert.alert("An error has occurred,try later");
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                </SafeAreaView>

                <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View>
                <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View>
                <View style={{ backgroundColor: '#2A7862', paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginLeft: 16 }}>Competitions</Text>
                        <View style={{ flexDirection: 'row', marginRight: 7 }}>
                            <Pressable onPress={() => { this.props.navigation.navigate('Notification') }}>
                                <Image style={{ tintColor: 'white', marginRight: 6 }} source={require('../../assets/Bell_light.png')} />
                            </Pressable>

                            <Pressable onPress={() => { this.props.navigation.navigate('Settings') }}>
                                <Image style={{ tintColor: 'white', marginRight: 6 }} source={require('../../assets/Setting_line_light.png')} />
                            </Pressable>

                            <Pressable onPress={() => { this.props.navigation.navigate('Profile') }}>
                                {
                                    this.state.userData.image == null ?
                                        <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={require('../../assets/user.png')} />
                                        :
                                        <ImageBackground
                                            source={{
                                                uri: `data:image/png;base64,${this.state.userData.image}`

                                            }}
                                            style={{ height: 30, width: 30, }}
                                            imageStyle={{ borderRadius: 15 }}
                                        >
                                        </ImageBackground>
                                }
                                {/* <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={require('../../assets/user.png')} /> */}
                            </Pressable>
                        </View>

                    </View>
                    <Text style={{ color: '#CCDFD9', fontWeight: 'bold', fontSize: 14, marginTop: 10, alignSelf: 'flex-start', marginLeft: 16, marginBottom: 7 }}>Discover competitions nearby based on your location or other preferences</Text>
                </View>

                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 30, paddingLeft: 18, marginTop: 20, alignItems: 'center',justifyContent:'space-between' }}>
                    
                    <Pressable style={{flexDirection:'row',alignItems:'center'}} onPress={() => { this.showFilter() }}>
                    <Text style={{ color: '#546881' }}>Filter (2) </Text>
                        <Image source={require('../../assets/Filter_alt.png')} />
                    </Pressable>
                    <Button  uppercase={false} mode="contained" onPress={() => { this.props.navigation.navigate("MyCompetitions") }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>My Competitions</Button>

                </View>
                {/* <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 30, paddingLeft: 18, marginTop: 20, alignItems: 'center' }}> */}
                    {/* <Text style={{ color: '#546881' }}>My Competitions</Text> */}
                    {/* <Pressable onPress={() => { this.showFilter() }}>
                        <Image source={require('../../assets/Filter_alt.png')} />
                    </Pressable> */}
                   
                {/* </View> */}

                {/* #########  competitions view */}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>


                    {/* { */}
                    {/* this.state.competition_length === 0 ? */}
                    {/* <Text style={{ fontSize: 18, color: '#546881', fontWeight: '500' }}>No competitions posted yet</Text> : */}
                    <View>
                        {/* <FlatList
                                    data={this.state.userData.competition}
                                    renderItem={({ item }) => <CompetitionsView item={item} navigation={this.props.navigation} />}
                                    showsVerticalScrollIndicator={false}
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.updateUserData}
                                /> */}
                        {
                            this.state.competition_length > 0 ?
                                <FlatList
                                    data={this.state.followingUsersCompetitions}
                                    renderItem={({ item }) => <CompetitionsView item={item} navigation={this.props.navigation} />}
                                    showsVerticalScrollIndicator={false}
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.updateUserData}
                                /> :
                                <FlatList
                                    data={this.state.demoData}
                                    renderItem={({ item }) =>

                                        <View style={{ flex: 1, marginTop: 200, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                            <Text style={{ fontSize: 18, color: '#546881', fontWeight: '500' }}>No Competitions Posted Yet</Text>
                                            {/* <Text style={{ textAlign: 'center', marginTop: 8, color: '#546881', fontSize: 14 }}>To see the competitions posted by other golfers, start following more people</Text> */}
                                            {/* <Button uppercase={false} mode="contained" onPress={() => {  }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>Find Friends</Button> */}
                                        </View>

                                    }
                                    showsVerticalScrollIndicator={false}
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.updateUserData}

                                />

                        }

                    </View>


                    {/* } */}

                </View>


                <Pressable onPress={() => { this.createCompetition() }} style={{ position: 'absolute', borderRadius: 29, backgroundColor: '#2A7862', padding: 16, bottom: 13, right: 16 }}>
                    <Icon color={"white"} name="plus" size={25} />
                </Pressable>

                <Modal
                    animationType="slide"
                    backdropOpacity={0.3}

                    //backdropColor={"black"}

                    isVisible={this.state.showModal}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView showsVerticalScrollIndicator={false}>


                                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 50, marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, color: '#1D242D' }}>Search Competitions</Text>
                                    <Pressable onPress={() => { this.setState({ showModal: false }) }}>
                                        <Image style={{ alignSelf: 'flex-end' }} source={require('../../assets/Close_round.png')} />
                                    </Pressable>
                                </View>

                                <Text style={styles.textTitle}>Zip code</Text>
                                <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ zipcode: text }) }} value={this.state.zipcode} placeholder={"Enter zip"}></TextInput>

                                <Text style={styles.textTitle}>Miles away</Text>

                                <Slider
                                    maximumValue={100}
                                    minimumValue={0}
                                    minimumTrackTintColor="#2A7862"
                                    maximumTrackTintColor="#ccc"
                                    step={1}
                                    tapToSeek={true}
                                    value={this.state.miles_away}
                                    onValueChange={
                                        (sliderValue) => this.setState({ miles_away: sliderValue })
                                    }
                                    thumbTintColor="white"


                                    style={{ width: Dimensions.get('screen').width - 50, height: 20, marginTop: 7 }}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text >{this.state.miles_away} mile</Text>
                                </View>


                                <Text style={styles.textTitle}>Handicap</Text>

                                <Slider
                                    maximumValue={100}
                                    minimumValue={0}
                                    minimumTrackTintColor="#2A7862"
                                    maximumTrackTintColor="#ccc"
                                    step={1}
                                    tapToSeek={true}
                                    value={this.state.handicap}
                                    onValueChange={
                                        (sliderValue) => this.setState({ handicap: sliderValue })
                                    }
                                    thumbTintColor="white"


                                    style={{ width: Dimensions.get('screen').width - 50, height: 20, marginTop: 7 }}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text >{this.state.handicap} HCP</Text>
                                </View>






                                <Text style={styles.textTitle}>Age </Text>

                                <Slider
                                    maximumValue={100}
                                    minimumValue={0}
                                    minimumTrackTintColor="#2A7862"
                                    maximumTrackTintColor="#ccc"
                                    step={1}
                                    tapToSeek={true}
                                    value={this.state.age}
                                    onValueChange={
                                        (sliderValue) => this.setState({ age: sliderValue })
                                    }
                                    thumbTintColor="white"


                                    style={{ width: Dimensions.get('screen').width - 50, height: 20, marginTop: 7 }}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text >{this.state.age} yrs</Text>
                                </View>




                                <Text style={styles.textTitle}>Gender</Text>



                                {
                                    this.state.genderCount === "0" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ genderCount: "1" }); this.setState({ gender: "Male" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Male</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ genderCount: "2" }); this.setState({ gender: "Female" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text>Female</Text>
                                        </Pressable>
                                    </View>)
                                }

                                {
                                    this.state.genderCount === "1" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ genderCount: "1" }); this.setState({ gender: "Yes" }) }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Male</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ genderCount: "2" }); this.setState({ gender: "No" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text >Female</Text>
                                        </Pressable>
                                    </View>)
                                }
                                {
                                    this.state.genderCount === "2" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ genderCount: "1" }); this.setState({ gender: "Male" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Male</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ genderCount: "2" }); this.setState({ gender: "Female" }) }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Female</Text>
                                        </Pressable>
                                    </View>)
                                }



                                <Text style={styles.textTitle}>Betting</Text>


                                {
                                    this.state.countBetting === "0" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ countBetting: "1" }); this.setState({ betting: "Yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countBetting: "2" }); this.setState({ betting: "No" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text>No</Text>
                                        </Pressable>
                                    </View>)
                                }

                                {
                                    this.state.countBetting === "1" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ countBetting: "1" }); this.setState({ betting: "Yes" }) }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countBetting: "2" }); this.setState({ betting: "No" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text >No</Text>
                                        </Pressable>
                                    </View>)
                                }
                                {
                                    this.state.countBetting === "2" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ countBetting: "1" }); this.setState({ betting: "Yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countBetting: "2" }); this.setState({ betting: "No" }) }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>No</Text>
                                        </Pressable>
                                    </View>)
                                }


                                <Text style={styles.textTitle}>Drinking</Text>


                                {
                                    this.state.countDrinking === "0" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countDrinking: "1" }); this.setState({ drinking: "Yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countDrinking: "2" }); this.setState({ drinking: "No" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text>No</Text>
                                        </Pressable>
                                    </View>)
                                }

                                {
                                    this.state.countDrinking === "1" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countDrinking: "1" }); this.setState({ drinking: "Yes" }) }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countDrinking: "2" }); this.setState({ drinking: "No" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text >No</Text>
                                        </Pressable>
                                    </View>)
                                }
                                {
                                    this.state.countDrinking === "2" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countDrinking: "1" }); this.setState({ drinking: "Yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countDrinking: "2" }); this.setState({ drinking: "No" }) }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>No</Text>
                                        </Pressable>
                                    </View>)
                                }

                                <Text style={styles.textTitle}>Smoking</Text>


                                {
                                    this.state.countSmoking === "0" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ countSmoking: "1" }); this.setState({ smoking: "Yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countSmoking: "2" }); this.setState({ smoking: "No" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text>No</Text>
                                        </Pressable>
                                    </View>)
                                }

                                {
                                    this.state.countSmoking === "1" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countSmoking: "1" }); this.setState({ smoking: "Yes" }) }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countSmoking: "2" }); this.setState({ smoking: "No" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text >No</Text>
                                        </Pressable>
                                    </View>)
                                }
                                {
                                    this.state.countSmoking === "2" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countSmoking: "1" }); this.setState({ smoking: "Yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countSmoking: "2" }); this.setState({ smoking: "No" }) }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>No</Text>
                                        </Pressable>
                                    </View>)
                                }



                                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                                    <Pressable style={{ marginTop: 15, marginLeft: 6, paddingLeft: 54, paddingRight: 54, paddingBottom: 10, paddingTop: 10, backgroundColor: '#2A7862', borderRadius: 10 }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Show Results</Text>
                                    </Pressable>
                                    <Pressable style={{ marginTop: 15, paddingLeft: 24, paddingRight: 24, paddingBottom: 10, paddingTop: 10, backgroundColor: '#fff', borderRadius: 5 }}>
                                        <Text style={{ color: 'black' }}>Clear</Text>
                                    </Pressable>

                                </View>
                                {/* <Button onPress={() => { this.setState({ showModal: false }) }} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold' }} style={styles.loginButton}>Log In</Button> */}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

            </View>

        )
    }

}

export default CompetitionScreen

const styles = StyleSheet.create({
    background: {
        flex: 0.22,
        // borderBottomRightRadius: 30,
        //borderBottomLeftRadius: 30,
        // backgroundColor:"#253f9e",
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        //position:'absolute',
        //left:30,
        //right:30,
        //top:120,
        //bottom:100,
        borderRadius: 10,
        padding: 16,
        //paddingTop:100,
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
        //width: '100%',
        // padding: 15,
    },
    modalView: {
        //margin: 20,
        width: Dimensions.get('window').width,
        backgroundColor: "white",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        // borderRadius: 20,
        // padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        // shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    textInputCountry: {
        height: 40,
        marginTop: 10,
        borderWidth: 1,
        padding: 5,
        fontSize: 16,
        borderColor: 'black',
        borderRadius: 2,
        width: '25%'
    },
    textTitle: {
        color: '#090B0E',
        marginTop: 14,
        fontSize: 16,
        alignSelf: 'flex-start'
        // fontFamily:'Neue Haas Unica'
    },
    loginButton: {
        alignSelf:'flex-end',
        //position:'relative',
        //marginBottom: 70,
        //right:0,
        //alignSelf:'flex-end',
        width: '60%',
        borderRadius: 10,
        // marginTop: 300,
        backgroundColor: '#2A7862',
        // color:'white',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 2,
        //top: 20,
    },
})