import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Login from '../login/Login'
import WatchAuth from '../auth/WatchAuth'
import ChildInfo from '../childinfo/ChildInfo'
import CreateWish from '../landing/CreateWish'
import WishDetails from '../wishDetails/WishDetails'

function App() {
  return (
    <Router>
      <WatchAuth>
        <Switch>
          <Route exact path='/wish' component={WishDetails} />
          <Route exact path="/child-info" component={ChildInfo} />
          <Route exact path="/landing" component={CreateWish} />
          <Route exact path="/" component={Login} />
        </Switch>
      </WatchAuth>
    </Router>
  )
}

export default App
