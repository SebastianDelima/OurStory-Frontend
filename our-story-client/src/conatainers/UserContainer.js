import React, { Component } from 'react';
import { connect }          from 'react-redux';


class UserContainer extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                inside of user container
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    console.log("im here")
  debugger
    return {
        stories: state.stories
    }

}

export default connect(mapStateToProps, null)(UserContainer);
