import React, { Component, Fragment } from 'react';
import { connect }          from 'react-redux';
import Swal from 'sweetalert2';
import     * as actions                   from '../actionsDirectory/actions';
import { NavLink } from 'react-router-dom';


class EditStory extends Component{

    constructor(){
        super()
        this.state = {
          storyId: null,
          content: null,
          creator: null
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
        .then(() => this.props.setStories())
        
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
    }
    
   
    
    render(){

        if(this.props.stories){
            let story = this.props.stories.find(story => story.id === this.state.storyId)
        }
       
        return(
           <Fragment>
               <NavLink/>
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
            {this.state.creator ?  <NavLink to='/home'><button onClick={() => this.publishStory()}> Publish Story</button> </NavLink>: null }
            </div>

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
                setCurrentUser: (user) => dispatch(actions.setCurrentUser(user))}
            
        }
        

    
    export default connect(mapStateToProps, mapDispatchToProps)(EditStory);