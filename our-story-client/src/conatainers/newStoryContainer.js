import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

 class newStoryContainer extends Component {

    constructor(){
        super()
        this.state = {
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

    postStory = () => {

        let objectConfig = {
            method: 'POST',
            headers: {
               'Content-Type':'application/json'
            }, 
            body: JSON.stringify({
              title: this.state.title,
              image: this.state.img,
              description: this.state.description,
              completed: true
            })
        }

        fetch('http://localhost:3000/stories', objectConfig)
        .then(res => res.json())
        .then(story => postUserStory(story.id))

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
        .then(userStory => postStoryPoint(userStory.user_id, userStory.story_id))
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
            .then(storyPoint => console.log(storyPoint))

         }
     }
    
     componentDidMount() {
        window.scrollTo(0, 0);
    }

    render(){
        return (
            <Fragment>
                
                    <span  id='storyContent'className='title'  contentEditable={true} onInput={(e) => this.setStory(e)}>Title goes here...</span>
                    <p></p>
                    <span id='storyContent' className='description'  contentEditable={true} onInput={(e) => this.setStory(e)} >Brief description...</span>
                    <p></p>
                    <input type='text'      className='image' placeholder='Image URL' onChange={(e) => this.setStory(e)}></input>
                    <p></p>
                    <span id='storyContent' className='content' contentEditable={true} onInput={(e) => this.setStory(e)}>Write your story here...</span>
                    <p></p>
                    <button>Save</button><button onClick={() => this.postStory()}>Publish</button>
              
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(newStoryContainer)