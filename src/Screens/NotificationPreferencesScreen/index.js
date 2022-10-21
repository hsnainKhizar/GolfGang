import { Text, View, SafeAreaView, Image, Pressable, Dimensions } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import ToggleSwitch from 'toggle-switch-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
 
export class NotificationPreferencesScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      messageToggle: false,
      playerToggle: false,
      followingToggle: false,
      compToggle: false
    }
  }
 
  componentDidMount(){
    this.setToggle()
  }

  setToggle = async()=>{
    let notify = await AsyncStorage.getItem('notify')
    if (notify === "1"){
      this.setState({messageToggle : true})
    }else{
      this.setState({messageToggle : false})
    }
  }




  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

        </SafeAreaView>

        <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon onPress={() => { this.props.navigation.goBack() }} style={{ marginLeft: 10 }} color={"white"}  name="chevron-left" size={25} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Notification Preferences</Text>
        </View>

        <View style={{ flexDirection: 'row',marginTop:14, alignItems: 'center', justifyContent: 'space-between', padding: 10, marginLeft: 16 }}>
          <Text style={{fontSize:16,color:'#090B0E',fontWeight:'400',maxWidth: Dimensions.get('screen').width/2 + 90}}>Allow all notifications</Text>
          <ToggleSwitch
            isOn={this.state.messageToggle}
            onColor="#2A7862"
            offColor="#ccc"
            labelStyle={{ color: "black", fontWeight: "900" }}
            size="small"
            onToggle={isOn =>{
              if (isOn){
                 AsyncStorage.setItem('notify', "1")
              }else{
                 AsyncStorage.setItem('notify', "0")
              }
              this.setState({ messageToggle: isOn })
            }}
          />
        </View>

      </View>
    )
  }
}

export default NotificationPreferencesScreen