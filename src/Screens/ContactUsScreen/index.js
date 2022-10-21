import { Text, View,TextInput,SafeAreaView,StyleSheet, Alert} from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Button, RadioButton } from 'react-native-paper'

export class ContactUsScreen extends Component {



  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

        </SafeAreaView>

        <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon onPress={() => { this.props.navigation.navigate.goBack() }} style={{ marginLeft: 10 }} color={"white"} onPress={() => { this.props.navigation.goBack() }} name="chevron-left" size={25} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Contact Us</Text>
          <Text style={{ color: '#CCDFD9', fontWeight: 'bold', fontSize: 14, marginTop: 10, alignSelf: 'flex-start', marginLeft: 16, marginBottom: 7 }}>Do you have any questions or have ideas how to improve the app.you can fill the form below and we will contact you soon.</Text>
        </View>
 
        <View style={{ padding: 10,marginLeft:16}}>
         
            <Text style={styles.textTitle}>Full Name</Text>
            <TextInput style={styles.textInput}  placeholder={"Enter Email Address"} ></TextInput>
            <Text style={styles.textTitle}>Email Address</Text>
            <TextInput style={styles.textInput} placeholder={"Enter Email"} ></TextInput>
            <Text style={styles.textTitle}>Message</Text>
            <TextInput style={styles.textInput} placeholder={"Enter Your Message..."} ></TextInput>
        </View>

        <View style={{ position: 'absolute',alignSelf:'center', bottom: 50,width:'80%' }}>
          <Button uppercase={false} mode="contained" onPress={() => { Alert.alert('Your response has been submitted'); this.props.navigation.goBack() }} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={styles.loginButton}>Submit</Button>
        </View>
      </View>
    )
  }
}

export default ContactUsScreen

const styles = StyleSheet.create({

  textInput: {
    height: 40,
    marginTop: 14,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F2F4F7',
    borderColor: 'black',
    borderRadius: 2,
    width: '100%'
  },
  
  textTitle: {
    color: '#090B0E',
    marginTop: 14,
    fontSize: 16,
  },
  loginButton: {
   // width: '80%',
    borderRadius: 10,
    backgroundColor: '#2A7862',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    padding: 2,
    top: 20,
  },
})