import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left,Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Fire } from '../support/firebase'
import { connect } from 'react-redux';
class ListEmployee extends Component {
    state={ data :[]}
    componentDidMount(){
      this.getData()
    }
  
    getData=()=>{
      Fire.database().ref('manager/'+this.props.id+'/employee').on('value' , items => {
       
       this.setState({data : items.val()})
       console.log(items.val())
   })
    }
  render() {
      console.disableYellowBox=true
    return (
      <Container>
        <Header />
        <Content>
          <List>
              { this.state.data ?
                  Object.keys(this.state.data).map(val=>{
                      return(
                    <ListItem onPress={()=>this.props.navigation.navigate('detail',{nama :this.state.data[val].nama, phone : this.state.data[val].telp, shift :this.state.data[val].shift, key : val })}>
                    <Left>
                        <Text>{this.state.data[val].nama}</Text>
                    </Left>
                    <Right>
                        
                        <Icon name='chevron-right' size={14}/>
                    </Right>
                </ListItem>
                
                )
                  })
                  : <Text>Data Employee Tidak Ada</Text>
              }
           
            
          </List>
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
export default connect(mapStateToProps)(ListEmployee)