import React, { Component } from 'react';
import {Container}          from 'react-bootstrap';
import { Divider } from 'semantic-ui-react'

export default class UserInfo extends Component{
    render(){
    
        return(
            <Container fluid>
             <Divider id="divider1"/>
              <h1 id='userNameDetails'>{this.props.user.name}</h1>

               <h3 id='userBio'>{this.props.user.short_bio}</h3>
               <img  id='userPic' src='https://i.imgur.com/e225YR5.jpg' className="rounded-circle"/>
          
           </Container>
        )
    }
}