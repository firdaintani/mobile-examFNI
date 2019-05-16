import {LOGIN_SUCCESS, RESET_USER} from '../support/constant/type'
export const onLoginSuccess=(email, id)=>{
    // alert(email+id)
    return({
        type : LOGIN_SUCCESS,
        payload : {email, id}
    })
}
export const resetUser=()=>{
    return({
        type : RESET_USER
    })
}
