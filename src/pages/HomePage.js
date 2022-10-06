import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const HomePage = () => {
  let {name} = useContext(AuthContext)
  return (
    <div>
      <p>You are logged to the home page!</p>
      <h1>Hello {name}</h1>
    </div>
  )
}

export default HomePage