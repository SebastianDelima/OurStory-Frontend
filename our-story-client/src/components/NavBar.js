import React, { Component } from 'react';



class NavBar extends Component{
    render(){

        return(

            <nav id="navBar" className="navbar ">
            <a id='OurStorylogo'className="navbar-brand" href="/home">OurStory</a>
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
                    <a className="dropdown-item" href="/profile">Profile</a>
                    <a className="dropdown-item" href="/friends">Friends</a>
                    <a className="dropdown-item" href="/MyStories">Stories</a>
               
                </div>
                </div>
           
                <p></p>
               
          </nav>

        )
    }
}
export default NavBar


