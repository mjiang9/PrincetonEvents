import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Input from './Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {firebaseApp} from './App';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyCWw2zAT2-MqdG7wP5LoCbw_BIfoFXg4l4');

export default class InputScreen extends Component {
  constructor(props){
    super(props);
    const {navigate} = this.props.navigation;
    this.state = {
      submit: false
    }
  }


  static navigationOptions = {
      tabBarLabel: 'Input',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name = {'add-circle'}
          size = {26}
          style = {{color: tintColor}} />
      )

  }

  // pushes input to firebase and stores in appropriate location
  submitData = (inputName, inputWho, inputWhere, inputDate, inputTime, inputWhat) => {
    if(inputName == '')
    inputName = 'TBD';

    if(inputWho == '')
    inputWho = 'TBD';

    if(inputDate == '')
    inputDate = 'TBD';

    if (inputTime == '')
    inputTime = 'TBD';

    if(inputWhat == '')
    inputWhat = 'N/A';

    let data = {
      name: inputName,
      what: inputWhat,
      when: inputTime,
      where: inputWhere,
      who: inputWho,
      latitude: 40.3440, // defaults
      longitude: -74.6514
    }

    let ref = firebaseApp.database().ref('items').child(inputDate);

    if(inputWhere == '') {
      data.where = 'TBD';
      ref.push(data);
    } else {
      Geocoder.getFromLocation(inputWhere + " Princeton").then(
      json => { var location = json.results[0].geometry.location;
        data.latitude = location.lat;
        data.longitude = location.lng;
        ref.push(data);
      },
      error => {
        alert(error);
      }
    );
    }
    this.props.navigation.navigate('Home');
  };

  _submit = () => {
    this.setState({
      submit: true
    });
  };

  render() {
    var styles = require('./Styles');
    return (
      <View style={{
        flex: 1
      }}>
        <View style={styles.body}>
          <Input submitData={this.submitData} submit={this.state.submit}/>
        </View>
        <View style={styles.footer}>
          <TouchableHighlight style={styles.button} onPress={() => navigate('Home')} underlayColor='#ffd199'>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => this._submit()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
