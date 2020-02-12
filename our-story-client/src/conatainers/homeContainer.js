import React, { Component, Fragment } from 'react';
import     NavBar           from '../components/NavBar';
import HomeStoryContainer   from './HomeStoryCont'
import HomeUserContainer    from './HomeUserContainer';
import { Grid, Image, Segment } from 'semantic-ui-react';
import { Link }             from 'react-router-dom';
import {connect}  from 'react-redux'
import     * as actions                   from '../actionsDirectory/actions';




 class HomeContainer extends Component{

    removeModal = () => {
        if(document.querySelector('.modal-backdrop') !== null){
            document.querySelector('.modal-backdrop').remove()
            document.querySelector('body').classList.remove("modal-open")
        }else{
           return null
        }
    }


    render(){

        this.removeModal()

        return(
            <Fragment>
            <NavBar/>
            <Link to="/new">New Story</Link>
             <Grid stackable columns={2}>
                <Grid.Column>
                  <Segment className="userSegment">
             <HomeUserContainer/>
                  </Segment >
                </Grid.Column>
                <Grid.Column>
                  <Segment className="storySegment">
                <HomeStoryContainer/>  
                </Segment>
                </Grid.Column>
            </Grid> 
            </Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
   
   
            return {
                currentUser: state.currentUser,
            
            }
          
        }

        const mapDispatchToProps = (dispatch) => {

            return {
              
                setCurrentUser: (user) => dispatch(actions.setCurrentUser(user))}
            
        }
        

    
    export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

