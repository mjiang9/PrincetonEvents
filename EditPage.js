import React, {Component} from 'react';
import TabBar from './Tab';
import {firebaseApp} from './App';
import { Container, Header, Title, Content, Button,
  Left, Right, Body, Icon, Form, Item, Input, Text, Label, Toast} from 'native-base';
import { Keyboard } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyCWw2zAT2-MqdG7wP5LoCbw_BIfoFXg4l4');

export default class EditScreen extends Component {
  constructor(props){
    super(props);
    const {navigate} = this.props.navigation;
    this.params = this.props.navigation.state.params;
    // checks if endTime or description were filled and changes them to match
    // input page
    let endTime, endTimeColor, isEndTimeEmpty, description;

    if(this.params.endTime == 'N') {
      endTime = 'End (optional)';
      endTimeColor = 'dimgrey';
      isEndTimeEmpty = true;
    }
    else {
      endTime = this.params.endTime;
      endTimeColor = 'black';
      isEndTimeEmpty = false;
    }

    if(this.params.what == 'N/A') {
      description = '';
    }
    else {
      description = this.params.what;
    }

    this.saved = {
      titleInput: this.params.name,
      hostInput: this.params.who,
      locationInput: this.params.where,
      dateInput: this.params.date,
      startTimeInput: this.params.startTime,
      endTimeInput:  endTime,
      descriptionInput: description,
    }

    this.state = {
      changed: false,
      saving: false,
      cancel: false,
      titleInput: this.params.name,
      hostInput: this.params.who,
      locationInput: this.params.where,
      dateInput: this.params.date,
      startTimeInput: this.params.startTime,
      endTimeInput:  endTime,
      descriptionInput: description,
      titleError: false,
      hostError: false,
      locationError: false,
      descriptionHeight: 0,
      showDatePicker: false,
      dateTimeMode: 'date',
      isStartTime: true,
      endTimeColor: endTimeColor,
      endTimeEmpty: isEndTimeEmpty,
    }
    console.ignoredYellowBox = ['Setting a timer'];
  }

  // takes new data from Edit.ios and Edit.android to update locally and send
  // updates to firebase
  pushNewData = () => {
    this.setState({changed: false})

    let oldDate = this.saved.dateInput;

    this.saved = {
      titleInput: this.state.titleInput,
      hostInput: this.state.hostInput,
      startTimeInput: this.state.startTimeInput,
      endTimeInput: this.state.endTimeInput,
      dateInput: this.state.dateInput,
      descriptionInput: this.state.descriptionInput,
      locationInput: this.state.locationInput,
    }

    // required fields which we know will be filled
    let updateData = {
       name: this.saved.titleInput,
       what: this.saved.descriptionInput,
       startTime: this.saved.startTimeInput ,
       where: this.saved.locationInput,
       who: this.saved.hostInput,
     }

     // if optional fields are filled in, adds them to the update data
     if(!this._inputChecker(this.state.descriptionInput))
     updateData.what = this.saved.descriptionInput;

     if(!this.state.endTimeEmpty)
     updateData.endTime = this.saved.endTimeInput;

     Geocoder.getFromLocation(this.saved.locationInput + " Princeton").then(
       json => { var location = json.results[0].geometry.location;
         updateData.latitude = location.lat;
         updateData.longitude = location.lng;
       },
       error => {
         alert(error);
       }
     );

     // updates the old event; if there is new date, deletes old event and
     // moves event to under new date while retaining event key
     try{
     let itemsRef = firebaseApp.database().ref('items');
     let oldEventRef = itemsRef.child(oldDate + '/' + this.params.key);

     if (oldDate != this.saved.dateInput) {
       oldEventRef.remove();
       itemsRef.child(this.saved.dateInput).child(this.params.key).update(updateData);
     }
     else {
       oldEventRef.update(updateData);
     }

     Toast.show({
         text: 'Saved!',
         position: 'bottom',
         duration: 3000,
       })
   }
   catch(err) {
     alert(err);
   }
}

// basic functions for managing states; if changed true, then display cancel and
// save button; if saving true, store data; if cancel true, reset to last saved data

