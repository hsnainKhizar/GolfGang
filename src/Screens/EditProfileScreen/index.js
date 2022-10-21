import { Text, View, SafeAreaView, Image, Dimensions, ImageBackground, Pressable, Alert, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import PagerView from 'react-native-pager-view';
import { Button, RadioButton } from 'react-native-paper'
import axios from 'axios';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import Slider from '@react-native-community/slider';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'

const baseUrl = 'https://golfgang.indexideaz.tech/api';

export class EditProfileScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      pageNumber: 0,
      email: "",
      // password,
      name: "",
      age: 0,
      gender: "",
      city: "",
      state: "",
      betting: "",
      drinking: "",
      handicap: 0,
      demoHandicap: 0,
      smoking: "",
      home_golf_course: "",
      job_type: "",
      hobby: "",
      location: "",
      countBetting: "",
      countDrinking: "",
      countSmoking: "",
      indicator: false,
      imageLink: "",
      imageChanger: false,

    }
  }

  setData = () => {
    this.setState({ email: this.props.route.params.email })
    // this.setState({password: this.props.route.params.password})
    this.setState({ name: this.props.route.params.name })
    this.setState({ age: this.props.route.params.age })
    this.setState({ gender: this.props.route.params.gender })
    this.setState({ city: this.props.route.params.city })
    this.setState({ state: this.props.route.params.state })
    this.setState({ betting: this.props.route.params.betting })
    this.setState({ handicap: parseInt(this.props.route.params.handicap) })
    this.setState({ imageLink: this.props.route.params.image })

    this.setState({ smoking: this.props.route.params.smoking })
    this.setState({ home_golf_course: this.props.route.params.home_golf_course })
    this.setState({ job_type: this.props.route.params.job_type })
    this.setState({ hobby: this.props.route.params.hobby })
    this.setState({ location: this.props.route.params.location })
    let betting = this.props.route.params.betting
    let drinking = this.props.route.params.drinking
    let smoking = this.props.route.params.smoking

    console.log("image", this.props.route.params.image);

    if (betting == "no") {
      this.setState({ countBetting: "2" })
    }
    if (betting == "yes") {
      this.setState({ countBetting: "1" })
    }

    if (drinking == "no") {
      this.setState({ countDrinking: "2" })
    }
    if (drinking == "yes") {
      this.setState({ countDrinking: "1" })
    }

    if (smoking == "no") {
      this.setState({ countSmoking: "2" })
    }
    if (smoking == "yes") {
      this.setState({ countSmoking: "1" })
    }
  }

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      this.setState({ imageLink: imageUri })


      console.log("id", this.props.route.params.id);
      this.setState({ imageChanger: true })
      this.convertImage()


    });
    // console.log(image)
    //setImage(image)
    //setImageUrl(image)

  };

  convertImage = async () => {
    console.log("imagefinal", this.state.imageLink);
    // console.log("url",this.state.imageLink);
    const resizedImage = await ImageResizer.createResizedImage(this.state.imageLink, 200, 80, 'PNG', 80, 0, RNFS.DocumentDirectoryPath);
    const base64 = await RNFS.readFile(resizedImage.uri, 'base64');
    //console.log("base",base64)
    this.setState({ imageLink: base64 })
    this.props.route.params.image = this.state.imageLink
    //  let data = await
  }

  uploadProfile = () => {
    this.setState({ loader: true })
    let data = new FormData();
    data.append('image', {
      uri: this.state.imageLink,
      type: "image/jpeg",
      name: "photo.jpg"
    })


    fetch(`${baseUrl}/user/${this.props.route.params.id}`, {
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data;"
      }
    })
      .then(response => {
        this.setState({ loader: false })
        this.setState({ imageChanger: true })
        //console.log("return", response.data);
        Alert.alert('Profile Updated')

      })
      .catch(err => {
        console.log("error", console.err);
        this.setState({ loader: false })
        this.setState({ imageChanger: false })

        Alert.alert('An error occured try again latter')
      })
  }



  componentDidMount() {
    console.log(this.props.route.params.id);
    this.setData()
  }



  updateData = async () => {

    this.setState({ indicator: true })

    let email = this.state.email
    let name = this.state.name
    let age = this.state.age
    let gender = this.state.gender
    let city = this.state.city
    let state = this.state.state
    let betting = this.state.betting
    let drinking = this.state.drinking

    let handicap = this.state.handicap
    let smoking = this.state.smoking
    let home_golf_course = this.state.home_golf_course
    let job_type = this.state.job_type
    let hobby = this.state.hobby
    let location = this.state.location
    let image = this.state.imageLink

    // this.setState({ loader: true })
    // let data = new FormData();
    // data.append('email', email)
    // data.append('name', name)
    // data.append('age', age)
    // data.append('gender', gender)
    // data.append('city', city)
    // data.append('state', state)
    // data.append('betting', betting)
    // data.append('drinking', drinking)
    // data.append('handicap', handicap)
    // data.append('smoking', smoking)
    // data.append('home_golf_course', home_golf_course)
    // data.append('job_type', job_type)
    // data.append('hobby', hobby)
    // data.append('location', location)
    // if (this.props.route.params.image !== null) {
    //   data.append('image', {
    //     uri: this.props.route.params.image,
    //     type: "image/jpeg",
    //     name: "photo.jpg"
    //   })
    // }

    // fetch(`${baseUrl}/user/${this.props.route.params.id}`, {
    //   method: "PUT",
    //   body: data,
    //   headers: {
    //     "Content-Type": "multipart/form-data;"
    //   }
    // })
    //   .then(response => {
    //     if (response.status == 200) {
    //       this.setState({ loader: false })
    //       // this.updateUserData()
    //       console.log("return", response.status);
    //       Alert.alert('Profile Updated')
    //     }else{
    //       this.setState({ loader: false })
    //       console.log("error", response);
    //     }

    //   })
    //   .catch(err => {
    //     this.setState({ loader: false })
    //     console.log("error", err);
    //    // this.setState({ loader: false })
    //     this.setState({ imageChanger: false })

    //     Alert.alert('An error occured try again latter')
    //   })


    try {
      const response = await axios.put(`${baseUrl}/user/${this.props.route.params.id}`, {
        name,
        age,
        gender,
        city,
        state,
        betting,
        drinking,
        handicap,
        smoking,
        home_golf_course,
        job_type,
        hobby,
        location,
        image 
      });
      if (response.status === 200) {
        this.setState({ loader: false })
        this.updateUserData()
      }
    } catch (error) {
      //setIndicator(false)
      console.log(error)
      Alert.alert("An error has occurred,try after some time");
    }
  }

  updateUserData = async () => {



    try {
      const response = await axios.get(`${baseUrl}/user/${this.props.route.params.id}`, {

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
        Alert.alert('Profile Updated')
        this.setState({ indicator: false })
        this.props.navigation.goBack()
        //navigation.replace('WelcomeScreen')
      }
    } catch (error) {
      //setIndicator(false)
      console.log(error)
      Alert.alert("An error has occurred,try later");
    }
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

        </SafeAreaView>


        {/* <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View> */}

        <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon onPress={() => { this.props.navigation.navigate.goBack() }} style={{ marginLeft: 10 }} color={"white"} onPress={() => { this.props.navigation.goBack() }} name="chevron-left" size={25} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Edit Profile</Text>

          <View style={{ flexDirection: 'row', marginLeft: 16, marginTop: 10 }}>
            <Pressable onPress={() => { this.setState({ pageNumber: 0 }) }}>
              <Text style={{ marginBottom: 10, color: this.state.pageNumber === 0 ? 'white' : '#CCDFD9', fontSize: 16, fontWeight: '400' }}>Profile</Text>
              {
                this.state.pageNumber === 0 && (
                  <View style={{ borderWidth: 1, width: 45, flexDirection: 'row', borderColor: 'white', bottom: 0, position: 'absolute' }}></View>
                )
              }
              {/* <View style={{ borderWidth: 1, width: 40, flexDirection: 'row', borderColor: 'white', bottom: 0, position: 'absolute' }}></View> */}
            </Pressable>
            <Pressable onPress={() => { this.setState({ pageNumber: 1 }) }} style={{ marginLeft: 12 }}>
              <Text style={{ color: this.state.pageNumber === 1 ? 'white' : '#CCDFD9', fontSize: 16, fontWeight: '400' }}>Golf Info</Text>
              {
                this.state.pageNumber === 1 && (
                  <View style={{ borderWidth: 1, width: 55, flexDirection: 'row', borderColor: 'white', bottom: 0, position: 'absolute' }}></View>
                )
              }

            </Pressable>
            <Pressable onPress={() => { this.setState({ pageNumber: 2 }) }} style={{ marginLeft: 12 }}>
              <Text style={{ color: this.state.pageNumber === 2 ? 'white' : '#CCDFD9', fontSize: 16, fontWeight: '400' }}>Other</Text>
              {
                this.state.pageNumber === 2 && (
                  <View style={{ borderWidth: 1, width: 40, flexDirection: 'row', borderColor: 'white', bottom: 0, position: 'absolute' }}></View>
                )
              }
              {/* <View style={{ borderWidth: 1, width: 40, flexDirection: 'row', borderColor: 'white', bottom: 0, position: 'absolute',  }}></View> */}
            </Pressable>


          </View>

        </View>

        {
          this.state.pageNumber === 0 && (
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>


                {
                  this.state.imageLink === null ?
                    <Image style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10, alignSelf: 'center' }} source={require('../../assets/user.png')} />
                    :
                    <ImageBackground
                      source={{
                        uri: `data:image/png;base64,${this.state.imageLink}`

                      }}
                      style={{ height: 100, width: 100 }}
                      imageStyle={{ borderRadius: 50 }}
                    >
                    </ImageBackground>
                }
                {/* {
                  this.props.route.params.image === null ?
                    <Pressable >
                      <Image style={{ width: 80, height: 80, borderRadius: 40 }} source={require('../../assets/user.png')} />
                    </Pressable> :

                    this.state.imageChanger === true ?

                      <ImageBackground
                        source={{
                          uri: `${this.state.imageLink}`

                        }}
                        style={{ height: 80, width: 80 }}
                        imageStyle={{ borderRadius: 40 }}
                      >
                      </ImageBackground>

                      :
                      <Pressable > 
                        <Image style={{ width: 80, height: 80, borderRadius: 40 }} source={{ uri: `https://golfgang.indexideaz.tech/public/postimage/${this.props.route.params.image}` }} />
                      </Pressable>



                } */}

                <Pressable onPress={() => { this.choosePhotoFromLibrary() }} style={{ padding: 8, borderWidth: 0.5, marginLeft: 15, borderRadius: 7, borderColor: '#007F6D' }}>
                  <Text style={{ color: '#007F6D' }}>Change Photo</Text>
                </Pressable>

                {/* <View style={{ marginLeft: 8 }}>
                            <Text style={{ color: '#000', fontWeight: '500' }}>Sophia </Text>
                            <Text style={{ color: '#546881', marginTop: 3 }}>Female 30s Trenton,NJ</Text>
                            <Text style={{ color: '#546881', marginTop: 3 }}>Joined 20 Aug 2022</Text>
                        </View> */}
              </View>

              <ScrollView>
                <View style={{ flexDirection: 'column', padding: 16 }}>
                  <Text style={styles.textTitle}>Full Name</Text>
                  <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ name: text }) }} value={this.state.name}></TextInput>
                  <Text style={styles.textTitle}>Age</Text>
                  <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ age: text }) }} value={this.state.age}></TextInput>
                  <Text style={styles.textTitle}>Gender</Text>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ backgroundColor: '#2A7862', padding: 10 }}>
                      <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>Male</Text>
                    </View>
                    <View style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                      <Text>Female</Text>
                    </View>
                  </View>
                  <Text style={styles.textTitle}>City</Text>
                  <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ city: text }) }} value={this.state.city}></TextInput>
                  <Text style={styles.textTitle}>State</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, backgroundColor: '#F2F4F7' }}>
                    <TextInput style={styles.passTextInput} onChangeText={(text) => { this.setState({ state: text }) }} value={this.state.state}></TextInput>

                    <Icon onPress={() => { setShowPassword(false); }} name="arrow-down" size={17} />
                  </View>
                  <View style={{ flexDirection: 'column' }}>
                    <Button uppercase={false} mode="contained" loading={this.state.indicator} onPress={() => { this.updateData() }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>Save Changes</Button>
                  </View>
                </View>
              </ScrollView>
            </View>
          )
        }
        {
          this.state.pageNumber === 1 && (
            <View style={{ flex: 1, marginLeft: 16, padding: 10 }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.textTitle}>Home golf course</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ home_golf_course: text }) }} value={this.state.home_golf_course}></TextInput>
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


                  style={{ width: Dimensions.get('screen').width - 30, height: 40 }}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text >{this.state.handicap} HCP</Text>
                </View>





                {/* <TextInput style={styles.textInput} onChangeText={setEmail} value={email} placeholder={"Enter Your Age"}></TextInput> */}
                <Text style={styles.textTitle}>Betting</Text>

                {
                  this.state.countBetting === "0" &&
                  (<View style={{ flexDirection: 'row', marginTop: 10 }}>
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
                  (<View style={{ flexDirection: 'row', marginTop: 10 }}>
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
                  (<View style={{ flexDirection: 'row', marginTop: 10 }}>
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
                  (<View style={{ flexDirection: 'row', marginTop: 10 }}>
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
                  (<View style={{ flexDirection: 'row', marginTop: 10 }}>
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
                  (<View style={{ flexDirection: 'row', marginTop: 10 }}>
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
                  (<View style={{ flexDirection: 'row', marginTop: 10 }}>
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
                  (<View style={{ flexDirection: 'row', marginTop: 10 }}>
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
                  (<View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Pressable onPress={() => { this.setState({ countSmoking: "1" }); this.setState({ smoking: "Yes" }) }} style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                      <Text>Yes</Text>
                    </Pressable>

                    <Pressable onPress={() => { this.setState({ countSmoking: "2" }); this.setState({ smoking: "No" }) }} style={{ backgroundColor: '#2A7862', padding: 10, marginLeft: 8 }}>
                      <Text style={{ color: 'white', fontWeight: '500' }}>No</Text>
                    </Pressable>
                  </View>)
                }


                <Text style={styles.textTitle}>Preffered competition format</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View style={{ backgroundColor: '#F2F4F7', padding: 10 }}>
                    <Text>Stroke Play</Text>
                  </View>
                  <View style={{ backgroundColor: '#F2F4F7', padding: 10, marginLeft: 8 }}>
                    <Text>Match Play</Text>
                  </View>
                </View>

              </View>
              <View style={{ position: 'absolute', bottom: 30, width: '100%' }}>
                <Button uppercase={false} mode="contained" onPress={() => { this.updateData() }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>Save Changes</Button>
              </View>
            </View>
          )
        }
        {
          this.state.pageNumber === 2 && (
            <View style={{ flex: 1 }}>
              <View style={{ padding: 15, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.textTitle}>What do you do for a living?</Text>
                  <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ job_type: text }) }} value={this.state.job_type}   ></TextInput>

                  <Text style={styles.textTitle}>What are your hobbies beyond golf?</Text>
                  <TextInput style={styles.textInput} onChangeText={(text) => { this.setState({ hobby: text }) }} value={this.state.hobby} ></TextInput>

                </View>



              </View>
              <View style={{ position: 'absolute', bottom: 30, width: '100%' }}>
                <Button uppercase={false} mode="contained" onPress={() => { this.updateData() }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>Save Changes</Button>
              </View>
            </View>
          )
        }


      </View>
    )
  }
}

export default EditProfileScreen

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
  passTextInput: {
    height: 40,
    //marginTop:10,
    // borderWidth:1,
    padding: 10,
    backgroundColor: '#F2F4F7',
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
    backgroundColor: '#F2F4F7',
    borderColor: 'black',
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
    color: '#090B0E',
    marginTop: 14,
    fontSize: 16,
    // fontFamily:'Neue Haas Unica'
  },
  loginButton: {
    alignSelf: 'center',
    //position:'relative',
    marginBottom: 30,
    //right:0,
    //alignSelf:'flex-end',
    width: '80%',
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