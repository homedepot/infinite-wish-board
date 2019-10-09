import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Login from '../login/Login'
import WishList from '../wishList'
import WatchAuth from '../auth/WatchAuth'
import ChildInfo from '../childinfo/ChildInfo'
import CreateWish from '../landing/CreateWish'
import WishDetails from '../wishDetails/WishDetails';
import GalaxyScreen from '../galaxyScreen/galaxyScreen'

function App() {
  return (
    <Router>
      <WatchAuth>
        <Switch>
          <Route exact path="/child-info" component={ChildInfo} />
          <Route exact path="/landing" component={CreateWish} />
          <Route exact path="/wish-summary" component={WishList} />
          <Route exact path="/wish-summary/:id" component={WishDetails} />
          <Route exact path="/galaxy" component={GalaxyScreen} />
          <Route exact path="/logout" component={Login} />
          <Route exact path="/" component={Login} />
        </Switch>
      </WatchAuth>
    </Router>
  )
}

export default App
