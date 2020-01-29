import{SET_USERS} from './constants'

export function getUsers(){
    return{type: SET_USERS, users: []}
}