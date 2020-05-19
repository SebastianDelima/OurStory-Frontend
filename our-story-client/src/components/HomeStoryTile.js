import React, { Component } from 'react';
import { NavLink }          from 'react-router-dom';
import {Item}               from 'semantic-ui-react'


export default class HomeStoryTile extends Component{
    render(){
        return(

            <Item.Group link> 
                {this.props.stories.slice(0, 4).map(story => {
                    return(
                        <Item key={story.id} id='homeStoryCard' >
                           
                            <NavLink to={`/stories/${story.id}`}>
                        <Item.Image size='medium' src={story.image}  rounded />
                          </NavLink>

                        <Item.Content id="storyDetails">
                        <NavLink to={`/stories/${story.id}`}>
                            <Item.Header id="homeStoryTitle">{story.title}</Item.Header>
                        </NavLink>
                            <Item.Description id="homeStoryDes">{story.description}</Item.Description>

                        </Item.Content>
                    </Item>
                    )
                })}
             </Item.Group>

            
            )
        }
       
}