import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css'
import { PrivateRoute, TemporaryRoute } from './Routing'
import Login from '../login/Login'
import WishList from '../wishList'
// import WatchAuth from '../auth/WatchAuth'
import ChildInfo from '../childinfo/ChildInfo'
import CreateWish from '../landing/CreateWish'
import WishDetails from '../wishDetails/WishDetails';
import GalaxyScreen from '../galaxyScreen/galaxyScreen'

function App() {
  return (
    <Router>
      {/* <WatchAuth> */}
        <Switch>
          <PrivateRoute exact path="/" component={CreateWish} />
          <PrivateRoute path="/child-info" component={ChildInfo} />
          <PrivateRoute path="/wish-summary" component={WishList} />
          <PrivateRoute path="/wish-summary/:id" component={WishDetails} />
          <PrivateRoute exact path="/logout" component={Login} />
          <PrivateRoute exact path="/galaxy" component={GalaxyScreen} />
          <TemporaryRoute path="/login" component={Login} />
        </Switch>
      {/* </WatchAuth> */}
    </Router>
  )
}

export default App
