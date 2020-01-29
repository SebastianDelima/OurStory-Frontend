import{SET_USERS, SET_USERS_REQUEST} from './constants'

export function getUsers(){
    return (dispatch) => {
        dispatch({type: SET_USERS_REQUEST});
        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(users => dispatch({ type: SET_USERS, users}))
    }
}


