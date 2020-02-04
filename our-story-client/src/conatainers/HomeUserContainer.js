import React, { Component, Fragment } from 'react';
import  { connect }         from 'react-redux';
import HomeUserCard         from '../components/HomeUserCard'

class HomeUserContainer extends Component{

      

    render(){
        
        let users = this.props.users.slice(0, 5)
        
        return(
            <Fragment>
            <h1 >Amazing People!:</h1>
            
            <div className="ui two column centered grid">
              { 
              users.length == 5 && users != "loadi" ?  users.map(user => {
                return <HomeUserCard user = {user}/> }) : null
              }

            </div>
          </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(HomeUserContainer);