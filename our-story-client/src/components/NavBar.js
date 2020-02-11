import React, { Component, Fragment } from 'react';
import {Link}               from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { Dropdown, Button } from 'semantic-ui-react'
import {connect}            from 'react-redux';
import     * as actions                   from '../actionsDirectory/actions';





class NavBar extends Component{

    constructor(){
        super()
        this.state = {
            friendRequests: null
        }
    }

    createFriendRequestsHash = () => {

        let requestorArr = []
        let requestorHash = []
        let requestorIds = this.props.currentUser.friend_requests_as_receiver.map(request => request.requestor_id)

       this.props.users.forEach(user => {
            if(requestorIds.includes(user.id)){
                requestorArr.push(user)
            }
        })

        requestorArr.map(user => {
            requestorHash.push(
                {
                    key: user.name,
                    text: user.name,
                    value: user.name,
                    image: { avatar: true, src: user.img }
                }
            )
        })
        this.setState({
            friendRequests: requestorHash
        })
        
     }

     handleFriendRequest = (e, type) => {
         
        let name = e.currentTarget.parentElement.parentElement.children[0].innerText
        let friend = this.props.users.find(user => user.name === name)

        let friendRequest = this.props.currentUser.friend_requests_as_receiver.find(request => request.requestor_id === friend.id && request.receiver_id === this.props.currentUser.id )
       
        if(type === "accept"){

            let objectConfig = {
                method: 'POST',
                headers: {
                'Content-Type':'application/json'
                }, 
                body: JSON.stringify({

                 friend_a_id: this.props.currentUser.id,
                 friend_b_id: friend.id
                
                })
            }

            fetch('http://localhost:3000/friendships', objectConfig)
            

            
        }
                let objectConfig2 = {
                    method: 'DELETE',
                    headers: {
                    'Content-Type':'application/json'
                    }, 
                    body: JSON.stringify({
    
                     id: friendRequest.id
                    
                    })
                }
                 fetch(`http://localhost:3000/friend_requests/${friendRequest.id}`, objectConfig2)
               

     }

     componentDidMount = () => {

        if(this.props.currentUser){this.createFriendRequestsHash()} 

     }

    render(){

        return(
            <Fragment>

            <nav id="navBar" className="navbar ">
            <NavLink to='/home' id='OurStorylogo'className="navbar-brand" >OurStory</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent"> </div>
           
            <div id='searchInput'>
                <img id='search' src='https://cdn4.iconfinder.com/data/icons/basic-user-interface-2/512/User_Interface-25-512.png' alt='nada'/>
                </div>
                {this.state.friendRequests ? 
                <Dropdown                   
                icon='add user'
                floating
                className='icon'
                >
                    <Dropdown.Menu>
                    <Dropdown.Header content="Friend Requests"/>
                    {this.state.friendRequests.map(request => 
                    
                    <i >

                    <Dropdown.Item  key={request.value} {...request}
                    />
                    <div >
                    <button  className='acceptButton' onClick={(e) => this.handleFriendRequest(e, "accept")}> accept </button>
                    <button  className='declineButton' onClick={(e) => this.handleFriendRequest(e, "decline")}> decline </button>
                    </div>
                    </i>
                    
                    
                    )}
                    </Dropdown.Menu>
                </Dropdown>
              : null }
                <div id= 'profPicDiv' class="dropdown show">
                    <img data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    id='navProfilePic' 
                    src='https://i.imgur.com/e225YR5.jpg' 
                    className="rounded-circle" 
                    alt='Your image is supposed to be here'/>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <Link className="dropdown-item"to='/friends'>Friends</Link>
                    <Link className="dropdown-item" to="/MyStories">My Stories</Link>
               
                </div>
                </div>
           
                <p></p>
               
          </nav>
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
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)


