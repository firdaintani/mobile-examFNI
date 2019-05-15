import {LOGIN_SUCCESS} from '../support/constant/type'
export const onLoginSuccess=(email, id)=>{
    // alert(email+id)
    return({
        type : LOGIN_SUCCESS,
        payload : {email, id}
    })
}

