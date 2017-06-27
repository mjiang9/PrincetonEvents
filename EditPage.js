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
    const { name, who, what, when, where } = this.props.navigation.state.params;
    this.state = {
      editing: false,
      saving: false,
      cancel: false,
      curTitle: name,
      curWho: who,
      curWhere: where,
      curDescription: what,
      curWhen: when
    }
  }

  componentWillUnmount() {
    console.log("" + this.state.saving);
    console.log("" + this.state.curTitle + " " + this.state.curWho + " " + this.state.curWhen
  + " " + this.state.curWhen + " " + this.state.curDescription);
  }

  pushNewData = (newName, newWho, newWhere, newWhen, newWhat) => {
    this.setState({
      saving: false,
      curTitle: newName,
      curWho: newWho,
      curWhere: newWhere,
      curDescription: newWhat,
      curWhen: newWhen
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
             when={this.state.curWhen} where={this.state.curWhere} editing={this.state.editing}
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
