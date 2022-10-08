import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Redirect } from 'react-router-dom'

const LoginPage = () => {
    let {logoutUser} = useContext(AuthContext)
    logoutUser();
    return (
      <Redirect to="login" /> 
    )
}

export default LoginPage
