import React, { Component }  from 'react';
import {Card, Button, Image} from 'semantic-ui-react'
import     { connect }       from 'react-redux';

 class HomeUserCard extends Component{

  sendFriendRequest = (e) => {
    // friend id parseInt(e.currentTarget.id) 
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

  }

    render(){
      let faces=['https://cdn-prod.medicalnewstoday.com/content/images/headlines/313/313264/african-woman-s-face.jpg','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWnU2WlEm8DcWAMzFr7u8JZ3QifzB9bDLi1kvsA2w7l1SlGxP2','https://images.pexels.com/photos/2092709/pexels-photo-2092709.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500']
        return(
          <Card.Group  itemsPerRow={2} >
            {this.props.users.length == 4 && this.props.users != "load" ? 
                     this.props.users.map(user => {
                       return(
                      <Card >
                        <Image  src={faces[Math.floor(Math.random() * 3) + 1 ]}/>
                        <Card.Content>
                      <Card.Header>{user.name}</Card.Header>
                      <Card.Description>
                        {user.short_bio}
                        <Button id={user.id} size='mini' color='blue' onClick={(e) => this.sendFriendRequest(e)}>Add friend</Button>
                      </Card.Description>
                      </Card.Content>
                     </Card>)})
                     : null
                     }
           
             </Card.Group>
          )
        }
      }
  

      const mapStateToProps = (state) => {
        return {
            currentUser: state.currentUser
        }
    }
    
    export default connect(mapStateToProps)(HomeUserCard);