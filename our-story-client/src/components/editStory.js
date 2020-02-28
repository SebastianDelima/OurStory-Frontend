import React, { Component, Fragment } from 'react';
import { connect }                    from 'react-redux';
import Swal                           from 'sweetalert2';
import     * as actions               from '../actionsDirectory/actions';
import { NavLink,  Redirect}          from 'react-router-dom';
import NavBar                         from '../components/NavBar';
import { Button, Header,  Image, Divider, Modal } from 'semantic-ui-react'



class EditStory extends Component{

    constructor(){
        super()
        this.state = {
          storyId: null,
          content: null,
          creator: null,
          story: null,
          redirect: null
        }
    }
    
    addContent = (e) => {
       
        this.setState({
            content: e.currentTarget.innerText

        })
    }

    postStoryPoint = () => {

        Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })

        let objectConfig = {
            method: 'POST',
            headers: {
            'Content-Type':'application/json'
            }, 
            body: JSON.stringify({
             user_id:   this.props.currentUser.id,
             story_id:  this.state.storyId,
             content:   this.state.content,
             user_name: this.props.currentUser.name
            })
        }
        fetch('http://localhost:3000/story_points', objectConfig)
        .then(res => res.json())
        .then(() => this.props.setStories())
    }

    publishStory = () => {

        Swal.fire({
            icon: 'success',
            title: 'Your work has been published',
            showConfirmButton: false,
            timer: 1500
          })

        let objectConfig = {
            method: 'PATCH',
            headers: {
            'Content-Type':'application/json'
            }, 
            body: JSON.stringify({
                
             id: this.state.storyId
           
            })
            
        }

        fetch(`http://localhost:3000/stories/${this.state.storyId}`, objectConfig)
        .then(res => res.json())
        .then(() => {this.props.setStories()
                   this.updateUser()})
        
    }

    deleteStory = (e) => {
       
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {


            if (result.value) {

                this.setState({
                    redirect: true
                })
                
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
            let user_story_id = null
                this.props.userStories.forEach(story => {
                   if(story.story_id === this.state.storyId && story.user_id === this.props.currentUser.id)             
                        user_story_id = story.id
                })
                let objectConfig = {
                    method: 'DELETE',
                    headers: {
                    'Content-Type':'application/json'
                    }, 
                    body: JSON.stringify({
    
                     id: this.state.storyId,
                     user_story_id: user_story_id
                    })
                }
                 fetch(`http://localhost:3000/stories/${this.state.storyId}`, objectConfig)
                 .then(
                     this.setState({
                    redirect: true
                })).then( () => {
                    this.props.setStories()
                    this.updateUser()})
          })    
    }

    updateUser = () => {
        this.props.setUsers()
        
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
                    .then(res => res.json())
                    .then(user =>  this.props.setCurrentUser(user))
    }
    
    
    componentDidMount(){
   
        this.setState({
            storyId: parseInt(window.location.pathname.split("/")[3])
        }) 

        this.props.userStories.forEach(story => {
                   
            if(story.story_id === parseInt(window.location.pathname.split("/")[3]) && story.user_id === this.props.currentUser.id)
                         
                 this.setState({
                    creator: story.creator
              })
          })
        let story = this.props.stories.find(story => story.id === parseInt(window.location.pathname.split("/")[3]))
    
        this.setState({
            story: story
        })
    }
    
   
    
    render(){

  
        if(this.state.redirect){
          
            return <Redirect to='/home'/>
        }

         return(
            <Fragment>
                <NavBar/>
                <div  className="paper">
                 <h2 id='addMore'> Add more content down here!</h2>
             <div  className="lines">
                 <div onInput={(e) => this.addContent(e)} className="editStoryText" contentEditable={true} >
                 </div>
                 </div>
                 <div className="holes hole-top"></div>
                 <div className="holes hole-middle"></div>
              <div className="holes hole-bottom"></div>
             <button onClick={() => this.postStoryPoint()}>Add to story</button>
             <NavLink to='/home'><button className="bottonCool">Done</button></NavLink>
             
             {this.state.creator && this.state.story.completed === false ?  <NavLink to='/home'><button className="bottonCool" onClick={() => this.publishStory()}> Publish Story</button> </NavLink>: null }
             {this.state.creator ?  <button className="bottonCool" onClick={() => this.deleteStory()}>Delete Story</button>: null }
             </div>
             { this.state.story ? 
             <Modal trigger={<Button>Check Story</Button>}>
    <Modal.Header>{this.state.story.title}</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src={this.state.story.image} />
      <Modal.Description>
        <Header>{this.state.story.title}</Header>
         {this.state.story.story_points.map(point => 
         <div>
            <div>{point.content}</div>
    <i>written by: {point.user_name}</i>
    <Divider/>
    </div>
    )}
      </Modal.Description>
    </Modal.Content>
   
  </Modal> : null}


         </Fragment>
              )
     
         }
    }


const mapStateToProps = (state) =>{
   
    if(state.stories.length === 0 || state.stories === 'loading'){
        return {
           currentUser: null,
           userStories: null,
           stories: null
           }
         }else{
            return {
                currentUser: state.currentUser,
                userStories: state.userStories,
                stories:     state.stories
            }
          }
        }

        const mapDispatchToProps = (dispatch) => {

            return {
                setStories: () => dispatch(actions.setStories()),
                setCurrentUser: (user) => dispatch(actions.setCurrentUser(user)),
                setUsers:       () => dispatch(actions.getUsers())

            }
            
        }
        

    
    export default connect(mapStateToProps, mapDispatchToProps)(EditStory);