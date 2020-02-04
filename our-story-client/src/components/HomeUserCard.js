import React, { Component } from 'react';

export default class HomeUserCard extends Component{
    render(){
    
        return(
       
            <div class="card">
            <img src={this.props.user.img} alt="Avatar" />
            <div class="container">
              <h4><b>{this.props.user.name}</b></h4>
              <p>{this.props.user.short_bio}</p>
            </div>
          </div>
        )
    }
}