import React, {Component} from 'react';
import {firebaseApp} from './App';
import { StyleProvider, Container, Header, Title, Content, Button,
  Left, Right, Body, Icon, Form, Item, Input, Text, Label, Toast} from 'native-base';
import { Keyboard, Alert, BackHandler } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Geocoder from 'react-native-geocoding';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

Geocoder.setApiKey('AIzaSyCWw2zAT2-MqdG7wP5LoCbw_BIfoFXg4l4');

export default class EditScreen extends Component {
  constructor(props){
    super(props);
    this.extraSpace = 75;
    this.extraSpaceEndTime = 50;
    // checks if endTime or description were filled and changes them to match
    // input page
    this.item = this.props.item;
    let endTime, endTimeColor, isEndTimeEmpty, description;

    if(this.item.endTime == 'N') {
      endTime = 'End (optional)' + ' '.repeat(this.extraSpaceEndTime);
      endTimeColor = 'dimgrey';
      isEndTimeEmpty = true;
    }
    else {
      endTime = this.item.endTime + ' '.repeat(this.extraSpaceEndTime);
      endTimeColor = 'black';
      isEndTimeEmpty = false;
    }

    if(this.item.what == 'N/A') {
      description = '';
    }
    else {
      description = this.item.what;
    }

    this.saved = {
      titleInput: this.item.name,
      hostInput: this.item.who,
      locationInput: this.item.where,
      dateInput: this.item.date + ' '.repeat(this.extraSpace),
      startTimeInput: this.item.startTime + ' '.repeat(this.extraSpace),
      endTimeInput:  endTime,
      endTimeEmpty: isEndTimeEmpty,
      endTimeColor: endTimeColor,
      descriptionInput: description,
    }

    this.state = {
      changed: false,
      saving: false,
      cancel: false,
      titleInput: this.item.name,
      hostInput: this.item.who,
      locationInput: this.item.where,
      dateInput: this.item.date + ' '.repeat(this.extraSpace),
      startTimeInput: this.item.startTime + ' '.repeat(this.extraSpace),
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

  // handles hardwar back button pressed on Android
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.goBack();
      return true;
    });
  }

  // takes new data from input and updates to firebase
  pushNewData = () => {
    this.setState({changed: false})

    let oldDate = this.saved.dateInput.trim();

    // if user wants to continue changing even after submitting
    this.saved = {
      titleInput: this.state.titleInput,
      hostInput: this.state.hostInput,
      startTimeInput: this.state.startTimeInput,
      endTimeInput: this.state.endTimeInput,
      dateInput: this.state.dateInput,
      descriptionInput: this.state.descriptionInput,
      locationInput: this.state.locationInput,
      endTimeEmpty: this.state.endTimeEmpty,
      endTimeColor: this.state.endTimeColor,
    }

    // required fields which we know will be filled
    let updateData = {
       name: this.saved.titleInput,
       what: this.saved.descriptionInput,
       startTime: this.saved.startTimeInput.trim(),
       endTime: this.saved.endTimeInput.trim(),
       where: this.saved.locationInput,
       who: this.saved.hostInput,
     }

     // checks optional fields
     if(this._inputChecker(this.state.descriptionInput))
     updateData.what = 'N/A';

     if(this.state.endTimeEmpty)
     updateData.endTime = 'N';

     Geocoder.getFromLocation(this.saved.locationInput + " Princeton").then(
       json => { var location = json.results[0].geometry.location;
         updateData.latitude = location.lat;
         updateData.longitude = location.lng;
         // updates the old event; if there is new date, deletes old event and
         // moves event to under new date while retaining event key
         try{
         let itemsRef = firebaseApp.database().ref('items');
         let oldEventRef = itemsRef.child(oldDate + '/' + this.item.key);

         if (oldDate != this.saved.dateInput.trim()) {
           oldEventRef.remove();
           itemsRef.child(this.saved.dateInput.trim()).child(this.item.key).update(updateData);
         }
         else {
           oldEventRef.update(updateData);
         }

         Toast.show({
             text: 'Saved!',
             position: 'bottom',
             duration: 2300,
           })
       }
       catch(err) {
         alert(err);
         }
       },
       error => {
         Alert.alert('', 'No Geolocation Found.');
         updateData.latitude = 0;
         updateData.longitude = 0;

         try{
         let itemsRef = firebaseApp.database().ref('items');
         let oldEventRef = itemsRef.child(oldDate + '/' + this.item.key);

         if (oldDate != this.saved.dateInput.trim()) {
           oldEventRef.remove();
           itemsRef.child(this.saved.dateInput.trim()).child(this.item.key).update(updateData);
         }
         else {
           oldEventRef.update(updateData);
         }

         Toast.show({
             text: 'Saved!',
             position: 'bottom',
             duration: 2300,
           })
       }
       catch(err) {
         alert(err);
         }
       }
     );
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
      locationError: false,
      endTimeEmpty: this.saved.endTimeEmpty,
      endTimeColor: this.saved.endTimeColor,
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
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let selectedDate = months[date.getMonth()] + ' ' + date.getDate();
    selectedDate += ' '.repeat(this.extraSpace); // makes label longer

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
    let startTime = time + ' '.repeat(this.extraSpace); // makes label longer
    let endTime = time +  ' '.repeat(this.extraSpaceEndTime);

    if(this.state.isStartTime) {
    this.setState({
      startTimeInput: startTime,
    })

    if(startTime !== this.saved.startTimeInput) {
      this.setState({changed: true})
    }
    else {
      this.setState({changed: false})
    }
  }
    else {
      this.setState({
        endTimeInput: endTime,
        endTimeColor: 'black',
        endTimeEmpty: false,
      })

      if(endTime !== this.saved.endTimeInput) {
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

  // removes selected event
  _delete = () => {
  try {
    let itemsRef = firebaseApp.database().ref('items');
    let oldEventRef = itemsRef.child(this.saved.dateInput.trim() + '/' + this.item.key);
    oldEventRef.remove();

  } catch (err) {
    alert(err);
  }
}

  render() {
    const minHeight = 55; // min height for all inputs
    const descriptionHeight = 100 // min height for description
    const descriptionLength = 100; // character limit for description
    const fieldLength = 35; // character limit for other fields
     return (
       <StyleProvider style={getTheme(material)}>
       <Container>
       <Header>
         <Left style={{flex:1}}>
           {!this.state.changed && <Button transparent onPress={() => {
             Keyboard.dismiss();
             this.props.goBack();
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
            {!this.state.changed && <Button transparent onPress={() => {
              Keyboard.dismiss();
              Alert.alert(
                '',
                'Are You Sure You Want To Remove This Event?',
                [
                  {text: 'Cancel', style: 'cancel'},
                  {text: 'Yes', onPress: () => {
                    this._delete();
                    this.props.goBack();
                  }},
                ],
                { cancelable: false }
              )

            }}>
              <Icon name='trash'/>
            </Button>}
          </Right>
       </Header>
       <Content style={{backgroundColor: 'white'}}>
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
            {!this.state.endTimeEmpty && <Icon name='close-circle' onPress={() => {
                  this.setState({
                    endTimeInput: 'End (optional)' + ' '.repeat(this.extraSpaceEndTime),
                    endTimeColor: 'dimgrey',
                    endTimeEmpty: true,
                })

                if(!this.saved.endTimeEmpty ) {
                  this.setState({changed: true})
                }
                else {
                  this.setState({changed: false})
                }
              }}/>}
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
                 height: Math.max(descriptionHeight, this.state.descriptionHeight)}} // autoresizes
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
         minimumDate={new Date()}
         is24Hour={false}/>
       </Content>
      </Container>
      </StyleProvider>
     );
  }
}
