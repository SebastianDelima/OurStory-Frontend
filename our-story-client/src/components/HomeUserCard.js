import React, { Component } from 'react';
import {Card, Icon, Image,Item}               from 'semantic-ui-react'

export default class HomeUserCard extends Component{
    render(){
      let faces=['https://cdn-prod.medicalnewstoday.com/content/images/headlines/313/313264/african-woman-s-face.jpg','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWnU2WlEm8DcWAMzFr7u8JZ3QifzB9bDLi1kvsA2w7l1SlGxP2','https://images.pexels.com/photos/2092709/pexels-photo-2092709.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500']
        return(
          <Card.Group  itemsPerRow={2} >
            {this.props.users.length == 4 && this.props.users != "load" ? 
                     this.props.users.map(user => {
                       return(
                      <Card >
                        <Image  src={faces[Math.floor(Math.random() * 3) + 1 ]}/>
                        {/* <img id="homeUserImage"  width={200} height={200} src={faces[Math.floor(Math.random() * 3) + 1 ]}/> */}
                        <Card.Content>
                      {/* <Image className="homeUserImage"  src={faces[Math.floor(Math.random() * 3) + 1 ]}  wrapped ui={false} circular/> */}
                      <Card.Header>{user.name}</Card.Header>
                      <Card.Description>
                        {user.short_bio}
                      </Card.Description>
                      </Card.Content>
                     </Card>)})
                     : null
                     }
           
             </Card.Group>
          )
        }
      }
      //   <Card >
      //   <Card.Img id="userHomeImages" variant="top" src='https://st3.depositphotos.com/1006542/12729/i/950/depositphotos_127297394-stock-photo-man-with-an-ugly-face.jpg'/>
      //   <Card.Body>
      //     <Card.Title>{this.props.user.name}</Card.Title>
      //     <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
      //     <Card.Text>
      //       {this.props.user.short_bio}
      //     </Card.Text>
      //     <Card.Link href="#">Add friend</Card.Link>
      //   </Card.Body>
      // </Card>