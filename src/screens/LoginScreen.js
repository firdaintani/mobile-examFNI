import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text, Body, Title } from 'native-base';
import {View,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import { Fire } from '../support/firebase'
import { onLoginSuccess } from '../2. actions'
import { StackActions, NavigationActions } from 'react-navigation';


class LoginScreen extends Component {
  state = {loading : false, error : ''}

  onLogin=()=>{
    this.setState({loading:true})
    var email = this.inputEmail
    var password = this.inputPassword
    if(email && password){
      Fire.auth().signInWithEmailAndPassword(email, password)
      .then((val)=>{
        
        this.props.onLoginSuccess(val.user.email, val.user.uid)
        this.setState({loading:false})
      })
      .catch((err)=>{
        this.setState({loading:false, error:err.message})
      })
  
    }else{
      this.setState({error : 'Isi semua', loading:false})
    }

  }
  componentDidUpdate(){
    if(this.props.email){
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'home' })],
      });
      this.props.navigation.dispatch(resetAction);
    }

    
    }
  render() {
    return (
      <Container>
        <Header>
            <Body>
                <Title>Login</Title>
            </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>email</Label>
              <Input onChangeText={(value)=>{this.inputEmail=value}} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={(value)=>{this.inputPassword=value}}/>
            </Item>
            <Button block style={{ marginTop:20, marginHorizontal:10}} onPress={this.onLogin}>
            {
              this.state.loading ?
              <ActivityIndicator size='small' color='white' />
              :            <Text>Login</Text>

           }
          </Button>  
         

          <View style={{flexDirection:'row', justifyContent:'center', marginTop:15}}>
            <View style={{height:60, width:60}}>
            <Icon name='facebook' size={40}/>
            </View>
            <View style={{height:60, width:60}}>
            <Icon name='google' size={40}/>
            </View>
            <View style={{height:60, width:60}}>
            <Icon name='twitter' size={40}/>
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', marginTop:10}}>
              <Text onPress={()=>this.props.navigation.navigate('register')}>Belum punya akun? Register</Text>
          </View>
          { this.state.error ?
          <View style={{paddingVertical:15, backgroundColor:'red', marginHorizontal:10}}>
          <View style={{position:'absolute', top:3, right:3}}>
            <Icon name='window-close' fontSize={10} color='white' style={{alignSelf:'center'}} onPress={()=>this.setState({error:''})} />
          
          </View>
            <Text style={{color:'white', alignSelf:'center'}}>{this.state.error}</Text>
          </View>
          : null
         } 
          </Form>
          
        </Content>
      </Container>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    email : state.auth.email
  }
}

export default connect(mapStateToProps, {onLoginSuccess})(LoginScreen)