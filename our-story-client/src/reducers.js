import { combineReducers } from 'redux';
import { SET_USERS, SET_USERS_REQUEST, SET_STORIES, SET_STORIES_REQUEST, SET_CURRENT_USER } from './actionsDirectory/constants';

const setUsers = (state = [], action) => {
    switch(action.type){
        case SET_USERS_REQUEST:
         return 'loading'
       case SET_USERS:
        return action.users
       default:
        return state;
    }
}

const setCurrentUser = (state = null, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
           return action.user
        default:
            return state
    }
}

const setStories = (state = [], action) => {
    switch(action.type){
        case SET_STORIES_REQUEST:
            return 'loading'
        case SET_STORIES:
            return action.stories
            default:
                return state
    }
}


const rootReducer = combineReducers({

     users:       setUsers,
     currentUser: setCurrentUser,
    //  userStories: setUserStories,
     stories:     setStories

  });

  export default rootReducer;