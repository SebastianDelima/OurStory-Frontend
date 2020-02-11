import React, { Component, Fragment } from 'react';
import  { connect }         from 'react-redux';
import HomeUserCard         from '../components/HomeUserCard'
import { Card}              from 'semantic-ui-react'

class HomeUserContainer extends Component{

      

    render(){
        
        let users = this.props.users.slice(0, 4)
        
        return(
            <Fragment>
                    <h1 className="a-title">Amazing People!</h1>
                   
                        <HomeUserCard users={users}/>
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


