import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Edit from './Edit';
import EditingButtons from './EditingButtons';
import NormalButtons from './NormalButtons';
import {firebaseApp} from './App';

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

  componentWillUnmount() {
    console.log(this.state);
  }

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
       who: newWho.toString()
}
     let ref = firebaseApp.database().ref().child('items' + '/' + this.params.date + '/' + this.params.key);
     ref.parent.update(newDate.toString());
     ref.update(updateData);
  };

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
    var styles = require('./Styles');
     return (
       <View style={{
         flex: 1
       }}>
         <View style={styles.body}>
           <Edit title={this.state.curTitle} who={this.state.curWho} description={this.state.curDescription}
             time={this.state.curTime} date={this.state.curDate} where={this.state.curWhere} change={this.onChanged}
             saving={this.state.saving} cancel={this.state.cancel} pushData={this.pushNewData}/>
         </View>
        {this.state.changed && <EditingButtons save={this.onSave} cancel={this.onCancel}/>}
       </View>
     );
  }
}
