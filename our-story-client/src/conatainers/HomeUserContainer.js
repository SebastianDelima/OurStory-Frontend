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


{/* <Card style={{ width: '60rem',height: '68rem'}}>
 <h1 id='a-title' >Amazing People!:</h1>
 <CardDeck >
   { 
   users.length == 4 && users != "load" ?  users.slice(0,2).map(user => {
     return <HomeUserCard user = {user}/> }) : null
   }
   <p></p>
</CardDeck>
<CardDeck >
{ 
   users.length == 4 && users != "load" ?  users.slice(2,4).map(user => {
     return <HomeUserCard user = {user}/> }) : null
   }
   </CardDeck>
   </Card> */}