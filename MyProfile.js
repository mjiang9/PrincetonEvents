import React, {Component} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {firebaseApp} from './App';
import { StyleProvider, Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, List, ListItem} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import MyEvents from './MyEvents';
import Settings from './Settings';


export default class MyEventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      userEmail: null,
      uid: null,
      userName: null,
    };
    console.ignoredYellowBox = ['Setting a timer'];
  }

  goBack = () => {
    this.setState({
      index: 0
    })
  }

  // autoupdates on new event
  componentDidMount() {
   firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({userEmail: user.email, uid: user.uid});
    } else {
      // No user is signed in.
      console.log('no user')
    }
  });
 }

  render() {
    let AppComponent = null;

     if (this.state.index === 1) {
        AppComponent = MyEvents;
     } else if (this.state.index === 2) {
        AppComponent = MyEvents;  // placeholder for saved events
     } else if (this.state.index === 3) {
        AppComponent = Settings;  // placeholder for update profile
     } else if (this.state.index === 4) {
        AppComponent = Settings;
     }

     if (this.state.index === 0) {
       return (
         <StyleProvider style={getTheme(material)}>
         <Container>
           <Header>
             <Body>
             <Title>{this.state.userEmail}</Title>
             </Body>
           </Header>
           <Content style={{backgroundColor: 'white'}}>
             <List>
               <ListItem icon onPress={() => this.setState({index: 1})}>
                 <Left>
                   <Icon name="calendar" />
                 </Left>
                 <Body>
                   <Text>My Events</Text>
                 </Body>
                 <Right>
                   <Icon name="arrow-forward" />
                 </Right>
               </ListItem>
               <ListItem icon onPress={() => this.setState({index: 2})}>
                 <Left>
                   <Icon name="heart" />
                 </Left>
                 <Body>
                   <Text>Saved Events</Text>
                 </Body>
                 <Right>
                   <Icon name="arrow-forward" />
                 </Right>
               </ListItem>
               <ListItem icon onPress={() => this.setState({index: 3})}>
                 <Left>
                   <Icon name="person" />
                 </Left>
                 <Body>
                   <Text>Update Profile</Text>
                 </Body>
                 <Right>
                   <Icon name="arrow-forward" />
                 </Right>
               </ListItem>
               <ListItem icon onPress={() => this.setState({index: 4})}>
                 <Left>
                   <Icon name="settings" />
                 </Left>
                 <Body>
                   <Text>Settings</Text>
                 </Body>
                 <Right>
                   <Icon name="arrow-forward" />
                 </Right>
               </ListItem>
             </List>
           </Content>
         </Container>
         </StyleProvider>
       );
     } else {
       return (
         <AppComponent goBack={this.goBack}/>
       );
     }
 }
}
