import React                     from 'react';
import {Card, CardColumns}       from  'react-bootstrap'
import {NavLink}                 from  'react-router-dom'

const StoryCard = (props) => {
     if(props.stories){ 
       return <CardColumns>
            {props.stories.map(story => 
            
            <Card className="myStoriesCards">
                <NavLink to={`/stories/${story.id}`}>
                <Card.Img id='image-card' variant="top" src={story.image} />
                <Card.Body>
                <Card.Title>{story.title}</Card.Title>
                <Card.Text>
                    {story.description}
                </Card.Text>
                <NavLink to={`/stories/edit/${story.id}`}>Edit</NavLink>
                </Card.Body>
               
                <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago </small>
                </Card.Footer>
            </NavLink>
            </Card>
            )}
        </CardColumns>
     }else{
          return  <div>No stories here yet. To create a new story click <NavLink to='/new'>here</NavLink>, 
                or go back home to chekc some awesome stories!</div> 
     }

}

export default StoryCard