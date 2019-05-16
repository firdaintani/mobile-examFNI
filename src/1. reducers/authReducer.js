const INITIAL_STATE = {email : '',pass : '', id : null }
import {LOGIN_SUCCESS, RESET_USER} from '../support/constant/type'
const authReducer =(state, action)=>{
    switch (action.type){
        case 'TEST' :
        return {...INITIAL_STATE, email : 'fikri'}
        case LOGIN_SUCCESS : 
        return {...INITIAL_STATE, email: action.payload.email, id : action.payload.id}
        case RESET_USER :
        return INITIAL_STATE
        default :
        return INITIAL_STATE
    }
}
export default authReducer