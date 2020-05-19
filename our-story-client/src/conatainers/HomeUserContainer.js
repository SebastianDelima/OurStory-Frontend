import React, { Component, Fragment } from 'react';
import  { connect }                   from 'react-redux';
import HomeUserCard                   from '../components/HomeUserCard'

class HomeUserContainer extends Component{
      
  constructor(){
    super()
    this.state = {
      users: null
    }
  }
      
  componentDidMount = () => {
   
    if(this.props.users !== "loading" && this.props.users && this.props.currentUser){
    let usersArray = []
    let included = "not"
     
    this.props.users.forEach(user => {
      if(user.id !== this.props.currentUser.id ){
       
   
           included = false
       user.friendships.forEach(friendship => {
         if(friendship.friend_a_id === this.props.currentUser.id || friendship.friend_b_id === this.props.currentUser.id){
          usersArray.push(
            {
            user: user,
            isFriend: true,
            request: false
            }
            )
            included = true
         } 
       })
       
       this.props.currentUser.friend_requests_as_receiver.forEach(request => {
         
         if(request.requestor_id === user.id){
          usersArray.push(
            {
            user: user,
            isFriend: false,
            request: true
            }
            )
            included = true
         }
        })
           if( included === false){
         
            usersArray.push(
              {
                user: user,
                isFriend: false,
                request: false
              }
              )
            }
      }
    })

    
    this.setState({
      users: usersArray
    })
    }
}

    render(){

      if(this.state.users){
        
        return(
            <Fragment>
              <h1 className="a-title">Community</h1>
              <HomeUserCard users={this.state.users}/>
          </Fragment>
        )
      }else{
        return null
      }
        
    }
}

const mapStateToProps = (state) => {
    return {
      currentUser: state.currentUser,
        users: state.users
    }
}

export default connect(mapStateToProps)(HomeUserContainer);


