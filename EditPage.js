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
    this.state = {
      editing: false
    }
  }

  onEdit = () => {
    this.setState({editing: true});
  };

  onSave = () => {
    this.setState({editing: false});
  };

  onCancel = () => {
    this.setState({editing: false});
  };


  render() {
    const {navigate} = this.props.navigation;
    var styles = require('./Styles');
    const { name, who, what, when, where } =
     this.props.navigation.state.params;
     return (
       <View style={{
         flex: 1
       }}>
         <View style={styles.body}>
           <Edit name={name} who={who} what={what} when={when} where={where} editing={this.state.editing}/>
         </View>
         <View style= {{flex: 1}}>
           {this.state.editing && <EditingButtons save={this.onSave} cancel={this.onCancel}/>}
           {!this.state.editing && <NormalButtons edit={this.onEdit}/>}
         </View>
       </View>
     );
  }
}
