import     React, { Component, Fragment } from 'react';
import     { connect }                    from 'react-redux';
import     * as actions                   from './actionsDirectory/actions';
import     WelcomeContainer               from './conatainers/welcomeContainer'
import     HomeContainer                  from './conatainers/homeContainer'
import     MyStoriesContainer                  from './conatainers/MyStoriesContainer'
import     NewStoryContainer              from './conatainers/newStoryContainer'
import     StoryDetails                   from './components/storyDetails'
import     ProfileContainer               from './conatainers/ProfileContainer'
import     { Switch, Route, Redirect }              from 'react-router-dom';
import     './App.css'; 

class App extends Component {

  componentDidMount = () => {
   this.props.setUsers()
   this.props.setStories()
  }


  render(){
  
    return (

      <Fragment>
      <Switch>
        <Route exact path='/'                 render={()=> !this.props.currentUser ?  <WelcomeContainer  />   : <Redirect to='/home'/>}/>
        <Route exact path='/new'              render={()=> this.props.currentUser  ?  <NewStoryContainer/>  : <Redirect to='/home'/>}/>
        <Route exact path='/home'             render={()=> this.props.currentUser  ?  <HomeContainer/>      : <Redirect to='/'/> }/>
        <Route exact path='/MyStories'        render={()=> this.props.currentUser  ?  <MyStoriesContainer/> : <Redirect to='/'/>}/>
        <Route exact path='/stories/:id'      render={()=> this.props.currentUser  ?  <StoryDetails/>       : <Redirect to='/'/>}/>
        <Route exact path='/stories/edit/:id' render={()=> this.props.currentUser  ?  <NewStoryContainer/>  : <Redirect to='/'/>}/>
        <Route exact path='/profile'          render={()=> this.props.currentUser  ?  <ProfileContainer/>   : <Redirect to='/'/>}/>
      </Switch>
      </Fragment>
  
    )

  }

}

const mapDispatchToProps = (dispatch) => {

   return {

     setUsers:   () => dispatch(actions.getUsers()),
     setStories: () => dispatch(actions.setStories())

   }

}

const mapStateToProps = (state) => {
 
  return {
    users:       state.users,
    stories:     state.stories,
    currentUser: state.currentUser
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);

