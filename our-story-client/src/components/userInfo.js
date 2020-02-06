import React, { Component } from 'react';
import {Container}          from 'react-bootstrap';

export default class UserInfo extends Component{
    render(){
    
        return(
            <Container fluid>
           
              <h1 id='userNameDetails'>{this.props.user.name}</h1>
            
               <img  id='userPic' src='https://i.imgur.com/e225YR5.jpg' className="rounded-circle"/>
          
           </Container>
        )
    }
}