import {jwtDecode} from 'jwt-decode';

export const isTokenExpired=()=>{
    const token=localStorage.getItem('token');
    if(!token) return true;
    try {
       const {exp}=jwtDecode(token);
       return exp*1000<Date.now(); 
    } catch (error) {
        return true
    }
}