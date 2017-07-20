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
  alignSelf: 'center',
  fontFamily: 'Roboto',
  marginTop: 40,
  marginBottom: 100
},
errorText : {
  fontSize: 15,
  color: 'red',
  alignSelf: 'center',
  fontFamily: 'Roboto',
  marginTop: 5,
},
loginContainer:{
  flex:1,
  backgroundColor: '#f9a56a',
  alignItems: 'center',
  paddingTop: 40,
  paddingLeft: 15,
  paddingRight: 15,
  justifyContent: 'center',
},
loginInput:{
  padding:5,
  fontSize:15,
  height: 55,
  backgroundColor: 'rgba(255,255,255, .7)',
  margin: 5,
  width: width*.8,
  fontFamily: 'Roboto',
},
loginButton:{
  backgroundColor:'gray',
  padding: 5,
  margin:10,
},
loginText:{
  color:'white',
  fontSize: 18,
  fontFamily: 'Roboto',
}

});
