import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet, Button
} from "react-native";
import {resetUser} from '../2. actions'
import {connect} from 'react-redux'
import { Fire } from "../support/firebase";
import { StackActions, NavigationActions } from 'react-navigation';
class MenuAccountSetting extends Component {
    onLogoutPress=()=>{
        Fire.auth().signOut()
        .then((val)=>{
           
            this.props.resetUser()
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'login' })],
              });
              this.props.navigation.dispatch(resetAction);
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Button title='LOGOUT' onPress={this.onLogoutPress}>
                   
                </Button>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default connect(null, {resetUser})(MenuAccountSetting);