import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Edit from './Edit';
import EditingButtons from './EditingButtons';
import NormalButtons from './NormalButtons';

export default class EditScreen extends Component {
  constructor(props){
    super(props);
    const {navigate} = this.props.navigation;
    const { name, who, what, time, date, where } = this.props.navigation.state.params;
    this.state = {
      editing: false,
      saving: false,
      cancel: false,
      curTitle: name,
      curWho: who,
      curTime: time,
      curDate: date,
      curDescription: what,
      curWhere: where
    }
  }

  componentWillUnmount() {
    console.log("" + this.state.saving);
    console.log("" + this.state.curTitle + " " + this.state.curWho + " " + this.state.curTime
     + " " + this.state.curDescription);
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
  };

  onEdit = () => {
      this.setState({editing: true});
    };


  onSave = () => {
    this.setState({
      saving: true,
      editing: false
    });
  };

  onCancel = () => {
    this.setState({
      cancel: !this.state.cancel,
      editing: false
    });
  };


  render() {
    var styles = require('./Styles');
     return (
       <View style={{
         flex: 1
       }}>
         <View style={styles.body}>
           <Edit title={this.state.curTitle} who={this.state.curWho} description={this.state.curDescription}
             time={this.state.curTime} date={this.state.curDate} where={this.state.curWhere} editing={this.state.editing}
             saving={this.state.saving} cancel={this.state.cancel} pushData={this.pushNewData}/>
         </View>
         <View style= {{flex: 1}}>
           {this.state.editing && <EditingButtons save={this.onSave} cancel={this.onCancel}/>}
           {!this.state.editing && <NormalButtons edit={this.onEdit}/>}
         </View>
       </View>
     );
  }
}
