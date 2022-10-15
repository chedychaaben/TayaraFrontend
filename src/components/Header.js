import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Header = () => {
  let {logoutUser} = useContext(AuthContext)
  return (
    <div>
      <Link to="/">Home</Link>
      <span>  |  </span>
      <Link to="/login">Login</Link>
      <span>  |  </span>
      <button onClick={ () => {logoutUser()} }>Logout</button>
    </div>
  )
}

export default Header
