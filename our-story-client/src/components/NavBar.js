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

                
                <div class="dropdown show">
                    <img data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    id='navProfilePic' 
                    src='https://i.imgur.com/e225YR5.jpg' 
                    className="rounded-circle" 
                    alt='Your image is supposed to be here'/>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
                </div>
                </div>
           
                <p></p>
               
          </nav>

        )
    }
}
export default NavBar


