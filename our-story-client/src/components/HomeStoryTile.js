import React, { Component } from 'react';
import { NavLink }          from 'react-router-dom';

export default class HomeStoryTile extends Component{
    render(){
        return(
       <NavLink to={`/stories/${this.props.story.id}`}>
        <div className="card mb-3" key={this.props.story.id} >
            <div className="row no-gutters">
                <div className="col-md-4">
                <img src={this.props.story.image} id ='homeCardImg' class="card-img" alt="..."/>
                     </div>
                      <div className="col-md-8">
                        <div className="card-body">
                         <h5 className="card-title">{this.props.story.title}</h5>
                            <p className="card-text">{this.props.story.description}</p>
                           <p className="card-text"><small class="text-muted">Created at: {this.props.story.created_at}</small></p>
                     </div>
                 </div>
            </div>
        </div>
        </NavLink>

        )
    }
}