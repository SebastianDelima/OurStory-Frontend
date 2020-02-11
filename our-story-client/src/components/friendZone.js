import React, { Component, Fragment } from 'react';
import {connect}                      from 'react-redux'
import     * as actions               from '../actionsDirectory/actions';
import {Card, Grid, Image, Item}      from 'semantic-ui-react'

import  NavBar                        from './NavBar'


class FriendZone extends Component{

    render(){
        
        
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
                <Card.Header>Friends</Card.Header>
              
                  <Item.Group columns={2}  link>
              {friends.map(friend =>
            <Card id="friendCards">
                    <Item>
                    <Item.Image size='tiny' src={friend.img} rounded/>

                    <Item.Content>
                        <Item.Header id='friendHeader'>{friend.name}</Item.Header>
                        <Item.Description>
                            {friend.friendships.length} friends
                        </Item.Description>
                       <button className='unfriendButton'>unfriend</button>
                    </Item.Content>
                    </Item>
               </Card>
               
               )}
            </Item.Group>
            
         </Fragment>
        )
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
                setStories: () => dispatch(actions.setStories()),
                setCurrentUser: (user) => dispatch(actions.setCurrentUser(user))}
            
        }
        

    
    export default connect(mapStateToProps, mapDispatchToProps)(FriendZone);