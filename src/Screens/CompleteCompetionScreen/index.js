import { Text, View, SafeAreaView,FlatList, Image,ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Button, RadioButton } from 'react-native-paper'
import axios from 'axios'; 
import { showSuccess } from '../../../Helper/HelperFunction';
import RankedUsers from '../../Components/RankedUsers';
const baseUrl = 'https://golfgang.indexideaz.tech/api';
 
 
export class CompleteCompetionScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            interestedUsers: [],
            loader: [],
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

    completeCompetition = async ()=>{
        console.log("comp_id",this.props.route.params.id);
        console.log("comp status",this.props.route.params.status);

        let status = "completed"


 
        try {
            const response = await axios.put(`${baseUrl}/competition/${this.props.route.params.id}`, {
                status,
            });
            // console.log(response.data)

            if (response.status === 200) {
                console.log("status",);
               showSuccess("Competition Completed!")
               this.props.navigation.goBack()
            }
        } catch (error) {
            //setIndicator(false)
            console.log(error)
           // Alert.alert("An error has occurred,try later");
        }
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
                    <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Complete Competition</Text>
                </View>

                <FlatList
                    data={this.state.interestedUsers}
                    renderItem={({ item,index}) =>

                    <RankedUsers item = {item} index = {index}/> 

                        // <PostsView item={item} navigation={this.props.navigation} />

                    }
                    showsVerticalScrollIndicator={false}
                    // refreshing={this.state.refreshing}
                    // onRefresh={this.updateUserData}

                />

              
               

                <Button uppercase={false} mode="contained" onPress={() => { this.completeCompetition() }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>Submit</Button>

            </View>
        )
    }
}

export default CompleteCompetionScreen

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