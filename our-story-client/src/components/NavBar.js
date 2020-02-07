import React, { Component } from 'react';
import {Link}               from 'react-router-dom'
import { NavLink } from 'react-router-dom';



class NavBar extends Component{
    render(){

        return(

            <nav id="navBar" className="navbar ">
            <NavLink to='/home' id='OurStorylogo'className="navbar-brand" >OurStory</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent"> </div>
           
            <div id='searchInput'>
                
                <img id='search' src='https://cdn4.iconfinder.com/data/icons/basic-user-interface-2/512/User_Interface-25-512.png' alt='nada'/>
                </div>
                
                <div id= 'profPicDiv' class="dropdown show">
                    <img data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    id='navProfilePic' 
                    src='https://i.imgur.com/e225YR5.jpg' 
                    className="rounded-circle" 
                    alt='Your image is supposed to be here'/>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <a className="dropdown-item"    >Friends</a>
                    <Link className="dropdown-item" to="/MyStories">My Stories</Link>
               
                </div>
                </div>
           
                <p></p>
               
          </nav>

        )
    }
}
export default NavBar