  onCancel = () => {
    this.setState({
      changed: false,
      titleInput: this.saved.titleInput,
      hostInput: this.saved.hostInput,
      locationInput: this.saved.locationInput,
      dateInput: this.saved.dateInput,
      startTimeInput: this.saved.startTimeInput,
      endTimeInput:  this.saved.endTimeInput,
      descriptionInput: this.saved.descriptionInput,
      titleError: false,
      hostError: false,
      locationError: false
    });
  };

  _submit = () => {
    // checks for errors and if so, highlights the line
    let submission = {
      titleError: this._inputChecker(this.state.titleInput),
      hostError: this._inputChecker(this.state.hostInput),
      locationError: this._inputChecker(this.state.locationInput),
    }

    this.setState({
      titleError: submission.titleError,
      hostError: submission.hostError,
      locationError: submission.locationError,
    })

    // if all set, pushes data to server, else sends error toast
    if(!submission.titleError && !submission.hostError && !submission.locationError) {
    this.pushNewData();
  }
    else {
      Toast.show({
          text: 'Please Fill Out Required Fields',
          position: 'bottom',
          duration: 2300,
        })
    }
  };


  _showDateTimePicker = (mode, start) => {
  this.setState({
     dateTimeMode: mode,
     showDatePicker: true,
     isStartTime: start,
   });
   }

  _hideDateTimePicker = () => this.setState({ showDatePicker: false });

// takes date input from DateTimePicker and formats it and updates state
_handleDateTimePicked = (date) => {
  if (this.state.dateTimeMode == 'date') {
    let month = '';
    switch (date.getMonth()) {
      case 0:
        month = "Jan";
        break;
      case 1:
        month = "Feb";
        break;
      case 2:
        month = "Mar";
        break;
      case 3:
        month = "Apr";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "Jun";
        break;
      case 6:
        month = "Jul";
        break;
      case 7:
        month = "Aug";
        break;
      case 8:
        month = "Sep";
        break;
      case 9:
        month = "Oct";
        break;
      case 10:
        month = "Nov";
        break;
      case 11:
        month = "Dec";
    }

    let selectedDate = month + ' ' + date.getDate();

    this.setState({
      dateInput: selectedDate,
    })

    if(selectedDate !== this.saved.dateInput) {
      this.setState({changed: true})
    }
    else {
      this.setState({changed: false})
    }
  } else {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let time = hours + ':' + minutes + ' ' + ampm;

    if(this.state.isStartTime) {
    this.setState({
      startTimeInput: time,
    })

    if(time !== this.saved.startTimeInput) {
      this.setState({changed: true})
    }
    else {
      this.setState({changed: false})
    }
  }
    else {
      this.setState({
        endTimeInput: time,
        endTimeColor: 'black',
        endTimeEmpty: false,
      })

      if(time !== this.saved.endTimeInput) {
        this.setState({changed: true})
      }
      else {
        this.setState({changed: false})
      }
    }
  }

  this._hideDateTimePicker();
};

  // checks if input is satisfactory or not, return true if input is blank
  _inputChecker = (item) => {
    return (!item.trim().length);
  };

