import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import     * as actions                   from '../actionsDirectory/actions';
import { Dropdown } from 'semantic-ui-react'


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
            completed: null
           
        }
    }

    setStory = (e) => {
        
        if(e.currentTarget.classList.value == "title"){
          this.setState({
              title: e.currentTarget.innerText 
          })
        }else if(e.currentTarget.classList.value == "description"){
            this.setState({
                description: e.currentTarget.innerText 
            })
        }else if(e.currentTarget.classList.value == "image"){
            this.setState({
                img: e.currentTarget.value
            })
        }else if(e.currentTarget.classList.value == "content"){
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
             .then(data => console.log(data))
             

        })

     }

     createUsersHash = () => {
        let usersArr = []
        this.props.users.map(user => {
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
     
     check = (e) => {
   
         if(e.currentTarget.classList.value === "delete icon"){
            
          let newArr =  this.state.selectedFriends.filter(friend => {
            
             return friend != e.currentTarget.parentElement.innerText})
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
       if(window.location.pathname.split("/")[3] !== undefined){
          
        this.setState({
            editing_id: parseInt(window.location.pathname.split("/")[3])

        }) 
      }
    }

    render(){
        
        // if(this.state.editing_id ){
        //     let story = this.props.currentUser.stories.find(story => story.id === this.state.editing_id)
        //     this.setState({
        //         title: story.title,
        //         description: story.description,
        //         img: story.image
        //     })
        //   
        // }
        return (
            <Fragment>
                    <div id='newStoryDiv'>
                    <span  id='storyContent'className='title'  contentEditable={true} onInput={(e) => this.setStory(e)}>Title goes here...</span>
                    <p></p>
                    <span id='storyContent' className='description'  contentEditable={true} onInput={(e) => this.setStory(e)} >Brief description...</span>
                    <p></p>
                    <Dropdown onChange={(e) => this.check(e)}
                        placeholder='Select Friend'
                        fluid
                        multiple
                        search
                        selection
                        options={this.state.users}
                    />
                    <input type='text'      className='image' placeholder='Image URL' onChange={(e) => this.setStory(e)}></input>
                    <p></p>
                    <span id='storyContent' className='content' contentEditable={true} onInput={(e) => this.setStory(e)}>Write your story here...</span>
                    <p></p>
                    <button onClick={() => this.postStory('Save')}>Save</button><button onClick={() => this.postStory()}>Publish</button>
                    </div>
            </Fragment>
        )
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
        setStories: () => dispatch(actions.setStories()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStoryContainer)