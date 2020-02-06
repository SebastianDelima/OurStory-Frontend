import React, { Component } from 'react';
import connect              from 'react-router-dom'

export default class EditStory extends Component{
    render(){
    
        return(
           <div>
               
               

           </div>
        )
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

export default connect(mapStateToProps, null)(EditStory);