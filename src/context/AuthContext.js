import React, { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import axios from 'axios';

const AuthContext = createContext()

export default AuthContext;


const baseURL = 'http://127.0.0.1:8000'

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const history = useHistory()

    let loginUser = async (e )=> {
        e.preventDefault()
        let response = await axios.post(`${baseURL}/api/token/`,
            {'email':e.target.email.value, 'password':e.target.password.value}
        )
        if(response.status === 200){
            setAuthTokens(response.data)
            setUser(jwt_decode(response.data.access))
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            history.push('/')
        }else{
            alert('Something went wrong!')
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }



    let contextData = {
        user:user,
        setUser : setUser,
        authTokens:authTokens,
        setAuthTokens: setAuthTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }


    useEffect(()=> {

        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)


    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
