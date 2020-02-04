import React, { Component, Fragment } from 'react';
import     NavBar           from '../components/NavBar';
import HomeStoryContainer   from './HomeStoryCont'
import HomeUserContainer    from './HomeUserContainer';
import { NavLink }             from 'react-router-dom';



 export default class HomeContainer extends Component{

    removeCrap = () => {
        if(document.querySelector('.modal-backdrop') !== null){
            document.querySelector('.modal-backdrop').remove()
            document.querySelector('body').classList.remove("modal-open")
        }else{
           return null
        }
    }

    render(){

        this.removeCrap()

        return(
            <Fragment>
            <NavBar/>
            <HomeUserContainer/>
            <HomeStoryContainer/>
            <NavLink to='/new' type='button'>New Story</NavLink>
            </Fragment>
        )
    }
}


