import { Text, View, SafeAreaView, Image, FlatList, ActivityIndicator, Pressable, ImageBackground, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Button, RadioButton } from 'react-native-paper'
import axios from 'axios';
const baseUrl = 'https://golfgang.indexideaz.tech/api';
 

export class PeopleInterestedScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            interestedUsers: [],
            loader: false,
        }
    }

    getInterestedUsers = async () => {
        this.setState({ loader: true })
        try {
            const response = await axios.get(`${baseUrl}/getintersted/${this.props.route.params.id}`, {

            });
            // console.log(response.data)

            if (response.status === 200) {
                this.setState({ loader: false })
                this.setState({ interestedUsers: response.data })
                console.log(this.state.interestedUsers.length);
            }
        } catch (error) {
            //setIndicator(false)
            console.log(error)
            // Alert.alert("An error has occurred,try later");
        }

    }

    componentDidMount() {
        console.log("data", this.props.route.params.id);
        this.getInterestedUsers()
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
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                </SafeAreaView>


                {/* <View style={{ backgroundColor: '#2A7862' }}>
                    <Text></Text>
                </View> */}

                <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon onPress={() => { this.props.navigation.navigate.goBack() }} style={{ marginLeft: 10 }} color={"white"} onPress={() => { this.props.navigation.goBack() }} name="chevron-left" size={25} />
                    </View>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>People Interested</Text>
                </View>


                <FlatList
                    data={this.state.interestedUsers}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>

                                {
                                    item.image === null ?
                                        <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/user.png')} />
                                        :
                                        <ImageBackground
                                            source={{
                                                uri: `data:image/png;base64,${item.image}`

                                            }}
                                            style={{ height: 60, width: 60, }}
                                            imageStyle={{ borderRadius: 30 }}
                                        >
                                        </ImageBackground>
                                }


                                {/* <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/user-3.jpg')} /> */}


                                <View style={{ marginLeft: 8 }}>
                                    <Text style={{ color: '#000', fontWeight: '500' }}>{item.name} </Text>
                                    <Text style={{ color: '#546881', marginTop: 3 }}>{item.gender === "male" ? "Male" : "Female"} {item.age} {item.city},{item.state}</Text>
                                    {/* <Text style={{ color: '#546881', marginTop: 3 }}>Joined 20 Aug 2022</Text> */}
                                </View>
                            </View>


                            {/* <Pressable style={{ padding: 8, borderWidth: 0.5, borderRadius: 7, borderColor: '#007F6D' }}>
                                <Text style={{ color: '#007F6D' }}>Remove</Text>
                            </Pressable> */}
                        </View>
                        // <PostsView item={item} navigation={this.props.navigation} />

                    }
                    showsVerticalScrollIndicator={false}
                // refreshing={this.state.refreshing}
                // onRefresh={this.updateUserData}

                />




                {/* <Button uppercase={false} mode="contained" onPress={() => { loginIndividual() }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>Create Group Chat</Button> */}

            </View>
        )
    }
}

export default PeopleInterestedScreen

const styles = StyleSheet.create({
    loginButton: {
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 20,
        position: 'absolute',
        bottom: 0,
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