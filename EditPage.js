import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import TabBar from './Tab';
import Edit from './Edit';
import EditingButtons from './EditingButtons';
import {firebaseApp} from './App';
var styles = require('./Styles');
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon} from 'native-base';
import { Keyboard } from 'react-native';

export default class EditScreen extends Component {
  constructor(props){
    super(props);
    const {navigate} = this.props.navigation;
    this.params = this.props.navigation.state.params;
    this.state = {
      changed: false,
      saving: false,
      cancel: false,
      curTitle: this.params.name,
      curWho: this.params.who,
      curTime: this.params.time,
      curDate: this.params.date,
      curDescription: this.params.what,
      curWhere: this.params.where
    }
    console.ignoredYellowBox = ['Setting a timer'];
  }

  // takes new data from Edit.ios and Edit.android to update locally and send
  // updates to firebase
  pushNewData = (newName, newWho, newWhere, newTime, newDate, newWhat) => {
    this.setState({
      saving: false,
      curTitle: newName,
      curWho: newWho,
      curWhere: newWhere,
      curDescription: newWhat,
      curTime: newTime,
      curDate: newDate
    });

    let updateData = {
       name: newName.toString(),
       what: newWhat.toString(),
       when: newTime.toString(),
       where: newWhere.toString(),
       who: newWho.toString(),
     }

     // updates the old event; if there is new date, deletes old event and
     // moves event to under new date while retaining event key
     let itemsRef = firebaseApp.database().ref('items');
     let oldEventRef = itemsRef.child(this.params.date + '/' + this.params.key);
     oldEventRef.update(updateData);

     if (this.params.date != newDate) {
     oldEventRef.remove();
     itemsRef.child(newDate).child(this.params.key).update(updateData);
  }
}

// basic functions for managing states; if changed true, then display cancel and
// save button; if saving true, store data; if cancel true, reset to last saved data
  onSave = () => {
    this.setState({
      saving: true,
      changed: false
    });
  };

  onCancel = () => {
    this.setState({
      cancel: !this.state.cancel,
      changed: false
    });
  };

  onChanged = () => {
    this.setState({
      changed: true
    });
  }


  render() {
    const {navigate} = this.props.navigation;
     return (
       <Container>
       <Header>
         <Left style={{flex:1}}>
           {!this.state.changed && <Button onPress={() => {
             navigate('MyEvents')
             Keyboard.dismiss();
           }}>
             <Icon name='arrow-back'/>
           </Button>}
           {this.state.changed && <Button onPress={() => {
             this.onCancel();
             Keyboard.dismiss();
           }}>
             <Text>Cancel</Text>
           </Button>}
         </Left>
         <Body style={{flex:1}}>
           <Title>Edit Event</Title>
          </Body>
          <Right style={{flex:1}}>
            {this.state.changed && <Button onPress={() => {
              this.onSave();
              Keyboard.dismiss();
            }}>
              <Text>Save</Text>
            </Button>}
          </Right>
       </Header>
         <Content>
           <Edit title={this.state.curTitle} who={this.state.curWho} description={this.state.curDescription}
             time={this.state.curTime} date={this.state.curDate} where={this.state.curWhere} change={this.onChanged}
             saving={this.state.saving} cancel={this.state.cancel} pushData={this.pushNewData}/>
         </Content>
         <Footer>
           <TabBar navigate={navigate} screen='MyEvents'/>
         </Footer>
      </Container>
     );
  }
}

//{this.state.changed && <EditingButtons save={this.onSave} cancel={this.onCancel}/>}
