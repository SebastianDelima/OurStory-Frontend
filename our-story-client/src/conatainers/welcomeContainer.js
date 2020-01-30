import React, { Component } from 'react';
import LoginModal from '../components/loginModal'
import SignUpModal from '../components/signUpModal'

export class welcomeContainer extends Component{

    constructor(){
        super()
        this.state = {
            showLogin:  null,
            showSignUp: null
        }
    }

    showModal = (e, type) => {
       if(type === 'logIn'){
        this.setState({
            showLogin: true
        })

       }else if (type ==='signUp'){
        this.setState({
            showSignUp: true
        })
      }else if (type === 'submit'){
        this.setState({
            showLogin:  null,
            showSignUp: null
        })
      }
    }

    render(){
        return (
           
            <div>
                
                welcome!
                <button onClick={e => {this.showModal(e, "logIn")}}>log in</button>
                <button onClick={e => {this.showModal(e, "signUp")}}>Sign Up</button>
                { this.state.showLogin  ?  <LoginModal showModal  = {this.showModal}/> : null }
                { this.state.showSignUp ?  <SignUpModal showModal = {this.showModal}/> : null }
               
            </div>
        )
    }
   
}

