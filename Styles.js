'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

var width = Dimensions.get('window').width;

module.exports = StyleSheet.create({
item: {
  padding: 10,
},
sectionHeader: {
  color: '#f89854',
  fontWeight: '500',
  backgroundColor: '#fde2ce',
  fontSize: 16,
  paddingTop: 2,
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 2,
},
loginHeader:{
  fontSize: 30,
  color: 'white',
  paddingBottom: 100,
},
loginContainer:{
  flex:1,
  backgroundColor: '#f9a56a',
  alignItems: 'center',
  paddingTop: 150,
  paddingLeft: 15,
  paddingRight: 15,

},
loginInput:{
  padding:5,
  fontSize:15,
  height: 40,
  backgroundColor: 'rgba(255,255,255, .7)',
  margin: 5,
  width: width*.8
},
loginButton:{
  backgroundColor:'gray',
  padding: 5,
  margin:10,
},
loginText:{
  color:'white',
}

});
