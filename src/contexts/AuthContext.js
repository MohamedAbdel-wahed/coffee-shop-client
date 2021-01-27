import React,{createContext,useReducer} from 'react'
import { authReducer } from '../reducers/auth'
import jwtDecode from 'jwt-decode'


export const AuthContext= createContext()

let user= null
const token= localStorage.getItem('token')

if(token){
    const decodedToken= jwtDecode(token)
    const currentDate= new Date()
    const tokenEXPDate= new Date(decodedToken.exp*1000) // get EXP Date in milliSeconds

    if(currentDate > tokenEXPDate) {
        localStorage.removeItem('token')
    }
    else{
        user= decodedToken
    }
}

function AuthContextProvider({children}) {

    const [authState, dispatch] = useReducer(authReducer, {user})

    return (
        <AuthContext.Provider value={{ authState, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
