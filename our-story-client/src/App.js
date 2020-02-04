import     React, { Component, Fragment } from 'react';
import     { connect }                    from 'react-redux';
import     * as actions                   from './actionsDirectory/actions';
import     welcomeContainer               from './conatainers/welcomeContainer'
import     HomeContainer                  from './conatainers/homeContainer'
import     UserContainer                  from './conatainers/UserContainer'
import     newStoryContainer              from './conatainers/newStoryContainer'
import     storyDetails                   from './components/storyDetails'
import     { Switch, Route }              from 'react-router-dom';
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
        <Route exact path='/'             component={welcomeContainer}/>
        <Route exact path='/new'          component={newStoryContainer}/>
        <Route exact path='/home'         component={HomeContainer}/>
        <Route exact path='/user'         component={UserContainer}/>
        <Route exact path='/stories/:id'  component={storyDetails}/>
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
    currentuser: state.currentUser
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);


{/* <Switch>
      <Route exact path='/'           component={Welcome}/>

      <Route exact path='/hat'        render={()=> this.state.validName   ? <Hat setCurrentUser={this.setCurrentUserSignUp} userName={this.state.logInUser}/>  : <Redirect to ='signup'/>}/>
      <Route exact path='/favorites'  render={()=> this.state.currentUser ? <FavoritesContainer updateUsers={this.updateUsers} characters={this.state.characters} currentUser={this.state.currentUser}/> : <Redirect to ="/login"/>}/>
      <Route exact path='/main'       render={()=> this.state.currentUser ? <Main userInfo={this.state.currentUser}/> : <Redirect to ="/login"/>}/> 
      <Route exact path='/login'      render={()=> this.state.currentUser ? <Redirect to ='/main'/> : <Login setCurrentUser={this.setCurrentUser} setLogInUser={this.setLogInUser}/>} /> 
      <Route exact path='/signup'     render={()=> this.state.currentUser ? <Redirect to ='/main'/> : <SignUp signUp={this.signUp} setLogInUser={this.setLogInUser} user={this.state.logInUser}/> } />
      <Route exact path='/characters' render={()=> this.state.currentUser ? <CharacterContainer updateUsers={this.updateUsers} currentUser={this.state.currentUser} characters={this.state.characters} /> :  <Redirect to ="/login"/>} /> 
      <Route exact path='/spells'     render={()=> this.state.currentUser ? <SpellsContainer updateUsers={this.updateUsers} currentUser={this.state.currentUser} spells={this.state.spells} /> : <Redirect to ="/login"/>} />
    </Switch> */}