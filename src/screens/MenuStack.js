import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet, TouchableHighlight
} from "react-native";

class Menu extends Component {
    render() {
        console.disableYellowBox=true
        return (
            <View style={styles.container}>
               <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:100, marginHorizontal:20}}>
                   <TouchableHighlight style={{height:100, width:100, borderWidth:3, borderColor:'orange'}} onPress={()=>this.props.navigation.navigate('add')}>
                   <Text>Add Employee</Text>
                   </TouchableHighlight>
                   <TouchableHighlight style={{height:100, width:100, borderWidth:3, borderColor:'orange'}} onPress={()=>this.props.navigation.navigate('edit')}>
                   <Text>Edit Employee</Text>
                   </TouchableHighlight>
                   <TouchableHighlight style={{height:100, width:100, borderWidth:3, borderColor:'orange'}} onPress={()=>this.props.navigation.navigate('list')}>
                   <Text>List Employee</Text>
                   </TouchableHighlight>

               </View>
            </View>
        );
    }
}
export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    }
});