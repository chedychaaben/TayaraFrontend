import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({children, ...rest}) => {
    const authenticated = true;
    return (
        <Route {...rest}>
            {
            !authenticated ? 
                <Redirect to="login" /> 
            : children
            }
        </Route>
    )
}

export default PrivateRoute;