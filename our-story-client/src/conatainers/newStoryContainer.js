import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import     * as actions                   from '../actionsDirectory/actions';
import { Dropdown, Form, Button} from 'semantic-ui-react'
import NavBar            from '../components/NavBar';



 class NewStoryContainer extends Component {

    constructor(){
        super()
        this.state = {

            story_id: null,
            selectedFriends: [],
            users: null,
            title: null,
            description: null,
            img: null,
            content: null,
            completed: null,
            form: true
           
        }
    }

    setStory = (e) => {
        
        if(e.currentTarget.classList.value === "title"){
           
          this.setState({
              title: e.currentTarget.value
          })
        }else if(e.currentTarget.classList.value === "description"){
           
            this.setState({
                description: e.currentTarget.value
            })
        }else if(e.currentTarget.classList.value === "image"){
            this.setState({
                img: e.currentTarget.value
            })
        }else if(e.currentTarget.classList.value === "editStoryText"){
            this.setState({
                content: e.currentTarget.innerText
            })
        }
    }

    postStory = (complete) => {

        let completed

        if(complete === "Save"){
            completed = false
            Swal.fire({
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        }else{
            completed = true
            Swal.fire({
                icon: 'success',
                title: 'Your work has been published',
                showConfirmButton: false,
                timer: 1500
              })
        }
       
        let objectConfig = {
            method: 'POST',
            headers: {
               'Content-Type':'application/json'
            }, 
            body: JSON.stringify({
              title: this.state.title,
              image: this.state.img,
              description: this.state.description,
              completed: completed
            })
        }

        fetch('http://localhost:3000/stories', objectConfig)
        .then(res => res.json())
        .then(story => {
            this.setState({
                story_id: story.id
            })
           return  postUserStory(story.id)
        })


        const postUserStory = (id) => {
            
            let objectConfig2 = {
            method: 'POST',
            headers: {
            'Content-Type':'application/json'
            }, 
            body: JSON.stringify({
            user_id: this.props.currentUser.id,
            story_id: id,
            creator: true
            })
        }
        fetch('http://localhost:3000/user_stories', objectConfig2)
        .then(res => res.json())
        .then(userStory => {
       
            postStoryPoint(userStory.user_id, userStory.story_id) 
            if(this.state.selectedFriends.length === 0 || this.state.selectedFriends){
                this.friendsPostUserStories()
            }
            this.props.getUsers()
        })
      }

        const postStoryPoint = (user_id, story_id) => {
          
            let objectConfig3 = {
                method: 'POST',
                headers: {
                'Content-Type':'application/json'
                }, 
                body: JSON.stringify({
                user_id: user_id,
                story_id: story_id,
                user_name: this.props.currentUser.name,
                content: this.state.content
                })
            }

            fetch('http://localhost:3000/story_points', objectConfig3)
            .then(res => res.json())
            .then( this.props.setStories())
            .then(refreshUser())
           
         }

         const refreshUser = () => {

            fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
            .then(res => res.json())
            .then(user =>  this.props.setCurrentUser(user))
            
            this.props.setUserStories()
           
         }
     }
    
     friendsPostUserStories = () =>{
         
         this.state.selectedFriends.map(friend => {
             
            let friendInfo = this.props.users.find(user => user.name === friend)

             let objectConfig2 = {
                 method: 'POST',
                 headers: {
                 'Content-Type':'application/json'
                 }, 
                 body: JSON.stringify({
                 user_id: friendInfo.id,
                 story_id: this.state.story_id,
                 creator: false
                 })
             }
             fetch('http://localhost:3000/user_stories', objectConfig2)
             .then(res => res.json())

        })

     }

     createUsersHash = () => {
         
        let usersArr   = []
        let friendsIds = []
        let friendsArr = []

        this.props.currentUser.friendships.forEach(friendship => {
            if(friendship.friend_a_id === this.props.currentUser.id){
               friendsIds.push(friendship.friend_b_id)
            }else{
               friendsIds.push(friendship.friend_a_id)
            }
        })
        
        this.props.users.forEach(user => {
            if(friendsIds.includes(user.id) === true){
               friendsArr.push(user)
            }
        })

        friendsArr.map(user => {
            usersArr.push(
                {
                    key: user.name,
                    text: user.name,
                    value: user.name,
                    image: {
                        avatar: true,
                        src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'
                    }
                }
            )
        })
        this.setState({
            users: usersArr
        })

     }
     
    selectFriend = (e) => {
   
         if(e.currentTarget.classList.value === "delete icon"){
            
          let newArr =  this.state.selectedFriends.filter(friend => {
            
             return friend !== e.currentTarget.parentElement.innerText})
          this.setState({
              selectedFriends: newArr
          })
         }else{
             this.setState({
                 selectedFriends: [...this.state.selectedFriends, e.currentTarget.innerText]
             })
         }
      
     }
     componentDidMount() {
         
         this.createUsersHash()

        window.scrollTo(0, 0);
   
    }

    render(){
        
      if(this.state.form ){
          return(
              
              <Fragment>
        <NavBar/>

        <Form id='newStoryForm'>
            <div id='formFields'>
        <Form.Field>
        
          <input className='title' onChange={(e) => this.setStory(e)} placeholder='Title'/>
        </Form.Field>
        <Form.Field>
         
          <input className='description' onChange={(e) => this.setStory(e)} placeholder='brief description' />
        </Form.Field>
       <Form.Field>
       <Dropdown onChange={(e) => this.selectFriend(e)}
                        placeholder='Select Friend'
                        fluid
                        multiple
                        search
                        selection
                        options={this.state.users}
                        />
       </Form.Field>
       <Form.Field>
       <input   className='image' placeholder='Image URL' onChange={(e) => this.setStory(e)}/>
       </Form.Field>
        <Button type='submit' onClick={() => this.setState({form: null})}>Go Edit!</Button>
            </div>
      </Form>
      </Fragment>
          )
      }else{
        return (
            <Fragment>
                <NavBar/>
                  
                <div  className="paper">
                <h2 id='addMore'>{this.state.title}</h2>
            <div  className="lines">
                <div onInput={(e) => this.setStory(e)} className="editStoryText" contentEditable={true} >
                </div>
                </div>
                <div className="holes hole-top"></div>
                <div className="holes hole-middle"></div>
             <div className="holes hole-bottom"></div>
            <button onClick={() => this.postStory('Save')}>Add to story</button>
            
            </div>
            </Fragment>
        )}
    }
}

const mapStateToProps = (state) => {
    return{
        currentUser: state.currentUser,
        users:     state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setStories:      () => dispatch(actions.setStories()),
        setCurrentUser: (user) => dispatch(actions.setCurrentUser(user)),
        getUsers:              () => dispatch(actions.getUsers()),
        setUserStories: () => dispatch(actions.setUserStories())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStoryContainer)