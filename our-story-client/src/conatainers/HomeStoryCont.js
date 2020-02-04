import React, { Component, Fragment } from 'react';
import  { connect }         from 'react-redux';
import HomeStoryTile        from '../components/HomeStoryTile'

class HomeStoryContainer extends Component{
      

    render(){
       
        if(this.props.stories){ 

        let newStories = this.props.stories.filter(story => story.completed == true)
        let stories = newStories.slice(1).slice(-5).reverse()

        return(
            <Fragment>
            <h1 className='latestStories'>Latest Stories:</h1>
           
            <div  id='HomeStoryCard' className="card">
            <div className="card-body">
              {  stories.map(story => {
                return <HomeStoryTile story = {story}/> }) 
              }
           
          </div>
          </div>
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