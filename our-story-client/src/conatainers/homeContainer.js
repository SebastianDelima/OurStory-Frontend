import React, { Component, Fragment } from 'react';
import     NavBar           from '../components/NavBar';
import HomeStoryContainer   from './HomeStoryCont'
import HomeUserContainer    from './HomeUserContainer';
import { Grid, Image, Segment } from 'semantic-ui-react';
import { NavLink }             from 'react-router-dom';
import { CardDeck } from 'react-bootstrap';



 export default class HomeContainer extends Component{

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
            <NavLink to='/new' type='button'>New Story</NavLink>
            </Fragment>
        )
    }
}


