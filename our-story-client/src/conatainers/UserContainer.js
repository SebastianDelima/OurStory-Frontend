import React, { Component } from 'react';
import { connect }          from 'react-redux';
import StoryCard            from '../components/StoryCard'


class UserContainer extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                inside of user container
                <StoryCard/>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
   
    return {
        stories:     state.stories,
        currentUser: state.currentUser
    }

}

export default connect(mapStateToProps, null)(UserContainer);
