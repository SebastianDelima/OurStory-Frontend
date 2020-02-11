import React, { Component, Fragment } from 'react';
import  { connect }         from 'react-redux';
import HomeStoryTile        from '../components/HomeStoryTile'
import { Card } from 'react-bootstrap';

class HomeStoryContainer extends Component{
      

    render(){
       
        if(this.props.stories){ 

        let newStories = this.props.stories.reverse().filter(story => story.completed == true)
        let stories = newStories.slice(0, 6)
       
        

        return(

        <Fragment>
            
            <h1 id='a-title' className='latestStories'>Latest Stories:</h1>
            {newStories.length <= 5 ?
            <HomeStoryTile stories = {newStories}/>
            :
            <HomeStoryTile stories = {stories}/> 
            }
          </Fragment>
        )
            }else{
                return null
            }
    }
}

const mapStateToProps = (state) => {

    if(state.stories.length === 0 || state.stories === 'loading'){
    return {
       stories: null
       }
     }else{
        return {
            stories: state.stories
        }
      }
    }



export default connect(mapStateToProps)(HomeStoryContainer);