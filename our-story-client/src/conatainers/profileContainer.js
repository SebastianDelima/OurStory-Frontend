import React, { Component, Fragment } from 'react';
import {connect}            from 'react-redux'
import StoryCard                      from '../components/StoryCard'
import NavBar                         from '../components/NavBar'
import UserInfo                       from '../components/userInfo'


 class profileContainer extends Component{
    render(){
    
        return(
            <Fragment>
                <NavBar/>
                <UserInfo user={this.props.user}/>
                <p></p>
                <div>
                    <StoryCard stories={this.props.user.stories.filter(story => story.completed === true)}/>
                </div>
           </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser
    }
}

export default connect(mapStateToProps)(profileContainer);