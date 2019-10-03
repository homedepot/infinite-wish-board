import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const alreadyLoggedIn = localStorage.getItem('username') === null ? false : true

const PrivateRoute = ({ component: Component, ...routeProps }) =>
    <Route
        {...routeProps}
        render={props => alreadyLoggedIn ? <Component {...props} /> : <Redirect to="/login" /> }
    />

const TemporaryRoute = ({ component: Component, ...routeProps }) =>
    <Route
        {...routeProps}
        render={props => alreadyLoggedIn ? <Redirect to="/" /> : <Component {...props} />}
    />

export { PrivateRoute, TemporaryRoute }