import React, { Component } from 'react';
import     { connect }                    from 'react-redux';


class storyDetails extends Component{

    constructor(){
        super()
        this.state = {
            title: null,
            image: null,
            descrption: null
        }
    }
    

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render(){
     
        let id = parseInt(window.location.pathname.split("/")[2])

        if(this.props.stories){

        let story = this.props.stories.find(story => story.id === id)
       

        return(
       
            <div className="card">
            <img src='..' alt="Avatar" />
            <div className="container">
              <h4><b>{story.title}</b></h4>
              <p>hello</p>
            </div>
          </div>
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

export default connect(mapStateToProps)(storyDetails)