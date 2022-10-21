import { Text, View, SafeAreaView, Pressable, Image } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'

export class BlockedUsersScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

        </SafeAreaView>

        <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon onPress={() => { this.props.navigation.navigate.goBack() }} style={{ marginLeft: 10 }} color={"white"} onPress={() => { this.props.navigation.goBack() }} name="chevron-left" size={25} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Blocked Users</Text>
          <Text style={{ color: '#CCDFD9', fontWeight: 'bold', fontSize: 14, marginTop: 10, alignSelf: 'flex-start', marginLeft: 16, marginBottom: 7 }}>If you decide to block someone from seeing your feed and messaging you, this person will endup in this list</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>No blocked users</Text>
        </View>

        {/* <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Pressable onPress={() => { this.props.navigation.navigate('OtherUser') }}>
              <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/user-3.jpg')} />
            </Pressable>

            <View style={{ marginLeft: 8 }}>
              <Text style={{ color: '#000', fontWeight: '500' }}>Sophia </Text>
              <Text style={{ color: '#546881', marginTop: 3 }}>Female 30s Trenton,NJ</Text>
              <Text style={{ color: '#546881', marginTop: 3 }}>Joined 20 Aug 2022</Text>
            </View>
          </View>

          <Pressable style={{ padding: 8, borderWidth: 0.5, borderRadius: 7, borderColor: '#007F6D' }}>
            <Text style={{ color: '#007F6D' }}>Unblock</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Pressable onPress={() => { this.props.navigation.navigate('OtherUser') }}>
              <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/user-3.jpg')} />
            </Pressable>

            <View style={{ marginLeft: 8 }}>
              <Text style={{ color: '#000', fontWeight: '500' }}>Sophia </Text>
              <Text style={{ color: '#546881', marginTop: 3 }}>Female 30s Trenton,NJ</Text>
              <Text style={{ color: '#546881', marginTop: 3 }}>Joined 20 Aug 2022</Text>
            </View>
          </View>

          <Pressable style={{ padding: 8, borderWidth: 0.5, borderRadius: 7, borderColor: '#007F6D' }}>
            <Text style={{ color: '#007F6D' }}>Unblock</Text>
          </Pressable>
        </View> */}


      </View>
    )
  }
}

export default BlockedUsersScreen