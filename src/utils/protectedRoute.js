import React, {useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Redirect, Route } from 'react-router-dom'
import {CREDENTIALS} from '../env'



function ProtectedRoute(props) {
    const { authState } = useContext(AuthContext)
    const {user} = authState

    if(props.loggedIn && !user) {
        return (<Redirect to="/login" />)
    }
    else if(props.guest && user) {
        return (<Redirect to="/" />)
    }
    else if(user && props.loggedInAsAdmin && CREDENTIALS.username!==user.verified) {
      return (<Redirect to="/" />)
    }
    else {
      return (<Route component={props.component} {...props} />) 
    }
}

export default ProtectedRoute