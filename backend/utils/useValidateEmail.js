import Validator from 'validator';


export const emailcheck = (email)=>{
        if(!Validator.isEmail(email)){
            throw new Error("Email Syntax is InValid")
        }
}



// module.exports = {emailcheck};