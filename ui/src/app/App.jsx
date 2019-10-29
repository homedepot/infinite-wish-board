import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Login from '../login/Login'
import WishList from '../wishList'
import WatchAuth from '../auth/WatchAuth'
import ChildInfo from '../childinfo/ChildInfo'
import CreateWish from '../landing/CreateWish'
import WishDetails from '../wishDetails/WishDetails'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient()

App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <WatchAuth>
          <Switch>
            <Route exact path="/child-info" component={ChildInfo} />{' '}
            <Route exact path="/landing" component={CreateWish} />{' '}
            <Route exact path="/wish-summary" component={WishList} />{' '}
            <Route exact path="/wish-summary/:id" component={WishDetails} />{' '}
            <Route exact path="/logout" component={Login} />{' '}
            <Route exact path="/" component={Login} />{' '}
          </Switch>{' '}
        </WatchAuth>{' '}
      </Router>{' '}
    </ApolloProvider>
  )
}

export default App
