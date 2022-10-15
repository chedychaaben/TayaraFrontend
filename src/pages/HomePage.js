import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext'
//import axiosInstance from '../utils/axiosInstance'
import useAxios from '../utils/useAxios'

const HomePage = () => {
  let [annonces, setAnnonces] = useState([])
  let {user, authTokens, logoutUser} = useContext(AuthContext)

  let api = useAxios()

  useEffect( () => {
    getAnnonces()
  }, [])

  let getAnnonces = async() => {
    let response = await api.get('/api/')
    if (response.status === 200){
        console.log('OK')
        setAnnonces(response.data)
    }
  }
  
  return (
    <div>
      <p>You are logged to the home page!</p>
      <h1>Hello {user.email}</h1>
      <ul>
        {annonces.map(annonce => (
          <li key={annonce.id}>{annonce.titre}</li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage