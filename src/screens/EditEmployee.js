import React, { Component } from 'react';
import {View} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Picker, Left, Right , Text, Button, Body, Title} from 'native-base';
import { Fire } from '../support/firebase'
import { connect } from 'react-redux';

 class EditEmployee extends Component {
    state ={selected : '',selectedId:null, data : []}

  componentDidMount(){
    this.getData()
  }

  getData=()=>{
    Fire.database().ref('manager/'+this.props.id+'/employee').on('value' , items => {
     
     this.setState({data : items.val()})
     console.log(items.val())
 })
  }

  onBtnSave=()=>{
    var nama = ''
    var telp = ''
    var shift = ''
      if(this.inputNama){
        nama = this.inputNama
      }else{
        nama =this.state.data[this.state.selectedId].nama
      }

      if(this.inputTelp){
        telp = this.inputTelp
      }else{
        telp =this.state.data[this.state.selectedId].telp
      }
      if(this.state.selected!==''){
    
        shift = this.state.selected
      }else{
        
        shift =this.state.data[this.state.selectedId].shift
      }
     Fire.database().ref('manager/'+this.props.id+'/employee/'+this.state.selectedId).set({
        nama : nama,
        telp:telp,
        shift:shift
    })
    .then((res)=>{
      this.setState({selected:''})
        alert('data berhasil diedit')
      
    })
    .catch((err)=>{console.log(err)
    alert(err.message)})
    // alert(telp)
   
  }
    
  render() {
      console.disableYellowBox=true
    return (
      <Container>
       <Header>
            <Body>
                <Title>Edit Employee</Title>
            </Body>
        </Header>
        <Content>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{paddingTop:15, paddingLeft:10}}>
                    <Text>Select data</Text>
                </View>
                <View>
                    <Picker mode='dropdown' style={{width:120}} selectedValue={this.state.selectedId} onValueChange={(value)=>this.setState({selectedId:value, selected:''})}>
                    <Picker.Item label='Select Name' value={null}/>

                 {
                     Object.keys(this.state.data).map(val=>{
                         return(
                            <Picker.Item label={this.state.data[val].nama} value={val}/>

                         )
                     })
                 }
                 
                    </Picker>
                </View>
            </View>
          <Form>
            <Item stackedLabel>
              <Label>Nama</Label>
              <Input onChangeText={(value)=>{this.inputNama=value}} defaultValue={this.state.selectedId!==null?this.state.data[this.state.selectedId].nama : null} />
            </Item>
            <Item stackedLabel last>
              <Label>Phone</Label>
              <Input onChangeText={(value)=>{this.inputTelp=value}} defaultValue={this.state.selectedId!==null?this.state.data[this.state.selectedId].telp : null}/>
            </Item>
            <Item>
                <Left>
                    <Label>Select Day</Label>
                </Left>
                <Right>
                    <Picker mode="dropdown" style={{ width:200}} selectedValue={(this.state.selected &&this.state.selectedId) ?this.state.selected : (this.state.selectedId&& this.state.selected==='') ? this.state.data[this.state.selectedId].shift : null}
              onValueChange={(value)=>this.setState({selected:value})}>
                            <Picker.Item label='Mon' value='Mon'/>
                            <Picker.Item label='Tue' value='Tue'/>
                            <Picker.Item label='Wed' value='Wed'/>
                            <Picker.Item label='Thru' value='Thru'/>
                            <Picker.Item label='Fri' value='Fri'/>

                        </Picker>
                    
                    </Right>
            </Item>
            <Button block style={{ marginTop:20, marginHorizontal:10}} onPress={this.onBtnSave}>
            <Text>Save</Text>
          </Button>  
         
          </Form>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    id : state.auth.id
  }
}
export default connect(mapStateToProps)(EditEmployee)