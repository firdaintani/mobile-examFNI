import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text, Body, Title, Icon } from 'native-base';
import {View, ActivityIndicator} from 'react-native'
import { Fire } from '../support/firebase'
import {connect} from 'react-redux'
import { onLoginSuccess } from '../2. actions'
import { StackActions, NavigationActions } from 'react-navigation';

class Register extends Component {
  state = {pass : '', confirm : '', loading : false, error:''}
  
  onBtnRegisterClick=()=>{
    if(this.inputEmail && this.state.confirm&&this.state.pass){
      if(this.state.confirm===this.state.pass){
        this.setState({loading: true})
        const auth =Fire.auth()
        auth.createUserWithEmailAndPassword(this.inputEmail, this.state.pass)
        .then((val)=>{
          var {email, uid} = val.user
          console.log(uid)
          this.props.onLoginSuccess(email, uid)
          this.setState({loading:false})
    
        })
        .catch((err)=>{
          
          this.setState({loading:false, error:err.message})
    
        })
          
      }else{
        this.setState({error : 'password dan confirm pasword berbeda'})
        
      }
    }else{
      this.setState({error : 'mohon isi semua'})
    }

  }

  componentDidUpdate(){
    if(this.props.user.id){
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'home' })],
      });
      this.props.navigation.dispatch(resetAction);
    }

    
    }
 
  // componentWillReceiveProps(newProps){
  //   if(this.props.user){
  //       const resetAction = StackActions.reset({
  //           index: 0,
  //           actions: [NavigationActions.navigate({ routeName: 'home' })],
  //         });
  //         this.props.navigation.dispatch(resetAction);
  //       }
  // }

  render() {
    const confirm = this.state.confirm==='' ? 
        <Item floatingLabel last>
          <Label>Confirm Password</Label>
          <Input onChangeText={(value)=>this.setState({confirm : value})}/>
        </Item> : 
  this.state.confirm!==this.state.pass ? 
        <Item floatingLabel last error>
            <Label>Confirm Password</Label>
            <Input onChangeText={(value)=>this.setState({confirm : value})}/>
            <Icon name='close-circle'/>
        </Item> :
         <Item floatingLabel last success>
              <Label>Confirm Password</Label>
              <Input onChangeText={(value)=>this.setState({confirm : value})}/>
              <Icon name='checkmark-circle'/>
        </Item> 
    return (
      <Container>
        <Header>
            <Body>
                <Title>Register</Title>
            </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(value)=>{this.inputEmail=value}} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input onChangeText={(value)=>this.setState({pass : value})}/>
            </Item>
            {confirm}
            <Button block style={{ marginTop:20, marginHorizontal:10}} onPress={this.onBtnRegisterClick} >
            {
              this.state.loading ?
              <ActivityIndicator size='small' color='white' />
              :            <Text>Register</Text>

            }
          </Button>  
          <View style={{flexDirection:'row', justifyContent:'center', marginTop:30}}>
              <Text onPress={()=>this.props.navigation.navigate('login')}>Sudah punya akun? Login</Text>
          </View>
        { this.state.error ?
          <View style={{paddingVertical:15, backgroundColor:'red', marginHorizontal:10}}>
          <View style={{position:'absolute', top:3, right:3}}>
            <Icon name='close-circle' fontSize={10} color='white' style={{alignSelf:'center'}} onPress={()=>this.setState({error:''})} />
          
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
    // id : state.auth.id,
    // user : state.auth.email
    user : state.auth
  }
}

export default connect(mapStateToProps,{onLoginSuccess})(Register)