  render() {
    const {goBack} = this.props.navigation;
    const minHeight = 55; // min height for all inputs
    const descriptionLength = 100; // character limit for description
    const fieldLength = 35; // character limit for other fields
     return (
       <Container>
       <Header>
         <Left style={{flex:1}}>
           {!this.state.changed && <Button transparent onPress={() => {
             Keyboard.dismiss();
             goBack();
           }}>
             <Icon name='arrow-back'/>
           </Button>}
           {this.state.changed && <Button transparent onPress={() => {
             Keyboard.dismiss();
             this.onCancel();
           }}>
             <Text>Cancel</Text>
           </Button>}
         </Left>
         <Body style={{flex:1}}>
           <Title>Edit Event</Title>
          </Body>
          <Right style={{flex:1}}>
            {this.state.changed && <Button transparent onPress={() => {
              Keyboard.dismiss();
              this._submit();
            }}>
              <Text>Save</Text>
            </Button>}
          </Right>
       </Header>
       <Content>
         <Form>
           <Item inlineLabel
             error={this.state.titleError ? true : false}>
             <Input
               placeholder='Enter Event Name...'
               placeholderTextColor='dimgrey'
               style={{height: minHeight}}
               autoCapitalize={'sentences'}
               value={this.state.titleInput}
               maxLength={fieldLength}
               onChangeText={(titleInput) => {
                 this.setState({
                   titleInput,
                   titleError: this._inputChecker(titleInput)})

                 if(titleInput !== this.saved.titleInput) {
                   this.setState({changed: true})
                 }
                 else {
                   this.setState({changed: false})
                 }
                 }}/>
           </Item>
           <Item inlineLabel
             error={this.state.hostError ? true : false}>
             <Icon name='person'/>
             <Input
             placeholder='Host'
             placeholderTextColor='dimgrey'
             maxLength={fieldLength}
             style={{height: minHeight}}
             autoCapitalize={'sentences'}
             value={this.state.hostInput}
             onChangeText={(hostInput) => {
               this.setState({
                 hostInput,
                 hostError: this._inputChecker(hostInput)})

                 if(hostInput !== this.saved.hostInput) {
                   this.setState({changed: true})
                 }
                 else {
                   this.setState({changed: false})
                 }
             }}/>
           </Item>
           <Item inlineLabel>
               <Icon name='calendar'/>
               <Label style={{color: 'black'}} onPress={() => {
                 this._showDateTimePicker('date')}}>
                 {this.state.dateInput}
               </Label>
             <Input
               style={{height: minHeight}}
               editable={false}/>
           </Item>
           <Item inlineLabel>
             <Icon name='time'/>
             <Label style={{color: 'black'}} onPress={() => {
               this._showDateTimePicker('time', true)}}>
             {this.state.startTimeInput}
            </Label>
             <Input
               style={{height: minHeight}}
               editable={false}/>
           </Item>
           <Item inlineLabel>
             <Icon name='time'/>
            <Label style={{color: this.state.endTimeColor}} onPress={() => {
             this._showDateTimePicker('time', false)}}>
            {this.state.endTimeInput}
            </Label>
             <Input
               style={{height: minHeight}}
               editable={false}/>
           </Item>
           <Item inlineLabel
             error={this.state.locationError ? true : false}>
             <Icon name='pin'/>
             <Input
               style={{height: minHeight}}
               autoCapitalize={'sentences'}
               placeholder='Location'
               placeholderTextColor='dimgrey'
               value={this.state.locationInput}
               maxLength={fieldLength}
               onChangeText={(locationInput) => {
                 this.setState({
                   locationInput,
                   locationError: this._inputChecker(locationInput)})

                   if(locationInput !== this.saved.locationInput) {
                     this.setState({changed: true})
                   }
                   else {
                     this.setState({changed: false})
                   }
               }}/>
           </Item>
           <Item inlineLabel>
             <Icon name='list'/>
             <Input
               placeholder='Description (optional)'
               placeholderTextColor='dimgrey'
               style={{
                 height: Math.max(minHeight, this.state.descriptionHeight)}} // autoresizes
               autoCapitalize={'sentences'}
               maxLength={descriptionLength}
               multiline
               value={this.state.descriptionInput}
               onChange={(event) => this.setState({
                 descriptionHeight: event.nativeEvent.contentSize.height, // set appropriate height
               })}
               onChangeText={(descriptionInput) => {
                 this.setState({descriptionInput})

                 if(descriptionInput !== this.saved.descriptionInput) {
                   this.setState({changed: true})
                 }
                 else {
                   this.setState({changed: false})
                 }
               }}/>
           </Item>
         </Form>
         <DateTimePicker
         isVisible={this.state.showDatePicker}
         onConfirm={this._handleDateTimePicked}
         onCancel={this._hideDateTimePicker}
         mode={this.state.dateTimeMode}
         is24Hour={false}/>
       </Content>
      </Container>
     );
  }
}
