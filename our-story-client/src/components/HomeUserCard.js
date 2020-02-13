import React, { Component, Fragment }  from 'react';
import {Card,  Image} from 'semantic-ui-react'
import     { connect }       from 'react-redux';
import     * as actions               from '../actionsDirectory/actions';
import Swal from 'sweetalert2';



 class HomeUserCard extends Component{

   sendFriendRequest = (e) => {
     
     let requestExists   = false
     let allreadyFriends = false

     if(this.props.requests){
     this.props.requests.map(request => {
       if(request.receiver_id === parseInt(e.currentTarget.id) && request.requestor_id === this.props.currentUser.id)
       requestExists = true
      })
    }
      
      if(requestExists === false){
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 1000,
      timerProgressBar: true,
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Friend Request Sent!'
    })
    
    
    let objectConfig = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      }, 
      body: JSON.stringify({
        requestor_id: this.props.currentUser.id,
        receiver_id: parseInt(e.currentTarget.id)
      })
    }
    fetch('http://localhost:3000/friend_requests', objectConfig)
    .then(() => {
      this.props.setFriendRequests()
      this.props.getUsers()
      this.updateUser()
    })

  }else{
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    })
    
    Toast.fire({
      icon: 'info',
      title: 'Friend Request previously Sent!'
    })
  }
}

updateUser = () => {
  fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
              .then(res => res.json())
              .then(user =>  this.props.setCurrentUser(user))
}
render(){
  
  let faces=['https://cdn-prod.medicalnewstoday.com/content/images/headlines/313/313264/african-woman-s-face.jpg','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWnU2WlEm8DcWAMzFr7u8JZ3QifzB9bDLi1kvsA2w7l1SlGxP2','https://images.pexels.com/photos/2092709/pexels-photo-2092709.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500']
  return(
    <Fragment>
          
          <Card.Group id="homeUserGrid" itemsPerRow={2} >
            { this.props.users !== "load" ? 
                     this.props.users.map(user => {

                       return(
                      <Card key={user.user.id}id="homeUserCards">
                        <Image  src={faces[Math.floor(Math.random() * 3) + 1 ]}/>
                        <Card.Content>
                      <Card.Header id="homeHeader">{user.user.name}</Card.Header>
                      <Card.Description id="homeUserDescription">
                        {user.isFriend === false && user.request === false ? 
                        <button className={"allButtons"}id={user.user.id} size='mini' color='blue' onClick={(e) => this.sendFriendRequest(e)}>Add friend</button>
                        :null}
                        {user.request === true ? <i>in friend requests</i> :null }
                        {user.isFriend === true ? <i>friends</i> : null}
                      </Card.Description>
                      </Card.Content>
                     </Card>)})
                     : null
                     }
           
             </Card.Group>
             </Fragment>
          )
        }
      }
  
      const mapDispatchToProps = (dispatch) => {

        return {
          
            setFriendRequests:      () => dispatch(actions.setFriendRequests()),
            getUsers:               () => dispatch(actions.getUsers()),
            setCurrentUser:     (user) => dispatch(actions.setCurrentUser(user))

        }
    }

      const mapStateToProps = (state) => {
        return {
            currentUser: state.currentUser,
            requests:    state.requests
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(HomeUserCard);