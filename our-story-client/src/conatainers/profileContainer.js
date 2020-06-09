import React, { Component, Fragment } from 'react';
import {connect}                      from 'react-redux'
import StoryCard                      from '../components/StoryCard'
import NavBar                         from '../components/NavBar'
import UserInfo                       from '../components/userInfo'
import { Divider }                    from 'semantic-ui-react'


 class ProfileContainer extends Component{
    render(){

        return(
            <Fragment>
                <NavBar/>
                <div id="profileBackround">
                <UserInfo user={this.props.user}/>
                </div>
               
                <div id="profileStories">
                <Divider className="storyDivider"/>
                    {this.props.user.stories ? 
                    <div>
                        <h1 id="storyTitleProfile">Stories Published</h1>
                    <Divider className="storyDivider"/>
                        <StoryCard stories={this.props.user.stories.filter(story => !!story.completed)}/>
                    </div>
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