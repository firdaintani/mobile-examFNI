// import React, { Component } from "react";
// import { 
//     View,
//     Text,
//     StyleSheet, Button
// } from "react-native";
// import MapView,{Marker} from 'react-native-maps'
// const styles = StyleSheet.create({
//     container: {
//       ...StyleSheet.absoluteFillObject,
//      flex:1
//     },
//     map: {
//       ...StyleSheet.absoluteFillObject,
//     },
//    });

  
// class Pemesanan extends Component {
//     state={location:null}
//     onBtnClick=()=>{
//         // alert('masuk')
//         navigator.geolocation.getCurrentPosition(positionResult=>{
//             // console.log(positionResult)
//             this.setState({location:{
//                 latitude : positionResult.coords.latitude,
//                 longitude : positionResult.coords.longitude,
//                 latitudeDelta: 0.015,
//                 longitudeDelta: 0.0121
//             }})
//         }, err=>{
//             alert(err)
//          console.log(err)
//         })
//     }
 
//     render() {

//         console.disableYellowBox=true
//         const initial = {
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.015,
//             longitudeDelta: 0.0121,
//           }
//         const obj= this.state.location ? this.state.location : initial

//         return (
//             <View style={styles.container}>
//             <View style={{marginTop:30, zIndex:1}}>
//             <Button title='Get Current Location' onPress={this.onBtnClick}/>
//             </View>
//             {<MapView
//               style={styles.map}
//               region={obj}
//             >   
//             <Marker coordinate={obj}/>
           
//             </MapView>}
//           </View>
//         );
//     }
// }
// export default Pemesanan;

import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet, Button,Alert
} from "react-native";
import { Fire } from '../support/firebase'
import {connect} from 'react-redux'
class EmployeeDetail extends Component {
  delete=(key)=>{
    // alert(key)
    Fire.database().ref('manager/'+this.props.id+'/employee').child(key).remove()
    .then((res)=>{
      alert('data berhasil hapus');
      this.props.navigation.navigate('list')
  })
  .catch((err)=>{
  alert(err.message)})
   
  }

  deleteEmployee=(key,name)=>{
    // alert(key)
    Alert.alert(
      'delete data', 'are you sure delete '+name+'?',  [{text : 'Yes', onPress :()=> this.delete(key)}, {text : 'Cancel'}]
     );
  }

  render() {
  const {getParam} = this.props.navigation
    return (
      <View style={styles.container}>
        <Text>{getParam('nama')}</Text>
        <Text>{getParam('phone')}</Text>
        <Text>{getParam('shift')}</Text>
        <Button title='Delete Employee' onPress={()=>this.deleteEmployee(getParam('key'), getParam('nama'))}>
          {/* <Text>Delete Employee</Text> */}
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

const mapStateToProps=(state)=>{
  return {
    id : state.auth.id
  }
}
export default connect(mapStateToProps)(EmployeeDetail)