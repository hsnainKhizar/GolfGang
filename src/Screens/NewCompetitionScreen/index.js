import { Text, View, SafeAreaView, Image, ImageBackground, TouchableWithoutFeedback, Alert, ScrollView, Dimensions, Pressable, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage'
// import {  } from 'react-native-gesture-handler'
import { Button, RadioButton } from 'react-native-paper'
import Slider from '@react-native-community/slider';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import CalendarPicker from 'react-native-calendar-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';

const baseUrl = 'https://golfgang.indexideaz.tech/api';

export class NewCompetitionScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            userData: [],
            name: "",
            image: "",
            golf_course: "",
            com_date: "",
            format: "",
            handicap: "",
            limitations: 0,
            no_shorts: 0,
            buy_in_cost: "",
            buy_in_cost_amount: 0,
            first_price: 0,
            second_price: 0,
            third_prize: 0,
            countCompetitionFormate: "0",
            countHandicap: "0",
            countCost: "0",
            countShots: "0",
            loader: false,

        }
    }

    createCompetition = async () => {

        let fcm = await AsyncStorage.getItem('fcmToken')

        this.setState({ loader: true })
        let user_id = this.state.userData.id
        let image = this.state.image
        let name = this.state.name
        let golf_course = this.state.golf_course
        let com_date = this.state.com_date
        let format = this.state.format
        let handicap = this.state.handicap
        let limitations = this.state.limitations
        let no_shorts = this.state.no_shorts
        let buy_in_cost = this.state.buy_in_cost
        let buy_in_cost_amount = this.state.buy_in_cost_amount
        let first_price = this.state.first_price
        let second_price = this.state.second_price
        let third_price = this.state.third_prize
        let status = "active"
        let id = user_id
        let message = "Added an new competition"
        let title = this.state.userData.name

        console.log("id", user_id);
        console.log("id", name);
        console.log("id", golf_course);
        console.log("id", com_date);
        console.log("id", format);
        console.log("id", handicap);
        console.log("id", limitations);
        console.log("id", no_shorts);
        console.log("id", buy_in_cost);
        console.log("id", buy_in_cost_amount);
        console.log("id", first_price);
        console.log("id", second_price);
        console.log("id", third_price);

        try {
            const response = await axios.post(`${baseUrl}/competition`, {
                user_id,
                image,
                name,
                golf_course,
                com_date,
                format,
                handicap,
                limitations,
                no_shorts,
                buy_in_cost,
                buy_in_cost_amount,
                first_price,
                second_price,
                third_price,
                status,
            });
            // console.log(response.data)

            if (response.status === 200) {

                try {
                    const response = await axios.post(`${baseUrl}/notifications`, {
                        id,
                        message,
                        title
                    });
                    //  console.log(response.data)

                    if (response.status === 200) {
                        console.log("notification send")
                    }
                } catch (error) {

                    console.log("notification error", error)
                }
                this.updateUserData()

                // console.log("all users", response.data);
            }
        } catch (error) {
            //setIndicator(false)
            console.log(error)
            this.setState({ loader: false })
            Alert.alert("An error has occurred,try later");
        }
    }

    choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            // width: Dimensions.get('window').width - 40,
            // height: 300,
            // cropping: true,
            // compressImageQuality: 0.7,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            this.setState({ image: imageUri })


            // console.log("id", this.props.route.params.id);
            //this.setState({ imageChanger: true })
            this.convertImage()


        });
        // console.log(image)
        //setImage(image)
        //setImageUrl(image)

    };

    convertImage = async () => {
        console.log("imagefinal", this.state.image);
        // console.log("url",this.state.imageLink);
        const resizedImage = await ImageResizer.createResizedImage(this.state.image, 500, 500, 'PNG', 100, 0, RNFS.DocumentDirectoryPath);
        const base64 = await RNFS.readFile(resizedImage.uri, 'base64');
        //console.log("base",base64)
        this.setState({ image: base64 })
        // this.props.route.params.image = this.state.imageLink
        //  let data = await
    }

    getLoginUserData = async () => {
        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                this.setState({ userData: CartValue[0].user })
                this.setState({ postsLength: this.state.userData.post.length })
                console.log("login user id", this.state.userData.id);
                //console.log(userInfo[0][0].id)
            }
        })
    }

    componentDidMount() {
        this.getLoginUserData()
    }

    updateUserData = async () => {



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
                console.log("new data", response.data);

                let userDetail = response.data

                AsyncStorage.getItem('userData').then((datacart) => {
                    // console.log(datacart)
                    if (datacart !== null) {
                        const cart = JSON.parse(datacart)
                        cart.push(userDetail)
                        AsyncStorage.setItem('userData', JSON.stringify(cart))
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
                this.setState({ loader: false })
                Alert.alert("Competition created successfully")
                this.props.navigation.goBack()
                //navigation.replace('WelcomeScreen')
            }
        } catch (error) {
            //setIndicator(false)
            this.setState({ loader: false })
            console.log(error)
            Alert.alert("An error has occurred,try later");
        }
    }

    dropDownUnit = (value) => {
        this.setState({ format: value })
        console.log(this.state.format);

    }
    setCurrentDate = (date) => {
        // date = setDate(new Date())
        //date = minDate
        //  setMonth(moment(date).format("MMMM"))
        // setDate( moment(date).format("MM-DD-YYYY"))
        this.setState({ showModal: false })
        this.setState({ com_date: moment(date).format("MM-DD-YYYY") })
        //navigation.navigate("TimeTable")
        console.log(this.state.com_date)
    }



    render() {
        // const {showModal} = this.state
        return (
            // <TouchableWithoutFeedback onPress={() => { this.setState({ showModal: false }) }}>
                <View style={{ backgroundColor: 'white', flex: 1 }}>

                  

                        <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                        </SafeAreaView>

                        <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon onPress={() => { this.props.navigation.goBack() }} style={{ marginLeft: 10 }} color={"white"} name="chevron-left" size={25} />
                            </View>
                            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>New Competition</Text>
                        </View>

                        <ScrollView style={{ paddingBottom: 10 }} showsVerticalScrollIndicator={false}>
                            <View style={{ padding: 10, marginLeft: 16 }}>
                                <Text style={styles.textTitle}>Cover Image</Text>

                                <Pressable onPress={() => { this.choosePhotoFromLibrary(); }}>

                                    {
                                        this.state.image === "" ?
                                            <Image style={{ height: 200, marginTop: 14, width: Dimensions.get('window').width - 40, borderRadius: 8, }} source={require('../../assets/demoComp.jpg')} />
                                            :
                                            <ImageBackground
                                                source={{
                                                    uri: `data:image/png;base64,${this.state.image}`

                                                }}
                                                style={{ height: 200, marginTop: 14, width: Dimensions.get('window').width - 40, }}
                                                imageStyle={{ borderRadius: 8 }}
                                            >
                                            </ImageBackground>
                                    }

                                    {/* <Image style={{ width: Dimensions.get('window').width - 30, height: 300, borderRadius: 8 }} source={require('../../assets/Photo.png')} /> */}
                                </Pressable>

                                <Text style={styles.textTitle}>Competition Name</Text>
                                <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ name: text }) }} value={this.state.name} placeholder={"Enter Name"}></TextInput>
                                <Text style={styles.textTitle}>Golf Course</Text>
                                <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ golf_course: text }) }} value={this.state.golf_course} placeholder={"Select Course"}></TextInput>
                                <Text style={styles.textTitle}>Date Of Competition</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, backgroundColor: '#F2F4F7' }}>
                                    <TextInput style={styles.passTextInput} onChangeText={(text) => { this.setState({ com_date: text }) }} value={this.state.com_date} placeholder={"Select Date"}></TextInput>

                                    <Icon onPress={() => { this.setState({ showModal: true }); }} name="calendar" size={17} />
                                </View>


                                {/* <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ com_date: text }) }} value={this.state.com_date} placeholder={"Select Date"}></TextInput> */}

                                <Text style={styles.textTitle}>Competition Formate</Text>

                                <View style={{ flexDirection: 'row', backgroundColor: 'white', backgroundColor: '#F2F4F7', borderRadius: 4, alignItems: 'center', marginTop: 7 }}>
                                    {/* <TextInput style={styles.textInputType} placeholder={"type"} ></TextInput> */}
                                    {/* <ModalDropdown style={{padding:16}} options={['option 1', 'option 2']}/> */}
                                    <ModalDropdown dropdownTextStyle={{ fontSize: 16, color: 'black' }} style={{ padding: 12 }} dropdownStyle={{ width: Dimensions.get('screen').width - 100, backgroundColor: '#F2F4F7', }} onSelect={(indx, value) => { this.dropDownUnit(value) }}
                                        options={[
                                            'Stroke Play',
                                            'Match Play',
                                            'Scramble',
                                            'Best Ball',
                                            'Alternate Shot',
                                            'Six-Six-Six',
                                            'Wolf',
                                            'Bingo, Bango, Bongo',
                                            'Vegas',
                                            'Skins',
                                            'Stableford',
                                            'Nassau',
                                            'TBD based on turnout',
                                            'Other',
                                        ]}


                                    >
                                        {/* <Text>Select Truck Type</Text> */}
                                    </ModalDropdown>

                                    {/* <Icon onPress={() => {dropDownMenu()}} name="chevron-down" size={17} /> */}


                                </View>




                                <Text style={styles.textTitle}>Handicap required</Text>

                                {
                                    this.state.countHandicap === "0" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countHandicap: "1" }); this.setState({ handicap: "Yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countHandicap: "2" }); this.setState({ handicap: "No" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text>No</Text>
                                        </Pressable>
                                    </View>)
                                }

                                {
                                    this.state.countHandicap === "1" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countHandicap: "1" }); this.setState({ handicap: "Yes" }) }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countHandicap: "2" }); this.setState({ handicap: "No" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text >No</Text>
                                        </Pressable>
                                    </View>)
                                }
                                {
                                    this.state.countHandicap === "2" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countHandicap: "1" }); this.setState({ handicap: "Yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countHandicap: "2" }); this.setState({ handicap: "No" }) }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>No</Text>
                                        </Pressable>
                                    </View>)
                                }








                                <Text style={styles.textTitle}>Handicap Limitation</Text>

                                <Slider
                                    maximumValue={100}
                                    minimumValue={0}
                                    minimumTrackTintColor="#2A7862"
                                    maximumTrackTintColor="#ccc"
                                    step={1}
                                    tapToSeek={true}
                                    value={this.state.limitations}
                                    onValueChange={
                                        (sliderValue) => this.setState({ limitations: sliderValue })
                                    }
                                    thumbTintColor="#2A7862"


                                    style={{ width: Dimensions.get('screen').width - 40, height: 20, marginTop: 7 }}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text >{this.state.limitations} HCP</Text>
                                </View>


                                <Text style={styles.textTitle}>Buy In Cost</Text>


                                {
                                    this.state.countCost === "0" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countCost: "1" }); this.setState({ buy_in_cost: "Yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countCost: "2" }); this.setState({ buy_in_cost: "No" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text>No</Text>
                                        </Pressable>
                                    </View>)
                                }

                                {
                                    this.state.countCost === "1" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countCost: "1" }); this.setState({ buy_in_cost: "Yes" }) }} style={{ backgroundColor: '#2A7862', padding: 10 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countCost: "2" }); this.setState({ buy_in_cost: "No" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                                            <Text >No</Text>
                                        </Pressable>
                                    </View>)
                                }
                                {
                                    this.state.countCost === "2" &&
                                    (<View style={{ flexDirection: 'row', marginTop: 10, alignSelf: "flex-start" }}>
                                        <Pressable onPress={() => { this.setState({ countCost: "1" }); this.setState({ buy_in_cost: "Yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                                            <Text>Yes</Text>
                                        </Pressable>

                                        <Pressable onPress={() => { this.setState({ countCost: "2" }); this.setState({ buy_in_cost: "No" }) }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>No</Text>
                                        </Pressable>
                                    </View>)
                                }


                                {/* $$$$$$$$$$$if buy in cost  */}
                                {
                                    this.state.buy_in_cost === "Yes" && (
                                        <View>
                                            <Text style={styles.textTitle}>Buy In Cost</Text>
                                            <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ buy_in_cost_amount: text }) }} value={this.state.buy_in_cost_amount} placeholder={"$ Amount"}></TextInput>
                                            {/* <Text style={styles.textTitle}>1st prize</Text>
                    <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ first_price: text }) }} value={this.state.first_price} placeholder={"$ Amount"}></TextInput>
                    <Text style={styles.textTitle}>2nd prize</Text>
                    <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ second_price: text }) }} value={this.state.second_price} placeholder={"$ Amount"}></TextInput>
                    <Text style={styles.textTitle}>3rd prize</Text>
                    <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ third_prize: text }) }} value={this.state.third_prize} placeholder={" $ Amount"}></TextInput> */}
                                        </View>
                                    )
                                }


                                <Button uppercase={false} mode="contained" onPress={() => { this.createCompetition() }} loading={this.state.loader} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>Create Competition</Button>

                            </View>
                        </ScrollView>
                        <Modal
                            // animationType="slide"
                            backdropOpacity={0.3}
                            // pres={()=>{this.setState({showModal: false})}}
                            isVisible={this.state.showModal}

                        >
                            <TouchableWithoutFeedback onPress={() => {
                                this.setState({ showModal: false })
                                // setShowModal(false) 
                                // setModalVisible(!showModal);
                            }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <View style={styles.calendar}>
                                            <CalendarPicker

                                                //maxDate={maxDate}
                                                width={Dimensions.get('screen').width - 45}
                                                onDateChange={this.setCurrentDate}
                                            />
                                            {/* <Text>{date}</Text> */}
                                        </View>

                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>


                  




                </View>
            // </TouchableWithoutFeedback>

        )
    }
}

