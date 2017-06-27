import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Input from './Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {firebaseApp} from './App';


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

  submitData = (inputName, inputWho, inputWhere, inputDate, inputTime, inputWhat) => {
    if(inputName == '')
    inputName = 'TBD';

    if(inputWho == '')
    inputWho = 'TBD';

    if(inputWhere == '')
    inputWhere = 'TBD';

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
      who: inputWho
    }
    let ref = firebaseApp.database().ref('items/' + inputDate);
    ref.push(data);
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
