import React,{Component} from 'react'

import { createStackNavigator,createAppContainer,createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen';
import Register from '../screens/RegisterPage';
import EmployeeDetail from '../screens/EmployeeDetail';
import EditEmployee from '../screens/EditEmployee';
import MenuAccountSetting from '../screens/MenuAccountSetting'
import Menu from '../screens/MenuStack';
import AddEmployee from '../screens/AddEmployee';
import ListEmployee from '../screens/ListEmployeeScreen'

const TopTabRiwayat = createStackNavigator({
    menu : MenuAccountSetting,
    // pemesanan : EmployeeDetail,
   
})

const StackBeranda = createStackNavigator({
    MenuStack : Menu,
    add : AddEmployee,
    edit : EditEmployee,
    list : ListEmployee,
    detail : EmployeeDetail

}, {headerMode:'none'})
StackBeranda.navigationOptions=({navigation})=>{
    let tabBarVisible = false
    let routeName = navigation.state.routes[navigation.state.index].routeName
    if(routeName==='MenuStack'){
        tabBarVisible=true
    }
    return{
        tabBarVisible
    }
}
const HomeTab = createBottomTabNavigator({
    home : StackBeranda,
    account : TopTabRiwayat
},{
    tabBarPosition :'bottom',
    swipeEnabled : false
}) 

const StackRoot = createStackNavigator({
    login : LoginScreen,
    register : Register,
    home : HomeTab
},{
    headerMode : 'none',
    // initialRouteName:'home'
})

export const StackContainer = createAppContainer(StackRoot)