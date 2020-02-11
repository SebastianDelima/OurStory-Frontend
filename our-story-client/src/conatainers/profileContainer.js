import React, { Component, Fragment } from 'react';
import {connect}            from 'react-redux'
import StoryCard                      from '../components/StoryCard'
import NavBar                         from '../components/NavBar'
import UserInfo                       from '../components/userInfo'


 class ProfileContainer extends Component{
    render(){

        return(
            <Fragment>
                <NavBar/>
                <UserInfo user={this.props.user}/>
                
                <div>
                    {this.props.user.stories ? 
                    <StoryCard stories={this.props.user.stories.filter(story => story.completed === true)}/>
                  :  <StoryCard userName={this.props.user.name} stories={null}/>}
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

export default connect(mapStateToProps)(ProfileContainer);