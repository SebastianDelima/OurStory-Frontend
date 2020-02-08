import React, { Component, Fragment } from 'react';
import { connect }          from 'react-redux';

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
        .then(data => console.log(data))
    }

    findCreator = () => {

        
        
        
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
        

        return(
           <Fragment>
               
               <div  className="paper">
                <h2 id='addMore'> Add more content down here!</h2>
            <div  className="lines">
                <div onInput={(e) => this.addContent(e)} className="text" contentEditable={true} >
                </div>
                </div>
                <div className="holes hole-top"></div>
                <div className="holes hole-middle"></div>
             <div className="holes hole-bottom"></div>
            <button onClick={() => this.postStoryPoint()}>Add to story</button>
            {this.state.creator ?  <button> Publish Story</button> : null }
            </div>

        </Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
   
    if(state.stories.length === 0 || state.stories === 'loading'){
        return {
           currentUser: null,
           userStories: null
           }
         }else{
            return {
                currentUser: state.currentUser,
                userStories: state.userStories
            }
          }
        }

export default connect(mapStateToProps, null)(EditStory);