export default NewCompetitionScreen

const styles = StyleSheet.create({
    background: {
        flex: 0.22,
        // borderBottomRightRadius: 30,
        //borderBottomLeftRadius: 30,
        // backgroundColor:"#253f9e",
    },
    calendar: {
        //flex: 1,
        flexDirection: 'row',
        backgroundColor: '#eaf3ec',
        // borderTopRightRadius: 40,
        // borderTopLeftRadius: 40,
        marginTop: 20,

        //position:'absolute',
        //left:30,
        //right:30,
        //top:120,
        //bottom:100,
        borderRadius: 10,
        padding: 10,
        //paddingTop:100,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        // borderTopRightRadius: 40,
        // borderTopLeftRadius: 40,
        //position:'absolute',
        //left:30,
        //right:30,
        //top:120,
        //bottom:100,
        borderRadius: 10,
        padding: 16,
        //paddingTop:100,
    },
    passTextInput: {
        height: 40,
        //marginTop:10,
        // borderWidth:1,
        padding: 10,
        fontSize: 16,
        borderColor: 'black',
        borderRadius: 5,
        width: '90%'
    },
    textInput: {
        height: 40,
        marginTop: 14,
        //borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderColor: 'black',
        backgroundColor: '#F2F4F7',
        borderRadius: 2,
        width: '100%'
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
        color: 'black',
        marginTop: 14,
        fontSize: 13,
        // fontFamily:'Neue Haas Unica'
    },
    loginButton: {
        alignSelf: 'center',
        // position:'absolute',
        //bottom:0,
        //right:0,
        // alignSelf:'flex-end',
        width: '80%',
        // paddingBottom:17,
        borderRadius: 10,
        marginBottom: 20,
        //marginTop: 300,
        backgroundColor: '#2A7862',
        // color:'white',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 2,
        top: 20,
    },
})