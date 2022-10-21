import { Text, View, SafeAreaView,FlatList} from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import FollowingUserView from '../../Components/FollowingUserView'

export class FollowingUsersScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            followingUserData: this.props.route.params,
        }
    }

    componentDidMount() {
        console.log("data", this.props.route.params);
    }



    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

                </SafeAreaView>

                <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon onPress={() => { this.props.navigation.navigate.goBack() }} style={{ marginLeft: 10 }} color={"white"} onPress={() => { this.props.navigation.goBack() }} name="chevron-left" size={25} />
                    </View>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Following</Text>
                </View>

                <View style={{}}>
                    <FlatList
                        data={this.state.followingUserData}
                        renderItem={({ item }) => <FollowingUserView item={item} navigation={this.props.navigation} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>


            </View>
        )
    }
}

export default FollowingUsersScreen