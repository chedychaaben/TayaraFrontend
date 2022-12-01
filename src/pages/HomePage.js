import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext';



const HomePage = () => {
  let {user, authTokens, logoutUser} = useContext(AuthContext)
  return (
    <div>
      <p>You are logged to the home page!</p>
      <h1>Hello {user.email}, You are in the home page !</h1>
    </div>
  )
}

export default HomePage