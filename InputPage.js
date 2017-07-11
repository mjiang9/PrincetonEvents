import React, {Component} from 'react';
import TabBar from './Tab';
import {firebaseApp} from './App';
import { Container, Header, Title, Content, Button,
  Left, Right, Body, Icon, Form, Item, Input, Text, Label, Toast} from 'native-base';
import { Keyboard } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyCWw2zAT2-MqdG7wP5LoCbw_BIfoFXg4l4');

export default class InputScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      titleInput: '',
      hostInput: '',
      locationInput: '',
      dateInput: 'Date',
      startTimeInput: 'Start',
      endTimeInput: 'End (optional)',
      descriptionInput: '',
      titleError: false,
      hostError: false,
      locationError: false,
      dateError: false,
      startTimeError: false,
      descriptionHeight: 0,
      showDatePicker: false,
      dateTimeMode: 'date',
      isStartTime: true,
      startTimeColor: 'dimgrey',
      endTimeColor: 'dimgrey',
      dateColor: 'dimgrey',
      dateEmpty: true,
      startTimeEmpty: true,
      endTimeEmpty: true,
  }
}
  // pushes input to firebase and stores in appropriate location
  submitData = () => {
    let data = {
      name: this.state.titleInput,
      what: this.state.descriptionInput,
      startTime: this.state.startTimeInput,
      endTime: this.state.endTimeInput,
      where: this.state.locationInput,
      who: this.state.hostInput,
      latitude: 40.3440, // defaults
      longitude: -74.6514
    }

    if(this._inputChecker(data.what))
    data.what = 'N/A';

    if(this.state.endTimeEmpty)
    data.endTime = 'N';

    // reference to new event
    // gets location information and then adds event
    let ref = firebaseApp.database().ref('items').child(this.state.dateInput);

    Geocoder.getFromLocation(this.state.locationInput + " Princeton").then(
      json => { var location = json.results[0].geometry.location;
        data.latitude = location.lat;
        data.longitude = location.lng;
        ref.push(data);
      },
      error => {
        alert(error);
        ref.push(data);
      }
    );
    // return to last page
    this.props.navigation.goBack();
  };

  // checks if all input is filled out
  _submit = () => {
    // checks for errors and if so, highlights the line
    let submission = {
      titleError: this._inputChecker(this.state.titleInput),
      hostError: this._inputChecker(this.state.hostInput),
      dateError: this.state.dateEmpty,
      startTimeError: this.state.startTimeEmpty,
      locationError: this._inputChecker(this.state.locationInput),
    }

    this.setState({
      titleError: submission.titleError,
      hostError: submission.hostError,
      dateError: submission.dateError,
      startTimeError: submission.startTimeError,
      locationError: submission.locationError,
    })

    // if all set, pushes data to server, else sends error toast
    if(!submission.titleError && !submission.hostError && !submission.dateError
    && !submission.startTimeError && !submission.locationError)
    this.submitData();
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
      dateError: false,
      dateColor: 'black',
      dateEmpty: false,
    })
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
      startTimeError: false,
      startTimeColor: 'black',
      startTimeEmpty: false,
    })
  }
    else {
      this.setState({
        endTimeInput: time,
        endTimeColor: 'black',
        endTimeEmpty: false,
      })
    }
  }

  this._hideDateTimePicker();
};

  // checks if input is satisfactory or not, return true if input is blank
  _inputChecker = (item) => {
    return (!item.trim().length);
  };

  render() {
    var styles = require('./Styles');
    const {goBack} = this.props.navigation;
    const minHeight = 55; // min height for all inputs
    const descriptionLength = 100; // character limit for description
    const fieldLength = 35; // character limit for other fields
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => {
              Keyboard.dismiss();
              goBack();
            }}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body >
            <Title>Add Event</Title>
           </Body>
           <Right >
            <Button transparent onPress={() => {
               Keyboard.dismiss();
               this._submit();
             }}>
               <Text>Submit</Text>
             </Button>
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
              }}/>
            </Item>
            <Item inlineLabel
              error={this.state.dateError ? true : false}>
                <Icon name='calendar'/>
                <Label style={{color: this.state.dateColor}} onPress={() => {
                  this._showDateTimePicker('date')}}>
                  {this.state.dateInput}
                </Label>
              <Input
                style={{height: minHeight}}
                editable={false}/>
            </Item>
            <Item inlineLabel
              error={this.state.startTimeError ? true : false}>
              <Icon name='time'/>
              <Label style={{color: this.state.startTimeColor}} onPress={() => {
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
                onChangeText={(descriptionInput) => this.setState({descriptionInput})}/>
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
    );
  }
}
