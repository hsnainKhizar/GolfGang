import { Text, View, Image, Dimensions, ImageBackground, Pressable } from 'react-native'
import React, { Component } from 'react'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
  
export class UserPostsView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item,
            // user: this.props.item.user,
            userData: [],
            postDate: 0,
        }
    }

    componentDidMount(){
        console.log("image",this.state.item.image);
    }

    getUserData = async () => {
        await AsyncStorage.getItem('userData').then((cart) => {
            if (cart !== null) {
                let CartValue = JSON.parse(cart)
                // console.log("data",CartValue[0][0][0]);
                this.setState({ userData: CartValue[0].user })
                // this.setState({ allposts: CartValue[0][1] })
                // //  this.setState({ userData: CartValue[0][1]})
                // this.setState({ postsLength: this.state.allposts.length })
                // console.log("posts", this.state.userData);

                //console.log(userInfo[0][0].id)
            }
        })
        var date = moment(this.state.item.created_at).format('YYYY-MM-DD')
        this.setState({postDate: date})
    }

    componentDidMount() {
        this.getUserData()
    }
    render() {
        return (
            <Pressable onPress={()=>{this.props.navigation.navigate('Image',this.state.item.image)}} style={{ padding: 20 }}>
               
                    {/* <Text style={{color:'black'}}>{this.state.item.caption}</Text> */}
                    
                    <Image style={{ width: Dimensions.get('window').width - 40, height: 300, borderRadius: 12, alignSelf: 'flex-start', marginTop: 10 }} source={{ uri: `https://golfgang.indexideaz.tech/public/postimage/${this.state.item.image}` }} />
            </Pressable>
        )
    }
}

export default UserPostsView