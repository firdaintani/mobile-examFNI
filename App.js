import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  Button
} from "react-native";

import { createStackNavigator,createAppContainer } from 'react-navigation'
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";



class HomePage extends Component {
  handleButton =() => {
    this.props.navigation.navigate('loginRoute')
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>HomePage</Text>
        <Button title='ke Halaman Login' onPress={this.handleButton}/>
      </View>
    );
  }
}

class LoginPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>LoginPage</Text>
      </View>
    );
  }
}

const stack = createStackNavigator({
  home : {
    screen : HomeScreen,
    navigationOptions : {
      title : "HOME"
    }
  },
  loginRoute : LoginScreen
}, {
  initialRouteName : 'home',
})

const stackContainer = createAppContainer(stack)


export default stackContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});