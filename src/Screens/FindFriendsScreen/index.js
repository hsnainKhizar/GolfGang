import { View, Text, SafeAreaView,ActivityIndicator, Image, ScrollView,ImageBackground, FlatList, TextInput, Dimensions, Alert, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Modal from "react-native-modal";
import axios from 'axios';
import { Button, RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
import SearchFriendsView from '../../Components/SearchFriendsView';
import Slider from '@react-native-community/slider';
const baseUrl = 'https://golfgang.indexideaz.tech/api';
import AsyncStorage from '@react-native-async-storage/async-storage'
//import { ScrollView } from 'react-native-gesture-handler';
 
class FindFriendsScreen extends Component {



    constructor(props) {
        super(props)
        let searchData = []
        this.state = {
            showModal: false,
            zipcode: "",
            userData: [],
            miles_away: 0,
            handicap: 0,
            age: 0,
            gender: "",
            betting: "",
            drinking: "",
            smoking: "",
            countBetting: "0",
            countDrinking: "0",
            countSmoking: "0",
            genderCount: "0",
            users: [],
            showFriends: false,
            searchData: [],
            followers: [],
            loader: false,

        }
    }

    getAllUsers = async () => {
        this.setState({loader: true})
        try {
            const response = await axios.get(`${baseUrl}/user`, {

            });
            // console.log(response.data)

            if (response.status === 200) {
                this.setState({loader: false})
                
                this.setState({ users: response.data })
                // console.log("all users", response.data);
            }
        } catch (error) {
            //setIndicator(false)
            this.setState({loader: false})
            console.log(error)
            Alert.alert("An error has occurred,try later");
        }
    }

    resetValues = ()=>{

        this.setState({ zipcode: ""})
        this.setState({ miles_away: 0 })
        this.setState({ handicap: 0 })
        this.setState({  age: 0})
        this.setState({ gender: ""})
        this.setState({betting: ""})
        this.setState({   drinking: "" })
        this.setState({  smoking: "" })
        this.setState({ countBetting: "0"})
        this.setState({  countDrinking: "0"})
        this.setState({  countSmoking: "0" })
        this.setState({ genderCount: "0"})
        // this.setState({ showModal: false })

    }

    searchFriends = () => {
        console.log("zip", this.state.age);
        let zipcode = this.state.zipcode
        let miles_away = this.state.miles_away
        let handicap = this.state.handicap
        let age = this.state.age
        let gender = this.state.gender
        let betting = this.state.betting
        let drinking = this.state.drinking
        let smoking = this.state.smoking
        this.searchData = { zipcode, miles_away, handicap, age, gender, betting, drinking, smoking }
        this.getAllUsers()
        this.setState({ showFriends: true })
        this.setState({ showModal: false })

        //this.setState({ searchData: data })
        // console.log("searchData", this.searchData);


    } 
    fetchdata = async () => {

        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                // console.log("data",CartValue[0][0][0]);
                this.setState({ userData: CartValue[0].user })
               // this.setState({ allposts: CartValue[0][1] })
                //  this.setState({ userData: CartValue[0][1]})
                this.setState({ followers: this.state.followers })
               // console.log("posts", this.state.userData);

                //console.log(userInfo[0][0].id)
            }
        })

        //  let postArray = this.state.userData.post

        //  postArray.map((val,i)=>{
        //     this.setState(prevState => ({
        //         allposts: [val, ...prevState.allposts]
        //       }))
        // })
        // console.log("all",this.state.allposts);

        // console.log("follow ids",followIDs);





        // console.log("userDetail", this.state.userData.id);
    }


    componentDidMount() {
       // this.getAllUsers()
        this.fetchdata()
    }

    showFilter = () => {

        this.setState({ showModal: true })
       
        
        
    }

    render() {

        if (this.state.loader === true) {
            return (
              <View style={{backgroundColor:'#2A7862',alignItems:'center',justifyContent:'center',flex:1}}>
              <ActivityIndicator
                size="large"
                color="#fff"
                style={{}}
              />
              </View>
            )
          }
        return (
            <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                </SafeAreaView>

                <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View>
                <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View>

                <View style={{ backgroundColor: '#2A7862' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginLeft: 16 }}>Find Friends</Text>
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
                    <Text style={{ color: '#CCDFD9', fontWeight: 'bold', fontSize: 14, marginTop: 10, alignSelf: 'flex-start', marginLeft: 16, marginBottom: 7 }}>Based on your preferences, we think you might be interested in following more golfers</Text>
                </View>

                <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}>
                    <Text style={{ color: '#546881' }}>Filter </Text>
                    <Pressable onPress={() => { this.showFilter() }}>
                        <Image source={require('../../assets/Filter_alt.png')} />
                    </Pressable>
                </View>


                {/* $$$$$$$$$$$$find friend's view */}
 
                {
                    this.state.showFriends === false ?
                        <View style={{ flex: 1,backgroundColor:'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#546881', fontWeight: '500' }}>Search to add friends.</Text>
                        </View> :
                        <FlatList
                            data={this.state.users}
                            renderItem={({ item }) =>


                                <SearchFriendsView item={item} navigation={this.props.navigation} searchData = {this.searchData} />



                            }
                            showsVerticalScrollIndicator={false}
                        />
                }

                {/* <SearchFriendsView />  */}


                <Modal
                    //  animationType="slide"
                    backdropOpacity={0.3}
                    isVisible={this.state.showModal}

                >

                    <View style={styles.centeredView}>


                        <View style={styles.modalView}>
                            <ScrollView showsVerticalScrollIndicator={false}>



                                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 50, marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, color: '#1D242D' }}>Filter Friends</Text>
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
                                    thumbTintColor="#2A7862"


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
                                    thumbTintColor="#2A7862"


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
                                    thumbTintColor="#2A7862"


                                    style={{ width: Dimensions.get('screen').width - 50, height: 20, marginTop: 7 }}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text >{this.state.age} yrs</Text>
                                </View>




                                <Text style={styles.textTitle}>Gender</Text>



                                {
                                    this.state.genderCount === "0" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ genderCount: "1" }); this.setState({ gender: "male" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Male</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ genderCount: "2" }); this.setState({ gender: "female" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text>Female</Text>
                                        </Pressable>
                                    </View>)
                                }

                                {
                                    this.state.genderCount === "1" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ genderCount: "1" }); this.setState({ gender: "male" }) }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Male</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ genderCount: "2" }); this.setState({ gender: "female" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text >Female</Text>
                                        </Pressable>
                                    </View>)
                                }
                                {
                                    this.state.genderCount === "2" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ genderCount: "1" }); this.setState({ gender: "male" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Male</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ genderCount: "2" }); this.setState({ gender: "female" }) }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Female</Text>
                                        </Pressable>
                                    </View>)
                                }



                                <Text style={styles.textTitle}>Betting</Text>


                                {
                                    this.state.countBetting === "0" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ countBetting: "1" }); this.setState({ betting: "yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countBetting: "2" }); this.setState({ betting: "no" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text>No</Text>
                                        </Pressable>
                                    </View>)
                                }

                                {
                                    this.state.countBetting === "1" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ countBetting: "1" }); this.setState({ betting: "yes" }) }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countBetting: "2" }); this.setState({ betting: "no" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text >No</Text>
                                        </Pressable>
                                    </View>)
                                }
                                {
                                    this.state.countBetting === "2" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ countBetting: "1" }); this.setState({ betting: "yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countBetting: "2" }); this.setState({ betting: "no" }) }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>No</Text>
                                        </Pressable>
                                    </View>)
                                }


                                <Text style={styles.textTitle}>Drinking</Text>


                                {
                                    this.state.countDrinking === "0" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countDrinking: "1" }); this.setState({ drinking: "yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countDrinking: "2" }); this.setState({ drinking: "no" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text>No</Text>
                                        </Pressable>
                                    </View>)
                                }

                                {
                                    this.state.countDrinking === "1" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countDrinking: "1" }); this.setState({ drinking: "yes" }) }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countDrinking: "2" }); this.setState({ drinking: "no" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text >No</Text>
                                        </Pressable>
                                    </View>)
                                }
                                {
                                    this.state.countDrinking === "2" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countDrinking: "1" }); this.setState({ drinking: "yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countDrinking: "2" }); this.setState({ drinking: "no" }) }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>No</Text>
                                        </Pressable>
                                    </View>)
                                }

                                <Text style={styles.textTitle}>Smoking</Text>


                                {
                                    this.state.countSmoking === "0" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-start' }}>
                                        <Pressable onPress={() => { this.setState({ countSmoking: "1" }); this.setState({ smoking: "yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countSmoking: "2" }); this.setState({ smoking: "no" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text>No</Text>
                                        </Pressable>
                                    </View>)
                                }

                                {
                                    this.state.countSmoking === "1" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countSmoking: "1" }); this.setState({ smoking: "yes" }) }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countSmoking: "2" }); this.setState({ smoking: "no" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text >No</Text>
                                        </Pressable>
                                    </View>)
                                }
                                {
                                    this.state.countSmoking === "2" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countSmoking: "1" }); this.setState({ smoking: "yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countSmoking: "2" }); this.setState({ smoking: "no" }) }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>No</Text>
                                        </Pressable>
                                    </View>)
                                }



                                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                                    <Pressable onPress={() => { this.searchFriends() }} style={{ marginTop: 15, marginLeft: 6, paddingLeft: 54, paddingRight: 54, paddingBottom: 10, paddingTop: 10, backgroundColor: '#2A7862', borderRadius: 10 }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Show Results</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { this.resetValues() }} style={{ marginTop: 15, paddingLeft: 24, paddingRight: 24, paddingBottom: 10, paddingTop: 10, backgroundColor: '#fff', borderRadius: 5 }}>
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

export default FindFriendsScreen
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
    passTextInput: {
        height: 40,
        //marginTop:10,
        // borderWidth:1,
        padding: 10,
        backgroundColor: '#F2F4F7',
        fontSize: 16,
        borderColor: 'black',
        borderRadius: 5,
        width: '95%'
    },
    textInput: {
        height: 40,
        marginTop: 14,
        //borderWidth: 1,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#F2F4F7',
        borderColor: 'black',
        borderRadius: 2,
        width: Dimensions.get('screen').width - 50
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
        alignSelf: 'center',
        //position:'relative',
        marginBottom: 70,
        //right:0,
        //alignSelf:'flex-end',
        width: '100%',
        borderRadius: 10,
        // marginTop: 300,
        backgroundColor: '#2A7862',
        // color:'white',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 2,
        top: 20,
    },
})