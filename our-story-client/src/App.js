import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actionsDirectory/actions';

import './App.css';

class App extends Component {

  componentDidMount = () => {
   this.props.setUsers()
   this.props.setStories()
  }


  render(){
 debugger
    return (
    <div >hello
     { 
    //  this.props.users[0].name
       this.props.users.length === 0  ? <h1>loading...</h1> : 
       <div>
         <h1>{this.props.users[0].name}</h1>
         <h1>{this.props.stories[0].title}</h1>
       </div>
      }
    </div>

    )

  }

}

const mapDispatchToProps = (dispatch) => {

   return {

     setUsers: ()   => dispatch(actions.getUsers()),
     setStories: () => dispatch(actions.setStories())

   }

}

const mapStateToProps = (state) => {

  return {
    users:   state.users,
    stories: state.stories
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
