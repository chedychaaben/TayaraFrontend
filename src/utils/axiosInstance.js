import axios from 'axios'
import jwt_decode from "jwt-decode"
import dayjs from 'dayjs'
import { baseURL } from './settings';

// WHY SO SLOW IS IT BECAUSE WE ARE STORING IN LOCALSTORAGE
let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization: `Bearer ${authTokens?authTokens.access:null}`}
})

// Before sending a request

axiosInstance.interceptors.request.use(async req => {
    if (! authTokens){
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        req.headers.Authorization = `Bearer ${authTokens ? authTokens.access : null}`
    }

    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
    if (! isExpired) return req

    // If isExpired => Go for refresh with the old refresh and then set the new tokens then continue the request with the new access token
    const response = await axios.post(`${baseURL}/api/token/refresh/`,{ 
        refresh : authTokens.refresh
    })
    // Then Update the localstorage with new values 
    localStorage.setItem('authTokens', JSON.stringify(response.data))

    // Update headers again with the new token
    req.headers.Authorization = `Bearer ${authTokens ? authTokens.access : null}`
    return req
})

export default axiosInstance;