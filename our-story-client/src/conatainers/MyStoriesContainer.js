import React, { Component, Fragment } from 'react';
import { connect }          from 'react-redux';
import StoryCard            from '../components/StoryCard'
import NavBar               from '../components/NavBar'
import {Card, Nav}          from  'react-bootstrap'



class MyStoriesContainer extends Component {

    constructor(){
        super()
        this.state = ({
            published: true
        })

    }

    setPublished = (click) => {
        if(click === "Work"){
        this.setState({
            published: null
        })
     }else{
        this.setState({
            published: true
        })
     }
    }

    render(){
        if(this.props.currentUser){

            let completedStories = this.props.currentUser.stories.filter(story => story.completed === true)
            let uncompletedStories = this.props.currentUser.stories.filter(story => story.completed == false)
           

        return(
           <Fragment>
               <NavBar/>
                
                <Card className='myStoriesCards'>
                <Card.Header>
                    <Nav variant="tabs"  defaultActiveKey="Published">
                    <Nav.Item>
                        <Nav.Link onClick={() => this.setPublished("Pub")} eventKey="Published">Published</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => this.setPublished("Work")} eventKey="Work in progress" >Work in progress</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    </Nav.Item>
                    </Nav>
                </Card.Header>
                {this.state.published ? 
                <Card.Body>
                    <StoryCard stories={completedStories}/>
                </Card.Body>
                // not published
                 : 
                 <Card.Body>
                    <StoryCard  stories={uncompletedStories}/>
                </Card.Body>}

                </Card>
            </Fragment>
         )
        }else{
            return null
        }
    }
}

const mapStateToProps = (state) =>{
   
    if(state.stories.length === 0 || state.stories === 'loading'){
        return {
           currentUser: null
           }
         }else{
            return {
                currentUser: state.currentUser
            }
          }
        }

export default connect(mapStateToProps, null)(MyStoriesContainer);
