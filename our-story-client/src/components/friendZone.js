import React, { Component, Fragment } from 'react';
import {connect}                      from 'react-redux'
import     * as actions               from '../actionsDirectory/actions';
import {Card, Divider, Image}      from 'semantic-ui-react'
import  NavBar                        from './NavBar'


class FriendZone extends Component{

    unFriend = (e) => {

        let friendId = parseInt(e.currentTarget.classList[0])
        let friendshipId 

        this.props.currentUser.friendships.forEach(friendship => { 
            
           if(friendship.friend_b_id === friendId){

             friendshipId = friendship.id
           }
        })
   
        let objectConfig = {

            method: 'DELETE',
            headers: {
            'Content-Type':'application/json'
            }, 
            body: JSON.stringify({
             id: friendshipId           
            })
        }
         fetch(`http://localhost:3000/friendships/${friendshipId}`, objectConfig)

         fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
         .then(res => res.json())
         .then(user => this.props.setCurrentUser(user))
    }

    render(){
        
        if(this.props.currentUser){
        let friends = []
        let friend_ids = this.props.currentUser.friendships.map(friend => friend.friend_b_id)
         this.props.users.forEach(user => {
            if(friend_ids.includes(user.id)){
             friends.push(user)
            }
        })

        
        return(
            <Fragment>
             <NavBar/>
                 <Card id='friendsContainer'>
                  <h1 id="friendsH1">Friends</h1>
                  <Divider />
                  <Card.Group id='friendsRows' itemsPerRow={2}>
              {friends.map(friend =>
           
           <Card link>
                     <Card.Content>
                        <Image id='friendImage'
                        floated='left'
                        size='tiny'
                        src={friend.img}
                        rounded
                        />
                        <Card.Header>{friend.name}</Card.Header>
                        <Card.Meta>{friend.friendships.length} friends</Card.Meta>
                        <Card.Description>
                            {friend.short_bio}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                       <button className={friend.id} onClick={(e) => this.unFriend(e)} id="unfriendButton">unfriend</button>
                    </Card.Content>          
            </Card>
            
            
            )}
            </Card.Group>
            </Card>
            
            
        
            </Fragment>
        )}else{
            return null
        }
    }
}

const mapStateToProps = (state) =>{
   
    
            return {
                currentUser: state.currentUser,
                users:       state.users
            }
          
        }

        const mapDispatchToProps = (dispatch) => {

            return {
                
                setCurrentUser: (user) => dispatch(actions.setCurrentUser(user))}
            
        }
        

    
    export default connect(mapStateToProps, mapDispatchToProps)(FriendZone);