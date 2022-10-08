import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
      <div>
        <form onSubmit={loginUser}>
          <input type="email" name="email" placeholder="Enter Username" />
          <input type="password" name="password" placeholder="Enter Password" />
          <input type="submit" />
        </form>
      </div>
    )
}

export default LoginPage
