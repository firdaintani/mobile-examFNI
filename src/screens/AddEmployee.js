import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Left, Right , Text, Button, Body, Title} from 'native-base';
import { Fire } from '../support/firebase'
import {connect} from 'react-redux'

class AddEmployee extends Component {
    state ={selected : 'Monday'}
    onAddBtnClick = () => {
      if(this.inputNama && this.inputPhone){
        var db = Fire.database()
        var employee = db.ref('manager/'+this.props.id+'/employee')
  
        employee.push({
            nama : this.inputNama,
            telp : this.inputPhone,
            shift : this.state.selected
        })
        .then((res) => {
            console.log(res)
          
            alert('Add data Berhasil')
        })
        .catch((err) => {
            console.log(err)
        })
  
      }else{
        alert('isi semua')
      }
   
  }
  render() {
    return (
      <Container>
       <Header>
            <Body>
                <Title>Add Employee</Title>
            </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Nama</Label>
              <Input onChangeText={(value)=>{this.inputNama=value}} />
            </Item>
            <Item floatingLabel last>
              <Label>Phone</Label>
              <Input onChangeText={(value)=>{this.inputPhone=value}}/>
            </Item>
            <Item>
                <Left>
                    <Label>Select Day</Label>
                </Left>
                <Right>
                    <Picker mode="dropdown" style={{ width:230}} selectedValue={this.state.selected}
              onValueChange={(value)=>this.setState({selected:value})}>
                            <Picker.Item label='Monday' value='Monday'/>
                            <Picker.Item label='Tuesday' value='Tuesday'/>
                            <Picker.Item label='Wednesday' value='Wednesday'/>
                            <Picker.Item label='Thursday' value='Thursday'/>
                            <Picker.Item label='Friday' value='Friday'/>

                        </Picker>
                    
                    </Right>
            </Item>
            <Button block style={{ marginTop:20, marginHorizontal:10}} onPress={this.onAddBtnClick}>
            <Text>Add Employee</Text>
         
          </Button>  
          {/* <Text>{this.props.id}</Text> */}
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

export default connect(mapStateToProps)(AddEmployee)