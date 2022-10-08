import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const HomePage = () => {
  let {user} = useContext(AuthContext)
  return (
    <div>
      <p>You are logged to the home page!</p>
      <h1>Hello {user.email}</h1>
    </div>
  )
}

export default HomePage