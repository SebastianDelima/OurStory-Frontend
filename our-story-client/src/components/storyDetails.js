import React, { Component, Fragment } from 'react';
import     { connect }                from 'react-redux';


class StoryDetails extends Component{


    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render(){
     
        let id = parseInt(window.location.pathname.split("/")[2])

        if(this.props.stories){

        let story = this.props.stories.find(story => story.id === id)
       

        return(
       <Fragment>
            <div className="card">
            <img id='image-card'src={story.image} alt="Avatar" />
            <div className="container">
              <h4><b>{story.title}</b></h4>
        {story.story_points.map(point =>{
            return (
            <div>
                <i>written_by: {point.user_name}</i>
                <p></p>
                <div>{point.content}</div>
            </div>
            )
            })}
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

export default connect(mapStateToProps)(StoryDetails)