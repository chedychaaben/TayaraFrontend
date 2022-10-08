import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext'

const HomePage = () => {
  let [annonces, setAnnonces] = useState([])
  let {user, authTokens, logoutUser} = useContext(AuthContext)

  useEffect( () => {
    getAnnonces()
  }, [])

  let getAnnonces = async() => {
    let response = await fetch('http://127.0.0.1:8000/api/', {
      method:'GET',
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    //
    if (response.status === 200){
        setAnnonces(data)
    }else if(response.statusText==='Unauthorized'){
      logoutUser()
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