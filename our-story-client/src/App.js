import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actionsDirectory/actions';

import './App.css';
import { SET_USERS } from './actionsDirectory/constants';

class App extends Component {

  componentDidMount = () => {
   this.props.setUsers()
  }


  render(){
 debugger
    return (
    <div >hello
     { 
    //  this.props.users[0].name
       this.props.users.length === 0 ? <h1>loading...</h1> : this.props.users[0].name
      }
    </div>

    )

  }

}

const mapDispatchToProps = (dispatch) => {

   return {
     setUsers: () => dispatch(actions.getUsers())
     

   }
}

const mapStateToProps = (state) => {

  return {
    users: state.users
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
