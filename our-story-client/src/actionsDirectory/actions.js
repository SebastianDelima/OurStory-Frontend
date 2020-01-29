import{SET_USERS, SET_USERS_REQUEST, SET_STORIES, SET_STORIES_REQUEST} from './constants'

export function getUsers(){
    return (dispatch) => {
        dispatch({type: SET_USERS_REQUEST});
        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(users => dispatch({ type: SET_USERS, users}))
    }
}

export function setStories(){
    return(dispatch) => {
      dispatch({type: SET_STORIES_REQUEST});
      fetch('http://localhost:3000/stories')
      .then(res => res.json())
      .then(stories => dispatch({type: SET_STORIES, stories}))
    }
}



