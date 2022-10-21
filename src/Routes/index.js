import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import BottomView from '../BottomTab/BottomView';
import FlashMessage from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthStack from '../NavigationStacks/AuthStack';
import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-native-paper';
  
export class Routes extends Component {


  constructor(props) {
    super(props)
    this.state = {
      userData: [],
      loader: false,
    }
  }


 
 
  getData = async () => {
    AsyncStorage.getItem('userData').then((cart) => {

      if (cart !== null) {
        let CartValuee = JSON.parse(cart)
        this.setState(({ CartValue = CartValuee }) => ({
          userData: CartValue[0].user
        }));

        console.log("data",CartValuee[0].user.email);
       

      } else {

      }
     // console.log(this.state.userData);

    })

  }

  componentDidMount() {
    this.getData()
    this.setState({ loader: true })

    setTimeout(() => {
      this.setState({ loader: false })
    }, 3000)
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



    if (this.state.userData.length == 0) {

      this.props.cartItems.length = 0
      this.state.userData = []
      console.log("logout")
      this.getData()
      return (
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      )
    } else {

      if (this.props.cartItems.length == 1) {
        this.state.userData = []
        // console.log("cart2", this.props.cartItems.length);
        return (
          <NavigationContainer>
            <AuthStack />
          </NavigationContainer>
        )
      }
      else {
        console.log("logut", this.props.cartItems.length);
        return (
          <NavigationContainer>
            <BottomView />
            <FlashMessage position="top" />
          </NavigationContainer>
        )
      }
    }


    // return (
    //   <View style={{ flex: 1 }}>
    //    <NavigationContainer>
    //      {
    //        this.state.userData === null ?
    //        <AuthStack/>
    //        :
    //        <BottomView />
    //      }
    //    </NavigationContainer>
    //   </View>
    // )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state
  }
}

export default connect(mapStateToProps)(Routes);


