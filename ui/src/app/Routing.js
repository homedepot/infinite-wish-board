import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...routeProps }) => {
    const alreadyLoggedIn = localStorage.getItem('username') === null ? false : true
    return (
        <Route
            {...routeProps}
            render={props => alreadyLoggedIn ? <Component {...props} /> : <Redirect to="/login" />}
        />
    )
}

const TemporaryRoute = ({ component: Component, ...routeProps }) => {
    const alreadyLoggedIn = localStorage.getItem('username') === null ? false : true
    return (
        <Route
            {...routeProps}
            render={props => alreadyLoggedIn ? <Redirect to="/" /> : <Component {...props} />}
        />
    )
}

export { PrivateRoute, TemporaryRoute }