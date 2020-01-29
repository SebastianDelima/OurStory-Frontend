import { combineReducers } from 'redux';
import { SET_USERS, SET_USERS_REQUEST } from './actionsDirectory/constants';

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

const rootReducer = combineReducers({

     users:       setUsers
    //  userStories: setUserStories,
    //  stories:     setStories,
    //  currentUser: setCurrentUser,

  });

  export default rootReducer;