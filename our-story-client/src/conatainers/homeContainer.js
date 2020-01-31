import React, { Component } from 'react';
import     NavBar           from '../components/NavBar'


export default class HomeContainer extends Component{

    removeCrap = () => {
        if(document.querySelector('.modal-backdrop') !== null){
            document.querySelector('.modal-backdrop').remove()
        }else{
           return null
        }
    }

    render(){

        this.removeCrap()

        return(
            <NavBar/>
        )
    }
}