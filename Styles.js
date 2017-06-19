'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

header: {
  paddingTop: 20,
  flex: 1,
  backgroundColor: '#f9a56a',
  justifyContent: 'center',
},
title: {
  textAlign: 'center',
  fontSize: 28,
  fontWeight: '500',
  color: 'white',
  fontFamily:'AvenirNext-Regular'
},
body: {
  flex: 10,
  backgroundColor: 'white',
},
item: {
  padding: 10,
},
sectionHeader: {
  color: 'white',
  fontFamily:'AvenirNext-Regular',
  fontWeight: '500',
  backgroundColor: '#ffd199',
  fontSize: 16,
  paddingTop: 2,
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 2,
},
footer: {
  flex: 1,
},
button: {
  backgroundColor: '#f9a56a',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
container:{
  marginTop:20,
  marginBottom:0,
  marginLeft:15,
  marginRight:15,
  padding:10,
  backgroundColor:'#f9a56a'
},
inputText:{
  fontSize:15,
  fontFamily:'AvenirNext-Regular',
  color:'white',
  fontWeight: '500',
  textAlign: 'center',
},
normInput:{
  height:40,
  backgroundColor:'white',
  padding:5
},
descriptionInput:{
  height:100,
  backgroundColor:'white',
  padding:5,
},
buttonContainer:{
  backgroundColor:'#f9a56a',
  padding:10,
  marginTop: 20
},

});
