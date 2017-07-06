import React, {Component} from 'react';
import TabBar from './Tab';
import {firebaseApp} from './App';
import { Container, Header, Title, Content, Footer, FooterTab, Button,
  Left, Right, Body, Icon, Form, Item, Input, Text, Label} from 'native-base';
import { Keyboard, View} from 'react-native';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyCWw2zAT2-MqdG7wP5LoCbw_BIfoFXg4l4');

export default class InputScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      submit: false,
      titleInput: '',
      hostInput: '',
      locationInput: '',
      dateInput: '',
      timeInput: '',
      descriptionInput: '',
      titleError: false,
      hostError: false,
      locationError: false,
      dateError: false,
      timeError: false
  }
}
  // pushes input to firebase and stores in appropriate location
  submitData = () => {
    let data = {
      name: this.state.titleInput,
      what: this.state.descriptionInput,
      when: this.state.timeInput,
      where: this.state.locationInput,
      who: this.state.hostInput,
      latitude: 40.3440, // defaults
      longitude: -74.6514
    }

    if(data.what == '')
    data.what = 'N/A'

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
      }
    );
    // return to last page
    this.props.navigation.goBack();
  };

  // checks if all input is filled out
  _submit = () => {
    this.setState({
      titleError: !this._inputChecker(this.state.titleInput),
      hostError: !this._inputChecker(this.state.hostInput),
      dateError: !this._inputChecker(this.state.dateInput),
      timeError: !this._inputChecker(this.state.timeInput),
      locationError: !this._inputChecker(this.state.locationInput),
    })

    if(!this.state.titleError && !this.state.hostError && !this.state.dateError
    && !this.state.timeError && !this.state.locationError)
    this.submitData();
    else {
        // toast goes here
    }
  };

  // checks if input is satisfactory or not
  _inputChecker = (item) => {
    return (item != '');
  };

  render() {
    var styles = require('./Styles');
    const {goBack} = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left style={{flex:1}}>
            <Button onPress={() => {
              goBack();
              Keyboard.dismiss();
            }}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body style={{flex:1}}>
            <Title>Add Event</Title>
           </Body>
           <Right style={{flex:1}}>
            <Button onPress={() => {
               this._submit();
               Keyboard.dismiss();
             }}>
               <Text>Submit</Text>
             </Button>
           </Right>
        </Header>
        <Content>
          <Form>
            <Item inlineLabel
              error={this.state.titleError ? true : false}>
              <Label>Title</Label>
              <Input
                style={{marginLeft: 1}}
                autoCapitalize={'sentences'}
                value={this.state.titleInput}
                onChangeText={(titleInput) => {
                  this.setState({
                    titleInput,
                    titleError: !this._inputChecker(titleInput)})
                  }}/>
                {this.state.titleError && <Icon name='close-circle'/>}
            </Item>
            <Item inlineLabel
              error={this.state.hostError ? true : false}>
              <Label>Host</Label>
              <Input
              style={{marginLeft: 1}}
              autoCapitalize={'sentences'}
              value={this.state.hostInput}
              onChangeText={(hostInput) => {
                this.setState({
                  hostInput,
                  hostError: !this._inputChecker(hostInput)})
              }}/>
              {this.state.hostError && <Icon name='close-circle'/>}
            </Item>
            <Item inlineLabel
              error={this.state.dateError ? true : false}>
              <Label>Date</Label>
              <Input
                style={{marginLeft: 1}}
                autoCapitalize={'sentences'}
                value={this.state.dateInput}
                onChangeText={(dateInput) => {
                  this.setState({
                    dateInput,
                    dateError: !this._inputChecker(dateInput)})
                }}/>
                {this.state.dateError && <Icon name='close-circle'/>}
            </Item>
            <Item inlineLabel
              error={this.state.timeError ? true : false}>
              <Label>Time</Label>
              <Input
                style={{marginLeft: 1}}
                autoCapitalize={'sentences'}
                value={this.state.timeInput}
                onChangeText={(timeInput) => {
                  this.setState({
                    timeInput,
                    timeError: !this._inputChecker(timeInput)})
                }}/>
                {this.state.timeError && <Icon name='close-circle'/>}
            </Item>
            <Item inlineLabel
              error={this.state.locationError ? true : false}>
              <Label>Location</Label>
              <Input
                style={{marginLeft: 1}}
                value={this.state.locationInput}
                onChangeText={(locationInput) => {
                  this.setState({
                    locationInput,
                    locationError: !this._inputChecker(locationInput)})
                }}/>
                {this.state.locationError && <Icon name='close-circle'/>}
            </Item>
            <Item inlineLabel>
              <Label>Description (optional)</Label>
              <Input
                style={{
                  marginLeft: 1,
                  height: 100}}
                multiline
                autoCapitalize={'sentences'}
                value={this.state.descriptionInput}
                onChangeText={(descriptionInput) => this.setState({descriptionInput})}/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
